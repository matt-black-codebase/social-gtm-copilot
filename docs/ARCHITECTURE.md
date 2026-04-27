# Architecture

## Layers
- `src/schemas`: Zod schemas and shared enums.
- `src/domain`: domain logic, transitions, and safety boundaries.
- `src/services`: orchestration services (campaign + weekly brief workflows).
- `src/storage`: repository interfaces and in-memory implementations.
- `src/cli`: local CLI entrypoints for smoke and demo flows.

## Local-first strategy
- In-memory repository in Sprint 1.
- SQLite-ready boundary via repository interface.
- No external platform integration in this sprint.

## Core workflow
1. Create campaign.
2. Create channel-aware draft records.
3. Approve or reject drafts via explicit domain transitions.
4. Generate weekly brief placeholder object from campaign + draft state.
