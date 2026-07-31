# Buffer Strategy (Deferred Integration)

This sprint defines destination semantics only:
- `internal_queue`
- `buffer_idea`
- `buffer_draft`

## What exists now
- Domain schemas encode destination values.
- Approval flow can mark drafts `approved_for_buffer` and `pushed_to_buffer` as lifecycle states.

## What is intentionally missing
- No Buffer SDK/client.
- No OAuth/token handling.
- No queue push jobs.
- No auto-publishing.

## Planned next phase
- Add a dedicated Buffer adapter behind service boundary.
- Preserve product rule: human approval and publishing responsibility.
