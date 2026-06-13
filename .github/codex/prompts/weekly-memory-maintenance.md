# Weekly Memory Maintenance

You are maintaining the durable project memory for the Anonymous Development Resources repository.

## Goal

Review the last 7 days of repository activity and keep `docs/ai-memory/` current so future Codex sessions do not need to load long historical threads.

## Read First

1. `AGENTS.md`
2. `docs/ai-memory/PROJECT_MEMORY.md`
3. `docs/ai-memory/CURRENT_STATE.md`
4. `docs/ai-memory/OPEN_ISSUES.md`
5. `docs/ai-memory/WEEKLY_MEMORY_LOG.md`
6. `README.md`
7. `CONTRIBUTING.md`

## Review Scope

- recent commits
- recent pull requests
- recent issues
- repo docs and workflows
- existing `docs/ai-memory/` files
- relevant Codex notes checked into the repo

## Required Tasks

1. Review the last 7 days of repository changes.
2. Update the relevant files under `docs/ai-memory/`.
3. Summarize any new durable decisions.
4. List stale memory that was removed or corrected.
5. List unresolved ambiguities as `Needs verification`.
6. Recommend `AGENTS.md` changes only when the guidance is recurring and repo-wide.
7. Avoid making product, content, or architecture changes outside project-memory maintenance unless explicitly asked.
8. Open or update a branch / PR instead of directly changing `main`.

## Memory Rules

- Capture durable reusable knowledge only.
- Ignore temporary logs, repeated troubleshooting noise, one-off commands, abandoned paths, and duplicate explanations.
- Never store secrets, tokens, credentials, or private vulnerability details.
- If a fact is uncertain, mark it as `Needs verification` instead of guessing.

## Validation

- Run practical repo checks for the files you touch.
- Review the diff for accidental churn.
- Include a brief secrets-scan result for changed memory files when possible.

## Final Report

Report:

- files changed
- new durable knowledge captured
- stale memory removed
- unresolved ambiguities
- validation performed
- whether an `AGENTS.md` change was recommended or applied
