# Live-Coding Data Modeling Exercises

Each exercise below is designed to feel like a TypeScript whiteboard prompt in a real interview. The goal is not full implementation; it is to show the shape of the domain clearly, with explicit lifecycle states, concurrency concerns, and idempotent handling.

## Exercise 1 — LoanApplication State Machine

### Prompt
"Model a loan application workflow for a digital lending product. The application starts as Draft, transitions to Submitted, then to UnderReview, then can become Approved, Rejected, or ManualReviewRequired. Any transition must preserve a history of decisions and support retries of the same client request without double-posting."

### Starter TypeScript sketch
```ts
type LoanApplicationStatus =
  | { type: 'draft'; version: number }
  | { type: 'submitted'; version: number; submittedAt: string }
  | { type: 'under_review'; version: number; reviewId: string }
  | { type: 'approved'; version: number; approvedAt: string; decisionId: string }
  | { type: 'rejected'; version: number; rejectedAt: string; reasonCode: string }
  | { type: 'manual_review_required'; version: number; escalationId: string };

interface LoanApplication {
  id: string;
  customerId: string;
  status: LoanApplicationStatus;
  idempotencyKey: string;
  decisionHistory: Array<{
    at: string;
    status: LoanApplicationStatus['type'];
    actor: 'customer' | 'system' | 'reviewer';
  }>;
}
```

### Simplest structure first checkpoint
Before adding a complex graph, ask yourself:
- Why is a single lifecycle status plus an append-only history enough for the initial version?
- Would a richer structure be justified only if the review system needs specific dependency tracking or state transitions across multiple services?

### Explicit design requirements
- Use an `idempotencyKey` on submission.
- The system must prevent an application from being approved twice in parallel.
- Add a concurrency note: either optimistic locking via `version` or a distributed lock around state transitions.

---

## Exercise 2 — Payment Attempt and LedgerEntry Modeling

### Prompt
"Model a payment submission pipeline that records a payment attempt and an immutable ledger entry for each financial event. The system must handle retries, partial network failures, and eventual settlement status updates. The key requirement is that payment intent must be idempotent, but the ledger is append-only."

### Starter TypeScript sketch
```ts
type PaymentAttemptStatus =
  | { type: 'pending'; attemptNumber: number }
  | { type: 'authorized'; authCode: string; attemptNumber: number }
  | { type: 'settled'; settlementReference: string; attemptNumber: number }
  | { type: 'failed'; reason: string; attemptNumber: number }
  | { type: 'reversed'; reversalReference: string; attemptNumber: number };

interface PaymentAttempt {
  id: string;
  externalRequestKey: string;
  accountId: string;
  amountCents: number;
  currency: 'USD';
  status: PaymentAttemptStatus;
  createdAt: string;
  version: number;
}

interface LedgerEntry {
  id: string;
  paymentAttemptId: string;
  entryType: 'debit' | 'credit';
  amountCents: number;
  postedAt: string;
  balanceSnapshotAfter: number;
}
```

### Simplest structure first checkpoint
Before reaching for a graph or a generalized event bus, justify why:
- a per-attempt state record plus append-only ledger entries is sufficient for the initial domain model;
- the balance itself can be materialized from the ledger rather than stored as a mutable, high-write object.

### Explicit design requirements
- `externalRequestKey` must be used to prevent duplicate processing.
- `version` or compare-and-swap logic should guard against simultaneous settlement and reversal races.
- Ledger entries must never be updated in place once posted.

---

## Exercise 3 — KYC Document Review Workflow

### Prompt
"Model a KYC onboarding workflow where a customer uploads an identity document, a processing service extracts metadata, and the document can either pass automated validation, require manual review, or be rejected. The system must tolerate retries, duplicate uploads, and partial OCR or classifier failure."

### Starter TypeScript sketch
```ts
type KycDocumentStatus =
  | { type: 'uploaded'; hash: string; uploadedAt: string }
  | { type: 'ocr_pending'; hash: string; retryCount: number }
  | { type: 'ocr_complete'; extractedFields: Record<string, string>; confidenceScore: number }
  | { type: 'manual_review_required'; reason: string }
  | { type: 'approved'; approvedAt: string }
  | { type: 'rejected'; rejectedReason: string };

interface KycDocument {
  id: string;
  customerId: string;
  fileKey: string;
  contentHash: string;
  idempotencyKey: string;
  status: KycDocumentStatus;
  reviewHistory: Array<{
    at: string;
    status: KycDocumentStatus['type'];
    notes?: string;
  }>;
}
```

### Simplest structure first checkpoint
Ask yourself whether you need a more complex document graph or a simpler immutable file record plus derived metadata. Justify which one is enough for the first pass before adding indexing or workflow edges.

### Explicit design requirements
- Duplicate uploads by the same customer must collapse to one canonical document record.
- OCR or classification failure must not erase the original document or its hash.
- A state machine should gate transitions from `uploaded` to `ocr_pending` to `approved` or `manual_review_required`.
