# Common Anti-Patterns (Fintech/Banking Data Modeling & System Design)

Each entry pairs a bad-but-tempting default with the pattern from your other prep files
that replaces it. Say the anti-pattern's name out loud if you catch yourself about to do
it — that's the same "name the pattern" habit from the pattern-naming drill, applied to
catching mistakes instead of praising solutions.

---

## Idempotency & deduplication

- **Relying on the UI to prevent duplicates** (disabling the submit button, one-time
  form tokens client-side only) instead of a server-side idempotency key. The client is
  never trustworthy for this — a retried request from a flaky network doesn't ask the
  button for permission.
- **Using an auto-increment DB id as a dedup key.** It's assigned *after* insert, so it
  can't be checked *before* you decide whether to insert — it protects nothing.
- **Regenerating a new key on every retry.** If the client mints a fresh UUID each time
  it resubmits, every "retry" looks like a brand-new request server-side. The key must
  be generated once and persisted across retries of the *same* logical action.
- **Check-then-insert instead of atomic insert.** Doing `SELECT ... WHERE key = ?` and
  then `INSERT` only if nothing was found has a race: two near-simultaneous retries can
  both pass the check before either has inserted. (See the deep dive below.)
- **No expiry policy.** Storing idempotency keys forever is unnecessary storage growth;
  no expiry at all is a smell that no one thought about the storage lifecycle.
- **Un-scoped keys.** A single global uniqueness constraint on a bare key value risks
  unrelated flows accidentally colliding. Scope the uniqueness to the action/entity it
  belongs to (e.g. unique per `(customerId, idempotencyKey)` or per endpoint).
- **Conflating two different dedup boundaries.** A client-facing "did the user already
  submit this" key and a provider-facing "did we already call the payment processor for
  this" key are different concerns with different scopes — collapsing them into one
  field loses the ability to retry your own internal step without re-hitting the
  external provider, or vice versa.

## Lifecycle & state modeling

- **Flat status string/enum with no per-state payload** — e.g. `type Status = "settled"
  | "failed" | "pending"`. Nothing stops you from constructing a `"failed"` record with
  no reason, or a `"settled"` one with no settlement reference. Use a discriminated
  union where each variant carries only the fields that state actually has.
- **A single mutable `status` field with no transition guard.** Any code path can set
  any value from any other value — there's no way to reject an illegal jump (e.g.
  `approved` straight to `draft`).
- **A status field on a record that's supposed to be an immutable fact** (e.g. a ledger
  entry with `status: "pending"`). If a row can still change after being written, it
  isn't append-only yet, regardless of what the DELETE permissions say.
- **Treating a retry counter as a concurrency guard.** `retryCount` tracks how many
  times you tried — it does nothing to stop two concurrent writers from racing to
  update the same record. That's what `version` / optimistic concurrency is for.

## Ledger & audit trail

- **`UPDATE`/`DELETE` on a posted ledger row**, for any reason, including "fixing a
  mistake." Corrections are new, offsetting entries (reversals), never edits to history.
- **No row linking a ledger entry back to the event that created it** (e.g. missing
  `paymentAttemptId` / `paymentSubmissionId`). Without it you can't reconcile which
  attempt produced which financial fact.
- **Storing only the latest value, no history.** If the fraud/compliance team can't ask
  "what did this look like at each point in time," it isn't an audit trail — it's just
  a mutable record with extra steps.
- **Recomputing a balance from the full ledger history on every read.** Correct at
  small scale, but the first thing to name once the read path gets hot: a materialized
  balance view, updated incrementally, not summed from scratch each time.

## Async & architecture

- **Blocking the request thread on a slow external call** (KYC provider, fraud model)
  instead of enqueuing it to an async worker and returning an acknowledgment. This is
  the direct cause of blowing an ack-SLA that's supposed to be "a few seconds."
- **No reconciliation path for the "we don't actually know what happened" case** — a
  timed-out call to a provider that may have succeeded on their end. Idempotency keys
  prevent double-processing on retry, but you still need a background reconciliation
  job to resolve requests stuck in ambiguity, not just an infinite retry loop.
- **Trusting a single provider callback as the only source of truth**, with nothing to
  catch a lost webhook or dropped response. Pair the callback with a periodic
  reconciliation sweep against the provider's own record.

## Premature complexity (the growth area to watch for yourself)

- **Reaching for event sourcing, a graph structure, or a generalized event bus before
  naming a concrete requirement that a status field + append-only list can't satisfy.**
  If you can't name the specific query or consistency need that forces it, it's
  over-engineering, not thoroughness.
- **Distributed infra sized to a number you haven't converted to a rate.** Jumping to
  multi-region/Kubernetes because "2,000" sounds big, without converting to req/sec
  first and checking it against a single-server baseline.
- **Solving a harder, adjacent problem instead of the one asked.** E.g. building an
  application-level diffing/fuzzy-match system to detect "is this a resubmission" when
  the prompt's actual edge case ("duplicate submission of the same application") is
  fully solved by an idempotency key alone.

---

## Deep dive: setting up an idempotency key correctly

### What to call it
- **On the wire (HTTP layer):** use the header name `Idempotency-Key` — this is the de
  facto industry convention (Stripe, PayPal, and most payment APIs use this exact
  header name), so using it signals you know the real-world convention, not just the
  concept.
- **In your data model:** name the field for what it dedupes, not just `key`:
  - `idempotencyKey` — the client-facing submission dedup field (did the *user's*
    request already come in). This is what belongs on `LoanApplication` or
    `PaymentSubmission`.
  - `externalRequestKey` — a separate field for calls *you* make outward to a
    third-party provider (did *you* already ask the processor to move this money).
    This is why the exercise's official `PaymentAttempt` sketch uses
    `externalRequestKey` specifically, distinct from any customer-facing key — it's
    dedup at a different boundary, and the two can legitimately differ in value and
    lifecycle.

### How the key should be generated
- Client generates a UUID (v4) **once**, at the moment the user initiates the action,
  and persists it locally (component state, local storage) so every retry of that same
  logical action reuses it. A brand-new, intentional resubmission (user navigates away
  and starts over) gets a new key — the key represents "this one attempt to do the
  thing," not "this user" or "this form."
- Alternative when you can't trust the client to persist anything: derive a
  deterministic key server-side from stable request fields (e.g. hash of customerId +
  action + a coarse time bucket) — more forgiving of client bugs, but riskier, since two
  legitimately different requests that happen to hash the same get incorrectly merged.

### How to dedupe efficiently, mechanically
1. Store the key in a column with a **unique index/constraint** — this is what makes
   the dedupe check O(log n) (or better with a hash index) instead of an application-side
   table scan.
2. On each incoming request, **attempt the insert directly** rather than
   check-then-insert. Let the database's unique constraint be the source of truth:
   - Insert succeeds → this is genuinely new; proceed with processing.
   - Insert fails on the unique constraint → this is a retry of something already
     seen; look up the existing row by that key and return its already-stored result.
   This closes the race that a `SELECT` followed by an `INSERT` leaves open between two
   near-simultaneous retries.
3. **Store the response alongside the key**, not just the key itself — an idempotency
   record is typically `(key, status, storedResponsePayload)`. A duplicate request gets
   handed back the exact original response instead of recomputing or re-executing any
   side effect.
4. **Expire keys after a bounded window** (Stripe uses 24 hours as a public example).
   Retries essentially never happen after that horizon, and it keeps the index from
   growing unbounded.
5. **Scope the uniqueness constraint** to the action it belongs to — e.g. unique on
   `(customerId, idempotencyKey)` or a per-endpoint table — so an accidental key
   collision between two unrelated flows can't merge requests that were never the same
   logical action.
