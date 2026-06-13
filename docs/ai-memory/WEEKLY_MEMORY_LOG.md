# Weekly Memory Log

## 2026-05-30

- Repository modernization started.
- Durable direction confirmed: keep the repo resource-only and remove stored assets that are not links or maintenance files.

## 2026-05-31

- Resource Navigator design documented.
- Structured data model introduced through `data/resources.json` and `data/paths.json`.
- Validator expanded to cover structured data and negative fixtures.
- PRs `#2`, `#3`, and `#4` merged, resulting in the current catalog-plus-navigator architecture.
- Branch cleanup left only `main`.

## 2026-06-01

- Weekly audit pattern established as read-only by default unless the user explicitly asks for edits in the same thread.
- Durable audit criteria captured: README clarity, navigator outcome focus, structured data consistency, stale/unsafe links, path quality, and candidate-hub review.

## 2026-06-10

- Audit found no immediate repo-state problems but flagged follow-up items:
  - inconsistent HackTricks URL usage
  - overly strong `Public APIs` prominence in some paths
  - README opener weaker than the later positioning
  - broad path recommendations that may dilute the navigator promise

## 2026-06-13

- Durable project memory system created under `docs/ai-memory/`.
- Root `AGENTS.md` added for compact recurring repo guidance.
- Weekly Codex memory-maintenance prompt and workflow drafted.
- Fresh-thread bootstrap prompt added so future sessions can start from docs instead of long historical threads.
- Canonical GitHub repository spelling confirmed as `sunilkumarvalmiki/Anonymous-Development-Resources`; older misspelled slug redirects but should not be used for new docs.
