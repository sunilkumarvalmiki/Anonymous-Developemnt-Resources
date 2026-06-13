# Project Memory

## Project Goal

Anonymous Development Resources is a curated, resource-only repository for software development learning and discovery.

Its differentiator is the Resource Navigator:

> Tell us your goal. We give you the shortest trusted resource path.

The repository should stay outcome-focused, easy to browse on GitHub, and useful both to humans and to automation that consumes the structured data.

## What The Repository Contains

- `README.md`: public entry point and high-level positioning
- `resources/`: category browsing layer
- `navigator/`: goal-based recommendation layer
- `data/resources.json`: structured resource metadata
- `data/paths.json`: structured path definitions
- `scripts/validate-resources.mjs`: main validation logic
- `.github/workflows/validate.yml`: CI validation and scheduled link-health checks
- `.devcontainer/devcontainer.json`: Codespaces setup
- `docs/ai-memory/`: durable memory for future Codex sessions

## Non-Negotiable Scope

- Resource links, structured metadata, and maintenance automation belong here.
- Uploaded learning assets, binaries, copied books, PDFs, videos, icon packs, and scraped datasets do not belong here.
- The repo is not a product app, API service, or storage location for downloaded content.

## Primary User Groups

- Beginners who need a short trusted starting path
- Self-taught developers choosing what to learn next
- Developers choosing tools for a new project
- Job seekers preparing for interviews
- Open source contributors looking for high-signal entry points
- Maintainers, mentors, and agents that need machine-readable resource structure

## Durable User Instructions Repeated Across Threads

- Keep the repo aligned with resources only.
- Prefer iterative quality improvements over one-pass edits.
- Keep branch state clean after feature work.
- Use automation where it materially improves maintenance.
- During audits, do not edit, commit, push, or open PRs unless explicitly requested in that thread.
- Keep root `AGENTS.md` small and move deeper detail into durable docs.

## Durable Facts Confirmed As Of 2026-06-13

- Default branch is `main`.
- The local and remote branch state shows only `main`.
- Canonical GitHub repository: `sunilkumarvalmiki/Anonymous-Development-Resources`.
- The older misspelled slug `sunilkumarvalmiki/Anonymous-Developemnt-Resources` currently redirects, but new docs and commands should use the canonical spelling.
- The repo has four merged PRs that created the current shape:
  - `#1` resource-catalog modernization
  - `#2` high-volume discovery expansion
  - `#3` Resource Navigator design and README rewrite
  - `#4` Resource Navigator foundation
- Current HEAD is commit `af319df`.
- A Codespace named `ADR main` exists on `main` and was visible via `gh codespace list` on 2026-06-13.

## Needs Verification Later

- Live quality of external links beyond the last explicit audit
- Whether the most repeated recommendations are still the best first picks for each path
- Whether candidate additions such as Exercism belong in the navigator or only in category pages
- Whether the old redirected GitHub slug should be referenced anywhere after all local remotes and docs use the canonical slug
