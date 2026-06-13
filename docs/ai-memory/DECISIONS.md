# Decisions

## Accepted Decisions

### 2026-05-30 to 2026-05-31: Keep the repository resource-only

Decision:
The repository stores links, structured metadata, and maintenance automation only.

Reason:
The user explicitly wanted a resource-only catalog and rejected drift into app/product work or stored assets.

### 2026-05-30: Remove bundled resource assets

Decision:
Remove PDFs, icons, `.DS_Store`, and similar binary artifacts from the repository.

Reason:
They conflict with the repo’s purpose and weaken maintainability, legality, and scope clarity.

### 2026-05-31: Add the Resource Navigator instead of expanding only the README

Decision:
Introduce `navigator/`, `data/resources.json`, and `data/paths.json` as first-class durable structures.

Reason:
A plain list of links does not solve the outcome-first problem. The navigator gives goal-based recommendations with checkpoints and skip guidance.

### 2026-05-31: Keep catalog browsing and navigator layers separate

Decision:
Preserve `resources/` for broad browsing while using `navigator/` for short decision-ready paths.

Reason:
This keeps GitHub browsing simple while still offering an outcome-focused front door.

### 2026-05-31: Validate structure with one Node-based command

Decision:
Use the existing Node validation entrypoint and extend it rather than adding a separate validation stack.

Reason:
The repo is small, documentation-heavy, and benefits from one predictable check command.

### 2026-05-31: Add negative fixtures for structured-data validation

Decision:
Keep failing JSON fixtures under `test-fixtures/invalid-paths/`.

Reason:
The first validator pass was too weak. Negative fixtures make schema regressions visible in CI.

### 2026-05-31: Maintain only `main` after feature work is merged

Decision:
Clean up branches after merge and keep the repo state simple.

Reason:
The user repeatedly asked for aggressive cleanup and a single clean branch state.

## Rejected Or Deferred Decisions

### Do not turn the repo into a website-first product

Status:
Rejected for now

Reason:
Markdown-on-GitHub remains the required default experience. Any future website is out of scope until the current foundation is stable.

### Do not ingest large trending feeds automatically

Status:
Deferred

Reason:
Automated ingestion risks quality drift and weakens the curated nature of the repo.

### Do not restructure every catalog resource into JSON immediately

Status:
Deferred

Reason:
The first structured layer needed to prove the model without forcing a full-catalog migration.

### Do not archive or delete long-running threads before durable extraction is reviewed and committed

Status:
Active constraint

Reason:
The user explicitly asked for review and explicit approval before retirement or deletion.
