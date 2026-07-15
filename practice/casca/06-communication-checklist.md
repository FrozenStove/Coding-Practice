# Communication and Narration Checklist

Keep this open during every mock session.

## Start of design
- State the main business workflow in one sentence.
- Name the critical constraints before diving into components.
- Mention the most important failure or regulatory concern.

## Clarify requirements out loud
- Ask about read/write volume, latency, and durability.
- Ask whether the workflow is synchronous or asynchronous after the initial request.
- Ask how retries, duplicates, and external timeouts should behave.

## While designing
- Narrate the tradeoff for each major architectural choice.
- Say why you are choosing a simple structure first.
- Explicitly call out where a queue, cache, ledger, or concurrency control is necessary.

## Edge cases and failure states
- Duplicate submission
- Partial success and lost response
- Provider outage or delayed downstream callback
- Manual override or reviewer correction
- Reconciliation drift and compensation

## End of design
- Summarize the core workflow in 3–4 steps.
- State one or two non-obvious edge cases you intentionally handled.
- Explain what you would change if the business requirement shifted from low latency to stronger audit guarantees.

## Avoid these mistakes
- Do not silently build a design without narration.
- Do not stop at the happy path.
- Do not introduce complex structures before explaining why the simple model cannot support the requirement.
