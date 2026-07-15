# Casca 3-Day Practice Plan

Use this as a compact, timed rehearsal plan for the next 48–72 hours.

## Day 1 — Loan Origination + Underwriting
- 10 min: skim glossary and narration checklist
- 35 min: timed mock design prompt #1
- 15 min: live code modeling exercise #1
- 10 min: review answer key and note where you missed offline precomputation or over-complicated the data model

## Day 2 — Payment / Ledger Processing
- 10 min: pattern-naming drill warmup
- 35 min: timed mock design prompt #2
- 15 min: live code modeling exercise #2
- 10 min: review failure modes and idempotency edge cases

## Day 3 — KYC / Document Ingestion + System Design Synthesis
- 10 min: rapid pattern-naming drill
- 35 min: timed mock design prompt #3
- 15 min: live code modeling exercise #3
- 15 min: final narration rehearsal with the checklist

## How to use each session
1. Read the prompt aloud as if the interviewer is speaking it.
2. Ask clarifying questions out loud before you design.
3. Name the underlying pattern early: asynchronous queue, precomputation, idempotency key, sharding, event-sourcing style journaling, or optimistic concurrency.
4. When you finish, explicitly call out tradeoffs and failure states.

## Growth-area focus
- Offline precomputation: mention it proactively when the workflow has a heavy read path or repeated derived risk output.
- Simplest structure first: before introducing a map, DAG, or materialized view, justify why a simpler record + status field or append-only list is sufficient.
