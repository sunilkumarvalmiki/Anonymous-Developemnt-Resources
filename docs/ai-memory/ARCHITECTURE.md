# Architecture

## Repository Model

The repository has two complementary user-facing layers and one validation layer:

1. Category browsing
2. Goal-based navigation
3. Validation and maintenance automation

## Layer 1: Category Browsing

`resources/` contains broad category pages for:

- mega indexes
- high-volume discovery
- learning and roadmaps
- APIs and data
- tools and services
- languages and frameworks
- design and media
- security
- career and community

This layer answers: “What useful resources exist by topic?”

## Layer 2: Goal-Based Navigation

`navigator/README.md` is the front door for decision-oriented use.

Each path page under `navigator/paths/` follows the same structure:

- audience
- outcome
- first three resources
- next resources
- deep dives
- skip-until-later notes
- practice checkpoint
- related pages

This layer answers: “Given my goal, what should I use first and what should I ignore for now?”

## Layer 3: Structured Data

`data/resources.json` is the machine-readable source for reusable resource metadata.

Each resource entry includes:

- `id`
- `name`
- `url`
- `description`
- `categories`
- `topics`
- `level`
- `format`
- `cost`
- `trust`
- `useCases`
- `timeToValue`

`data/paths.json` is the machine-readable source for navigator paths.

Each path entry includes:

- `id`
- `title`
- `goal`
- `audience`
- `essentials`
- `next`
- `deepDives`
- `skipUntilLater`
- `checkpoint`
- `relatedPages`

## Validation Architecture

`scripts/validate-resources.mjs` is the central validator. It checks:

- markdown local links and anchors
- forbidden binary/resource uploads
- structured JSON parsing and shape
- allowed enum values
- unique resource IDs and URLs
- path reference integrity
- path size limits
- related page existence

`scripts/expect-validation-failure.mjs` plus `test-fixtures/invalid-paths/` provide negative regression coverage so bad path data must fail for known reasons.

## CI/CD

`.github/workflows/validate.yml` currently provides:

- `validate` job on push and pull request
- scheduled `link-health` job using `lycheeverse/lychee-action@v2`

The repository intentionally keeps CI small and focused on content integrity rather than application builds.

## Design Constraint

Markdown must remain useful without any separate website. Structured data exists to support automation and possible future experiences, not to replace GitHub-native browsing.
