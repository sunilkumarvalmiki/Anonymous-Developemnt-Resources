# Testing Strategy

## Purpose

This repository is content-heavy and code-light. Validation focuses on integrity, consistency, and safety rather than on application runtime behavior.

## Required Checks

### Structured and markdown validation

```powershell
npm run validate
```

What it covers:

- structured JSON parsing
- enum validation
- duplicate IDs and URLs
- path reference integrity
- related-page existence
- local markdown links and anchors
- accidental binary assets

### Full local check

```powershell
npm run check
```

What it covers:

- main validation
- negative-fixture regression validation

### README awesome-list lint

```powershell
npx --yes awesome-lint README.md
```

Use this when changing `README.md` or anything that could affect Awesome-style expectations.

### Diff hygiene

```powershell
git diff --check
```

Use this before review or commit.

## CI Coverage

`.github/workflows/validate.yml` currently runs:

- `npm run check` on push and pull request
- scheduled link-health checks with Lychee

## Validation Philosophy

- Prefer one predictable validation entrypoint over many overlapping tools.
- Validate negative cases, not only happy paths.
- Do not claim external link health from local checks alone.
- If a command cannot be run, say so explicitly and do not fake the result.
