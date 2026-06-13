# Runbook

## Local Setup

### Prerequisites

- Git
- Node.js `>=20`
- npm
- GitHub CLI (`gh`) for repo metadata, issues, PRs, and maintenance workflows

### Clone And Inspect

```powershell
git clone https://github.com/sunilkumarvalmiki/Anonymous-Development-Resources.git
cd "Anonymous Development Resources"
git status --short
```

## Main Commands

### Validate the repository

```powershell
npm run validate
npm run check
```

### README-specific lint

```powershell
npx --yes awesome-lint README.md
```

### Diff hygiene

```powershell
git diff --check
```

## Common Maintenance Tasks

### Add or update a general catalog resource

1. Edit the most specific file under `resources/`.
2. Keep one markdown bullet per resource.
3. Add a factual description.
4. Avoid duplicates in the same file.

### Add or update a navigator recommendation

1. Update `data/resources.json` if the resource is new to the structured layer.
2. Update `data/paths.json`.
3. Update the matching file under `navigator/paths/`.
4. Run `npm run check`.

### Review repository state

```powershell
git branch -a
git log --oneline --decorate -n 15
gh issue list --state all --limit 20
gh pr list --state all --limit 20
```

### Review GitHub metadata

```powershell
gh repo view --json name,description,defaultBranchRef,url,repositoryTopics
```

## Codespaces Notes

- The repo includes `.devcontainer/devcontainer.json`.
- Post-create validation runs `npm run validate`.
- The current canonical repo slug is `sunilkumarvalmiki/Anonymous-Development-Resources`.
- Historical thread knowledge says Codespace creation on this machine needed explicit machine selection and retention in hours, not days.

## Weekly Memory Maintenance

1. Review the last 7 days of commits, PRs, issues, docs, and automation notes.
2. Update only `docs/ai-memory/` and root `AGENTS.md` when guidance has become durable.
3. Mark uncertain facts as `Needs verification`.
4. Prefer a branch or PR workflow over direct edits to `main`.

## When Not To Edit

- Read-only audit threads
- Sessions where validation cannot be completed and the user asked only for reporting
- Situations where evidence is insufficient and the missing fact can be recorded as `Needs verification`
