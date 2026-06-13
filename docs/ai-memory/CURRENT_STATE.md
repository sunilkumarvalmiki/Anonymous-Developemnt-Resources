# Current State

## Repository State

- Tracked `main` matched `origin/main` when this memory extraction started on 2026-06-13; the new memory files were untracked draft additions at that point.
- Baseline HEAD before the memory-system commit: `af319df` (`Merge pull request #4 from sunilkumarvalmiki/sunil/resource-navigator-implementation`)
- Default branch: `main`
- Remote branches present: `origin/main`
- Canonical GitHub repository: `sunilkumarvalmiki/Anonymous-Development-Resources`
- Local `origin` was updated from the old redirected misspelling to `https://github.com/sunilkumarvalmiki/Anonymous-Development-Resources.git` during this extraction.
- Open GitHub issues visible via `gh issue list`: none
- Recent merged PRs visible via `gh pr list --state all`:
  - `#4` `[codex] Add Resource Navigator foundation`
  - `#3` `[codex] Add Resource Navigator design and README rewrite`
  - `#2` `[codex] Add high-volume resource discovery index`
  - `#1` `[codex] Modernize resource catalog`

## Active Modules

- Catalog pages under `resources/`
- Navigator pages under `navigator/`
- Structured data under `data/`
- Validator scripts under `scripts/`
- CI and issue/PR templates under `.github/`
- Codespaces definition under `.devcontainer/`
- Durable AI memory under `docs/ai-memory/`

## Runtime And Tooling

- Node.js `>=20` is required by `package.json`.
- `package.json` is marked `private: true` to prevent accidental npm publishing.
- Codespaces uses the Node 22 JavaScript devcontainer image and runs `npm run validate` after creation.
- A Codespace named `ADR main` was visible on 2026-06-13 with ref `main`, no uncommitted changes, and no unpushed changes.

## Current Positioning

- The repo already reads as a Resource Navigator rather than a raw link dump.
- The README opener is still weaker than the stronger promise later in the README.
- The navigator/data layer is the current core differentiator.

## Current Risks

- Structured and markdown representations can drift if path edits are not mirrored.
- Repeated broad hubs can weaken the “shortest trusted path” promise if they dominate first-step recommendations.
- Some curation findings from the 2026-06-10 audit still need follow-up edits.

## Needs Verification

- Live external link health today
- Whether the existing `ADR main` Codespace is still needed long term
- Whether future weekly automation should create PRs automatically or artifact-only proposals
