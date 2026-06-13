---
name: project-memory-maintainer
description: Maintain durable repo memory for Anonymous Development Resources by extracting reusable knowledge from recent repo activity, docs, issues, PRs, and Codex notes without storing secrets or transient noise.
---

# Project Memory Maintainer

Use this skill when the task is to update durable project memory, reduce thread size, or prepare the repo for future Codex sessions.

## Objective

Keep `docs/ai-memory/` accurate, compact, durable, and version-controlled so future sessions can bootstrap from repo memory instead of long conversation history.

## Read Order

1. `AGENTS.md`
2. `docs/ai-memory/PROJECT_MEMORY.md`
3. `docs/ai-memory/CURRENT_STATE.md`
4. `docs/ai-memory/OPEN_ISSUES.md`
5. `docs/ai-memory/WEEKLY_MEMORY_LOG.md`
6. `README.md`
7. `CONTRIBUTING.md`
8. Recent commits: `git log --oneline --decorate -n 20`
9. Recent PRs and issues when available:
   - `gh pr list --state all --limit 20`
   - `gh issue list --state all --limit 20`
10. Relevant repo-local planning/spec docs under `docs/`
11. Relevant Codex notes or automation memory files if they contain durable lessons

## What To Extract

- repo goal and scope
- active architecture and module boundaries
- stable commands
- validation strategy
- durable user instructions repeated across threads
- active decisions and rejected decisions
- recurring mistakes to avoid
- open issues and known bugs
- workflow and CI/CD notes
- roadmap items that are still active
- facts that still need verification

## What To Ignore

- repeated troubleshooting noise
- raw logs
- abandoned experiments without a durable lesson
- duplicate explanations
- one-off commands that do not define the workflow
- emotional or conversational filler
- stale implementation paths that were replaced

## Update Rules

### `docs/ai-memory/`

- Update the smallest set of files needed.
- Preserve useful prior context.
- Prefer concise durable statements over narrative history.
- Mark uncertain facts as `Needs verification`.

### `AGENTS.md`

- Update only when guidance has become recurring and repo-wide.
- Keep it compact.
- Move detailed rationale into `docs/ai-memory/`, not into `AGENTS.md`.

## Stale Or Conflicting Memory Detection

Check for:

- docs that disagree with current repo structure
- decisions that were later reversed
- commands that no longer exist in `package.json` or workflows
- branch names, PR numbers, and environment assumptions that have aged out
- duplicate claims across files where one is now better maintained

When found:

1. Prefer current repo files and merged history over older notes.
2. Remove stale claims from memory docs.
3. If the newer truth is still uncertain, replace the old claim with `Needs verification`.

## Weekly Changelog Workflow

For weekly maintenance:

1. Review the last 7 days of commits, PRs, issues, docs, and automation notes.
2. Update affected `docs/ai-memory/` files.
3. Append one concise entry to `docs/ai-memory/WEEKLY_MEMORY_LOG.md`.
4. Record removed stale memory in the final report.
5. Recommend `AGENTS.md` changes only if the guidance has repeated enough to become durable.

## Secret Refusal Rule

Never store:

- API keys
- tokens
- passwords
- cookies
- private certificates
- private vulnerability details
- personal contact or payment details

If a source contains secrets, store only the durable lesson and omit the secret itself.

## Validation

After updating memory:

1. Run repo checks that are practical for the touched files.
2. Run a lightweight secrets scan over changed docs when possible.
3. Review the diff for accidental churn.

## Final Report

The final report should include:

- files created or changed
- durable knowledge extracted
- stale or low-value material intentionally discarded
- uncertainties that remain
- validation performed
- whether the thread is ready for review, commit, or retirement
