# Anonymous Development Resources

## Project Overview

This repository is a resource-only catalog plus a goal-based Resource Navigator for software development learning, tooling, APIs, datasets, security, and career growth.

Do not turn it into an app, asset dump, or generic notes repo. The product is curated links, structured metadata, navigator paths, and the maintenance automation around them.

## Look Here First

1. `docs/ai-memory/PROJECT_MEMORY.md`
2. `docs/ai-memory/CURRENT_STATE.md`
3. `docs/ai-memory/OPEN_ISSUES.md`
4. `README.md`
5. `CONTRIBUTING.md`

If you are changing navigator recommendations, also read:

1. `data/resources.json`
2. `data/paths.json`
3. `navigator/README.md`
4. matching files under `navigator/paths/`

## Important Commands

- `npm run validate`
- `npm run check`
- `npx --yes awesome-lint README.md`
- `git diff --check`

## Test Expectations

Run `npm run check` for changes touching structured data, navigator pages, validation logic, prompts, workflows, or durable memory docs.

Run `npx --yes awesome-lint README.md` when changing the main README.

Do not claim commands passed unless you ran them in the current turn.

## Coding And Content Conventions

- Keep the repo resource-only.
- Prefer fewer high-signal links over large unverified dumps.
- Keep navigator paths short, actionable, and checkpoint-driven.
- Keep `data/resources.json`, `data/paths.json`, and matching markdown pages aligned.
- Mark uncertain facts as `Needs verification`.
- Do not invent current link health, repo metadata, or external status.

## Documentation Update Rules

- Update `docs/ai-memory/` when durable project knowledge changes.
- Update root `AGENTS.md` only for recurring repo-wide guidance.
- Preserve useful existing context; do not replace it with shorter but weaker summaries.
- Add weekly memory notes to `docs/ai-memory/WEEKLY_MEMORY_LOG.md`.

## Memory Maintenance Rules

- Treat merged commits, active repo docs, validated workflows, and repeated user instructions as durable.
- Exclude transient logs, failed experiments without a lesson, and one-off shell history.
- Capture unresolved questions in `docs/ai-memory/OPEN_ISSUES.md`, not as asserted facts elsewhere.

## Safety Rules

- Never store secrets, tokens, credentials, or private vulnerability details in repo memory files.
- Remove or flag unsafe, hijacked, pirated, spammy, or misleading links.
- Prefer read-only audits unless the user explicitly asks for edits.

## What Not To Do

- Do not upload PDFs, books, videos, icons, archives, datasets, or binaries.
- Do not add product features unrelated to catalog/navigation/maintenance.
- Do not edit `main` directly from automation when a branch or PR workflow is intended.
- Do not archive or delete long-running threads until memory extraction is reviewed, committed, and explicitly approved by the user.
