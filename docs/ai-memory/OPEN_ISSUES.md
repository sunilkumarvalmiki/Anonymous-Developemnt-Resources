# Open Issues

## Repo Content Follow-Ups

### Normalize HackTricks URL usage

Status:
Open

Details:
The 2026-06-10 audit found mixed canonical URLs:

- `data/resources.json` and `navigator/paths/cybersecurity-safe.md` use `https://book.hacktricks.wiki/`
- `resources/security.md` still uses `https://book.hacktricks.xyz/`

Action:
Choose one canonical URL and update all references together.

### Re-evaluate `Public APIs` prominence in first-step recommendations

Status:
Open

Details:
`Public APIs` is repeated across README and multiple navigator paths. The underlying GitHub repo remains active, but the project branding now reads as partly vendor-linked.

Action:
Decide whether it belongs in “first three” recommendations or only in broader category browsing.

### Strengthen the README opener

Status:
Open

Details:
The repo’s strongest value proposition appears later in the README instead of in the opening line.

Action:
Make the first paragraph match the “shortest trusted path” positioning.

### Tighten broad paths

Status:
Open

Details:
The 2026-06-10 audit flagged `project-tools` and possibly `ai-ml-engineering` as still too discovery-heavy for first-step guidance.

Action:
Review whether those paths should start with more decision-ready resources.

## Automation Follow-Ups

### Decide weekly maintenance output mode

Status:
Needs verification

Details:
The new weekly memory workflow can be implemented as artifact-only or as branch-plus-PR automation. The safe default for this repo is PR-based changes, but the desired long-term mode should be confirmed after initial review.

### Confirm whether Codex weekly memory maintenance should run on the main repo only

Status:
Needs verification

Details:
The durable intent is repo-local memory maintenance. If forks or experiments become active later, the workflow scope may need refinement.

## GitHub Status

- No open GitHub issues were visible via `gh issue list` on 2026-06-13.
- No open GitHub pull requests were visible; the visible PR history is fully merged.

## Repository Metadata

### Remove old misspelled slug references over time

Status:
Needs verification

Details:
The canonical GitHub repository is now `sunilkumarvalmiki/Anonymous-Development-Resources`. The older `Anonymous-Developemnt-Resources` slug still redirects, but future docs and commands should prefer the canonical spelling.

Action:
When touching older docs, comments, or memory, replace old slug references unless historical context requires preserving them.
