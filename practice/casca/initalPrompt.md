# Casca Technical Interview Prep — Requirements & Topics

## Context (for the LLM generating tasks)

I'm interviewing at **Casca**, a fintech company building bank-workflow software.
I have a **75-minute onsite technical round** with two engineers, 48–72 hours from now.

**Format of the actual interview:**
- Greenfield system design exercise rooted in a **realistic bank workflow** on Casca's stack
- I'm expected to **digitally whiteboard** a proposed architecture
- I'm expected to **write code to produce proof-of-concept data models** during the design (not full implementation — just enough TypeScript to show the shape of the domain)
- Assessed on **technical expertise** AND **communication**
- Must be comfortable in **TypeScript**
- No AI assistance allowed during the actual interview — this practice is prep only

**My background to draw on (don't need tasks that reteach these, but tasks can reference them as source material):**
- PHI-aware AI tooling and RAG systems across distributed microservices
- Insurance integrations
- Distributed locking on capacity tracking
- Idempotency on billing workflows

**My known growth areas (from a recent, separate system design interview's feedback):**
1. I don't independently/early recognize and name the **offline precomputation** pattern — I get there eventually but not proactively.
2. I reach for complex data structures before checking whether a simpler one satisfies the actual read/write query.

**Known failure modes of past Casca candidates (from the recruiter/team):**
- Handling only the clean/happy path, not edge cases or failure states
- Going silent during live coding instead of narrating thought process
- Giving surface-level system design answers (naming components without justifying tradeoffs)

---

## What I need generated

Please generate a **day-by-day practice plan** (structured for however many days I specify) consisting of:

1. **Timed mock system design prompts** (30–45 min each), specifically modeling realistic bank/fintech workflows — e.g. loan origination, KYC/onboarding, underwriting decisioning, payment/ledger processing, document ingestion pipelines. Each prompt should include:
   - The prompt as it would be read aloud by an interviewer
   - A list of ambiguous requirements I should clarify out loud (functional + non-functional)
   - A hidden "answer key" of the patterns the prompt is designed to test (e.g. async queue, idempotency key, precomputation, sharding) — to be read only after I attempt it
   - Explicit edge cases / failure modes I should be expected to surface unprompted

2. **Live-coding data-modeling exercises in TypeScript**, matched to bank-workflow entities (e.g. Account, Transaction, LedgerEntry, LoanApplication, UnderwritingDecision). Each should:
   - Require discriminated unions or state-machine modeling of entity status/lifecycle
   - Include a "simplest structure first" checkpoint — i.e. a reminder prompt asking me to justify why I didn't reach for something more complex before I code
   - Include idempotency and concurrency handling as an explicit design requirement, not just a bonus

3. **A short reference glossary** of fintech/banking domain terms I should be fluent enough in to use naturally (e.g. settlement, reconciliation, ledger, double-entry accounting, chargeback, KYC/AML, underwriting) — definitions only, not deep dives.

4. **A pattern-naming drill**: a rapid-fire set of 10–15 short scenario descriptions (2–3 sentences each), where the task is to name the applicable system design pattern *out loud within 10 seconds*, before explaining mechanics. Include an answer key.

5. **A communication/narration checklist** I can literally have open next to me during mock practice, targeting the "going silent" and "happy-path-only" failure modes specifically.

## Constraints on generated content

- Keep prompts realistic to a **bank/fintech workflow context**, not generic e-commerce or social media examples.
- Bias toward **TypeScript** for all code exercises.
- Don't just re-teach system design from scratch — assume I already know CAP theorem, basic scaling, caching, queues, etc. Focus on **application to banking domains** and **the two named growth areas** above.
- Where possible, tie exercises back to my own past experience (idempotent billing, distributed locking, RAG across microservices) so I can practice reframing real experience as pattern examples.