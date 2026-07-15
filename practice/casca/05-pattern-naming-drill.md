# Pattern-Naming Drill

Goal: name the pattern in under 10 seconds before explaining mechanics.

## Scenarios
1. A customer retries the same payment request after the network times out. The account balance must not be double-posted.
2. A lending system computes the same underwriting summary for thousands of applications each day, and the UI only needs the latest output.
3. A KYC workflow receives the same uploaded identity file three times because the browser refreshes during a slow upload.
4. A ledger must keep every financial event as an immutable, append-only journal to support later audit.
5. A document review queue needs to process 100,000 files, but only a small slice is actively read in the UI.
6. A payment provider reports success, but the local service has no trustworthy confirmation of whether the posting was actually completed.
7. A system receives a burst of loan applications and needs to protect a shared per-customer update path from races.
8. A user submits a draft application and the system wants to reduce repeated expensive model calls while still allowing eventual updates.
9. A fraud team wants to know every change in a loan application's underwriting state, not just the latest value.
10. A payment service can only safely increase a balance after checking the current account record and update timestamp.
11. A high-volume ledger must eventually produce per-account balances for fast reads without recomputing from scratch.
12. A large onboarding workflow generates many derived metadata objects, but only a subset are retrievable by the customer-facing UI.

## Answer key
1. Idempotency key
2. Offline precomputation
3. Idempotency key
4. Append-only journal / event-sourcing style log
5. Materialized view / precomputation
6. Outbox pattern / reconciliation workflow
7. Distributed lock or optimistic concurrency control
8. Cache / memoization / precomputation
9. Event history / append-only audit trail
10. Optimistic concurrency control
11. Materialized view / summarized balance model
12. Cached derived document metadata index
