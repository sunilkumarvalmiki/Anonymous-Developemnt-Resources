# Resource Navigator Design

## Purpose

This repository should become more than another development-resource list. Its differentiated promise is:

> Tell us your goal. We give you the shortest trusted resource path.

The project should continue to be resource-only, but it should shift from volume-first collection toward outcome-first recommendations. Large catalogs answer "what resources exist?" The Resource Navigator answers "given my goal, what should I use first, what should I ignore, and why?"

## Current Context

The repository now has:

- A modernized README and category catalog under `resources/`.
- Validation through `scripts/validate-resources.mjs`.
- GitHub Actions validation.
- Contribution, security, license, issue, PR, and Codespaces setup.
- A separate PR for high-volume discovery sources.

The next step should add a navigator layer without replacing the existing catalog. The catalog remains useful for browsing. The navigator becomes the front door for users who want a decision.

## Audience

Primary users:

- Beginners who are overwhelmed by too many links.
- Self-taught developers trying to pick a learning path.
- Developers starting a project and choosing tools.
- Job seekers preparing for interviews.
- Contributors looking for a small set of high-value open source resources.

Secondary users:

- Maintainers curating resources.
- Agents and automation reading structured resource metadata.
- Educators or mentors sharing focused packs with learners.

## Design Principles

- Outcome-first: organize around goals, not only topics.
- Anti-overwhelm: each path starts with 3 essentials and 5 next resources.
- Explain the ranking: each recommended resource needs a reason.
- Resource-only: link to resources; do not upload books, courses, videos, binaries, or scraped data.
- Trust metadata: every structured resource should state level, cost, format, trust signals, and use cases.
- AI-readable: keep the same recommendations available in JSON for agents, scripts, and future site generation.
- GitHub-first: markdown should be useful without a website.

## Proposed User Experience

The README gets a new early section named `Find Your Path`.

It links to `navigator/README.md`, which asks users to choose a goal:

- Start Programming From Zero.
- Become a Frontend Developer.
- Become a Backend Developer.
- Build Full-Stack Projects.
- Learn AI/ML Engineering.
- Learn DevOps and Cloud.
- Learn Cybersecurity Safely.
- Prepare for Developer Interviews.
- Contribute to Open Source.
- Find Tools for a New Project.

Each path page follows the same structure:

- Who this is for.
- Outcome you should be able to reach.
- Use these 3 resources first.
- Use these 5 resources next.
- Optional deep dives.
- Skip these until later.
- Project or practice checkpoint.
- Related catalog pages.

## Repository Structure

Create:

- `navigator/README.md`: the human entry point for goal-based navigation.
- `navigator/paths/start-programming.md`: first programming path.
- `navigator/paths/frontend-developer.md`: frontend path.
- `navigator/paths/backend-developer.md`: backend path.
- `navigator/paths/full-stack-projects.md`: full-stack project path.
- `navigator/paths/ai-ml-engineering.md`: AI and machine learning path.
- `navigator/paths/devops-cloud.md`: DevOps and cloud path.
- `navigator/paths/cybersecurity-safe.md`: ethical security path.
- `navigator/paths/interview-prep.md`: interview preparation path.
- `navigator/paths/open-source-contributor.md`: open source contribution path.
- `navigator/paths/project-tools.md`: tool selection path.
- `data/resources.json`: structured resource metadata.
- `data/paths.json`: structured path definitions.

Modify:

- `README.md`: add `Find Your Path` near the top and link to `navigator/README.md`.
- `resources/README.md`: mention the navigator as the decision layer.
- `CONTRIBUTING.md`: add rules for path and resource metadata contributions.
- `scripts/validate-resources.mjs`: validate JSON structure and cross-references.

## Resource Data Model

Each item in `data/resources.json` should include:

```json
{
  "id": "developer-roadmap",
  "name": "Developer Roadmap",
  "url": "https://github.com/kamranahmedse/developer-roadmap",
  "description": "Roadmaps, guides, and learning paths for developer careers.",
  "categories": ["learning", "roadmaps"],
  "topics": ["frontend", "backend", "devops", "ai"],
  "level": ["beginner", "intermediate"],
  "format": ["roadmap", "guide"],
  "cost": "free",
  "trust": ["popular", "community-maintained"],
  "useCases": ["choose-learning-path", "career-planning"],
  "timeToValue": "fast"
}
```

Allowed values should be intentionally small:

- `level`: `beginner`, `intermediate`, `advanced`, `all-levels`.
- `format`: `docs`, `course`, `roadmap`, `book`, `tool`, `api`, `dataset`, `project`, `practice`, `community`, `reference`, `list`.
- `cost`: `free`, `freemium`, `paid`, `mixed`.
- `trust`: `official`, `popular`, `community-maintained`, `project-based`, `beginner-friendly`, `regularly-updated`.
- `timeToValue`: `fast`, `medium`, `deep`.

## Path Data Model

Each item in `data/paths.json` should include:

```json
{
  "id": "frontend-developer",
  "title": "Become a Frontend Developer",
  "goal": "Build and deploy usable frontend projects with modern web tools.",
  "audience": ["beginner", "intermediate"],
  "essentials": ["mdn-web-docs", "freecodecamp", "frontend-mentor"],
  "next": ["developer-roadmap", "the-odin-project", "awesome-react", "awesome-vue", "web-dev"],
  "deepDives": ["frontend-dev-bookmarks", "awesome-tailwindcss", "awesome-design-systems"],
  "skipUntilLater": [
    "Do not start with every frontend framework. Build plain HTML, CSS, and JavaScript fundamentals first.",
    "Do not optimize for micro-frontends before building and deploying small projects."
  ],
  "checkpoint": "Build and deploy a responsive portfolio page plus one API-backed project.",
  "relatedPages": ["resources/learning-roadmaps.md", "resources/languages-frameworks.md", "resources/design-media.md"]
}
```

## Ranking Rules

Within each path:

- Essentials must be limited to 3 resources.
- Next resources must be limited to 5 resources.
- Deep dives should be optional and limited to 5 resources.
- Every resource ID must exist in `data/resources.json`.
- Every path should include at least one project or practice checkpoint.
- Each path should include at least one "skip until later" note to reduce wasted effort.

## Validation Rules

Extend `scripts/validate-resources.mjs` to check:

- `data/resources.json` and `data/paths.json` parse as JSON.
- Resource IDs are unique, lowercase kebab-case, and non-empty.
- Resource URLs are unique.
- Required resource fields exist and are non-empty.
- Enum fields use allowed values.
- Path IDs are unique and lowercase kebab-case.
- Path resource references exist in `data/resources.json`.
- Path limits are enforced: 3 essentials, 5 next resources, 5 deep dives.
- Path local links in `relatedPages` exist.

The existing markdown and binary-asset validation should remain.

## Initial Content Scope

The first implementation should seed enough data to prove the model:

- At least 35 structured resources.
- All 10 navigator paths.
- Each path includes essentials, next resources, optional deep dives, skip notes, checkpoint, and related catalog pages.

This is enough to make the concept visible without trying to structure every resource in the catalog at once.

## Popularity Strategy

The repo should communicate a sharper public identity:

- Tagline: "The shortest trusted path to the right development resources."
- README top section: "Pick your goal. Start with the right 3 resources."
- Social proof later: stars, checks, and weekly resource radar after those features exist.
- Contributor hook: "Improve a path, not just a list."
- Agent hook: "Use the JSON to generate learning plans and tool recommendations."

## Out of Scope For First Implementation

- Searchable website.
- GitHub Pages UI.
- Automated trending-resource ingestion.
- Full scoring algorithm.
- Importing or restructuring every existing catalog link into JSON.
- AI-generated personalized plans at runtime.

These should come after the markdown and JSON foundation is stable.

## Risks and Mitigations

- Risk: The navigator becomes subjective.
  - Mitigation: Every recommendation has a reason and a checkpoint.
- Risk: JSON and markdown drift apart.
  - Mitigation: Generate path pages later or validate cross-references now.
- Risk: The repo loses awesome-list simplicity.
  - Mitigation: Keep catalog pages intact and make the navigator an additional layer.
- Risk: Too much data entry slows progress.
  - Mitigation: Start with 35 resources and 10 paths, then expand through contributions.

## Success Criteria

- A new visitor can choose a goal from the README in under 10 seconds.
- Each path gives a useful starting set without reading the full catalog.
- The repository remains resource-only.
- `npm run validate` enforces both markdown and JSON integrity.
- Contributors understand how to add a resource, improve a path, or suggest a new path.
