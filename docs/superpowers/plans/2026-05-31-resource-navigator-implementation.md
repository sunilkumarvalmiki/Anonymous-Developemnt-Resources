# Resource Navigator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready Resource Navigator layer so the repository recommends the right few resources for a developer's goal instead of only listing links.

**Architecture:** Keep the existing markdown catalog intact. Add `data/resources.json` as the resource metadata source, `data/paths.json` as the outcome-path source, and `navigator/` markdown pages as the human-readable experience. Extend the existing Node validator to enforce JSON integrity and markdown/local-link quality in one command.

**Tech Stack:** Markdown, JSON, Node.js ESM, existing `npm run validate`, GitHub Actions.

---

### Task 1: Add JSON Validation Tests

**Files:**
- Create: `test-fixtures/invalid-paths/resources.json`
- Create: `test-fixtures/invalid-paths/paths.json`
- Modify: `scripts/validate-resources.mjs`

- [x] **Step 1: Add invalid fixture data**

Create `test-fixtures/invalid-paths/resources.json`:

```json
[
  {
    "id": "valid-resource",
    "name": "Valid Resource",
    "url": "https://example.com/valid",
    "description": "A valid resource.",
    "categories": ["learning"],
    "topics": ["frontend"],
    "level": ["beginner"],
    "format": ["guide"],
    "cost": "free",
    "trust": ["popular"],
    "useCases": ["learn"],
    "timeToValue": "fast"
  }
]
```

Create `test-fixtures/invalid-paths/paths.json`:

```json
[
  {
    "id": "invalid-path",
    "title": "Invalid Path",
    "goal": "Show validator failure.",
    "audience": ["beginner"],
    "essentials": ["valid-resource", "missing-resource", "another-missing-resource", "too-many"],
    "next": [],
    "deepDives": [],
    "skipUntilLater": [],
    "checkpoint": "",
    "relatedPages": ["resources/missing.md"]
  }
]
```

- [x] **Step 2: Run validation against fixture and verify it fails**

Run:

```bash
node scripts/validate-resources.mjs --root test-fixtures/invalid-paths
```

Expected: FAIL with messages for missing resource references, too many essentials, empty checkpoint, empty skip notes, and missing related page.

### Task 2: Extend Validator

**Files:**
- Modify: `scripts/validate-resources.mjs`

- [x] **Step 1: Add root argument support**

Update the script to accept `--root <path>` so fixtures can be validated without changing the working directory.

- [x] **Step 2: Add structured data validation**

Validate `data/resources.json` and `data/paths.json` when present:

- JSON parses.
- Top-level value is an array.
- IDs are unique lowercase kebab-case.
- URLs are unique.
- Required fields are non-empty.
- Enum values match the design spec.
- Path references point to existing resource IDs.
- Essentials are 1 to 3 resources.
- Next resources are 0 to 5 resources.
- Deep dives are 0 to 5 resources.
- Each path has at least one `skipUntilLater` note.
- Each path has a non-empty checkpoint.
- Related markdown pages exist.

- [x] **Step 3: Verify fixture now fails for the expected reasons**

Run:

```bash
node scripts/validate-resources.mjs --root test-fixtures/invalid-paths
```

Expected: FAIL with validation errors from the fixture.

### Task 3: Seed Resource Data

**Files:**
- Create: `data/resources.json`
- Create: `data/paths.json`

- [x] **Step 1: Add structured resources**

Add at least 45 high-signal resources covering learning, frontend, backend, full-stack, AI/ML, DevOps, security, interviews, open source, tools, APIs, datasets, and design.

- [x] **Step 2: Add 10 outcome paths**

Add the 10 paths from the design spec with essentials, next resources, deep dives, skip notes, checkpoints, and related pages.

- [x] **Step 3: Run validation**

Run:

```bash
npm run validate
```

Expected: PASS.

### Task 4: Add Human Navigator Pages

**Files:**
- Create: `navigator/README.md`
- Create: `navigator/paths/start-programming.md`
- Create: `navigator/paths/frontend-developer.md`
- Create: `navigator/paths/backend-developer.md`
- Create: `navigator/paths/full-stack-projects.md`
- Create: `navigator/paths/ai-ml-engineering.md`
- Create: `navigator/paths/devops-cloud.md`
- Create: `navigator/paths/cybersecurity-safe.md`
- Create: `navigator/paths/interview-prep.md`
- Create: `navigator/paths/open-source-contributor.md`
- Create: `navigator/paths/project-tools.md`

- [x] **Step 1: Create navigator entry page**

`navigator/README.md` should explain the Resource Navigator and link to all 10 paths.

- [x] **Step 2: Create each path page**

Each path page should include:

- Who this is for.
- Outcome.
- First 3 resources.
- Next resources.
- Optional deep dives.
- Skip until later.
- Practice checkpoint.
- Related pages.

- [x] **Step 3: Run validation**

Run:

```bash
npm run validate
```

Expected: PASS.

### Task 5: Update Entry Points and Contribution Rules

**Files:**
- Modify: `README.md`
- Modify: `resources/README.md`
- Modify: `CONTRIBUTING.md`

- [x] **Step 1: Add navigator links to README**

Promote `navigator/README.md` near the top as the recommended start for goal-based use.

- [x] **Step 2: Add navigator note to resource index**

Clarify that `resources/` is for browsing and `navigator/` is for decisions.

- [x] **Step 3: Add structured contribution rules**

Document how to add entries to `data/resources.json`, `data/paths.json`, and path markdown pages.

- [ ] **Step 4: Run validation and awesome lint**

Run:

```bash
npm run validate
npx --yes awesome-lint README.md
```

Expected: both PASS.

### Task 6: Finish and Publish

**Files:**
- All changed files.

- [ ] **Step 1: Run final checks**

Run:

```bash
npm run validate
npx --yes awesome-lint README.md
git diff --check
```

Expected: all PASS.

- [ ] **Step 2: Commit and push**

Run:

```bash
git add -A
git commit -m "Add Resource Navigator foundation"
git push -u origin sunil/resource-navigator-implementation
```

- [ ] **Step 3: Open PR**

Open a PR titled `[codex] Add Resource Navigator foundation` with summary and validation output.
