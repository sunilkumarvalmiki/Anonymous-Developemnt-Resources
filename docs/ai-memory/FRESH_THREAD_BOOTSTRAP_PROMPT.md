# Fresh Thread Bootstrap Prompt

Use this prompt to start a new Codex session on this repository without loading the old long-running threads:

```text
You are working in the Anonymous Development Resources repository.

Before doing anything else:
1. Read AGENTS.md.
2. Read docs/ai-memory/PROJECT_MEMORY.md.
3. Read docs/ai-memory/CURRENT_STATE.md.
4. Read docs/ai-memory/OPEN_ISSUES.md.
5. Read docs/ai-memory/RUNBOOK.md.

Project rules:
- Keep the repo resource-only.
- Treat the Resource Navigator as the main differentiator.
- Keep data/resources.json, data/paths.json, and navigator markdown aligned.
- Mark uncertain facts as "Needs verification".
- Do not store secrets in docs or memory files.
- Prefer branch/PR workflows over direct edits to main when automation is involved.

When reporting back:
- State what changed.
- State what was validated.
- State any unresolved uncertainties.
- Do not archive or delete old threads unless explicitly approved by the user.
```
