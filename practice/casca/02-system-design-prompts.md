# Timed Mock System Design Prompts

## Prompt 1 — Loan Origination and Underwriting

### Read-aloud prompt
"Design a system for a digital lending workflow. A customer submits a personal loan application, uploads supporting docs, and the system must decide whether to accept, reject, or require manual review. The evaluation depends on identity verification, income proof, and a fraud risk model. The system should support a peak of 2,000 applications per hour and must present the user with a completion estimate within a few seconds."

### Clarify out loud
- Is the decisioning pipeline synchronous or asynchronous after the initial submission?
- What does 'manual review' mean operationally: queue to an agent, hold for re-verification, or allow retry?
- Do we need to support auditability for every decision change?
- Is there an expected read-heavy requirement for display of application status and derived underwriting summary?
- What is the SLA for a final decision vs. initial acknowledgment?

### Edge cases to surface unprompted
- Duplicate submission of the same application
- Document upload retries and partial uploads
- Fraud risk model latency or model failure
- Out-of-order downstream updates from KYC or income verification services
- Manual reviewer overrides that must be mediated with idempotent audit logs

### Answer key
- Initial submission path should likely use an idempotency key.
- Derived underwriting results can be treated as offline precomputation from a rules + model output cache.
- Async workers are appropriate for KYC and risk scoring.
- Use a state machine for application lifecycle, not a single status string without transition control.

---

## Prompt 2 — Payment and Ledger Processing

### Read-aloud prompt
"Design a payment processing platform for a fintech product that supports ACH and card-based disbursements. When a payment request is created, the system must produce a ledger-consistent record, reserve funds if necessary, dispatch to the external provider, and reconcile settlement status later. The system should be resilient to duplicate retries and provide a clear audit trail for each payment attempt."

### Clarify out loud
- Is this a single-account or multi-entity ledger?
- Are we using double-entry accounting internally?
- What is the expected settlement timing and how do we reconcile after delays?
- Do we need to support partial failures, such as network timeouts after funds were reserved?
- Should the system tolerate eventual consistency across the payment provider and the internal ledger?

### Edge cases to surface unprompted
- Duplicate payment requests due to retry or browser refresh
- External provider returns success but the response is lost
- Funds reserved but provider call eventually fails
- Ledger drift across posting and settlement
- Chargeback or reversal events after the transaction is already settled

### Answer key
- The right pattern is an idempotent command-execution model with a unique external request key.
- Use append-only ledger entries, not in-place mutation, to preserve auditability.
- The processing orchestration can be queue-driven, with reconciliation as a separate background flow.
- If there is a hot accounting read path, a simple materialized account balance view is enough before reaching for more complex structures.

---

## Prompt 3 — KYC Document Ingestion and Review

### Read-aloud prompt
"Design a document ingestion pipeline for onboarding customers into a regulated bank workflow. Customers upload identity and address documents, the pipeline extracts metadata, classifies documents, flags suspicious items, and routes files to human review if needed. The upload experience must remain reliable under network instability, and the system should avoid duplicate ingestion when the user retries the same document."

### Clarify out loud
- Is the raw file immutable once received?
- Are we storing documents only, or also deriving normalized metadata and OCR text?
- What does 'suspicious' mean in this domain: missing fields, quality issues, or known fraud signals?
- How much indexing is needed before review: just metadata, or searchable OCR output too?
- Are there retention and privacy requirements that affect the storage shape?

### Edge cases to surface unprompted
- Same document uploaded multiple times with different hashes or retries
- OCR or classification failure while the document is already accepted into the workflow
- Review queue starvation when large batches of low-confidence files arrive
- Partial completion and resumable ingestion after client disconnect
- Compliance-driven retention and deletion obligations across downstream processors

### Answer key
- Treat ingestion as an asynchronous pipeline with an idempotency key per uploaded file.
- Precompute document classification and extracted metadata to reduce review-time lookup overhead.
- A simple status workflow with explicit downstream states is often better than overbuilding a graph or complex state store.
- Use immutable objects and append-only event history for regulated audit trails.
