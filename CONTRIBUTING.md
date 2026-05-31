# Contributing

This repository is a resource-only development catalog. Contributions should improve the quality, breadth, accuracy, and maintainability of the resource list.

## What Belongs Here

- Official documentation, learning hubs, open source repositories, roadmaps, tools, public APIs, datasets, communities, and legally available learning material.
- Awesome-style lists that aggregate useful development resources.
- Free or freemium developer services when the free tier is meaningful and clearly described.
- Ethical, defensive, and educational security resources.

## What Does Not Belong Here

- Uploaded PDFs, copied books, course files, videos, icon packs, stock images, archives, or scraped datasets.
- Piracy, credential theft, malware distribution, spam, referral farms, low-quality link dumps, or unsafe instructions.
- One-off blog posts unless they are uniquely valuable and maintained.
- Duplicate links in the same category file.
- Resources without descriptions.

## Entry Format

Use one line per resource:

```markdown
- [Resource Name](https://example.com/) - Short description ending with punctuation.
```

Keep descriptions factual. Do not use hype-only phrases such as "best ever" or "must-have" without explaining what the resource provides.

## Category Placement

- Use [resources/mega-indexes.md](resources/mega-indexes.md) for large indexes and source-of-sources repositories.
- Use the most specific category page for direct resources.
- If a resource fits multiple categories, choose the primary user intent.
- Use [navigator/README.md](navigator/README.md) only for goal-based recommendations, not for every new link.

## Structured Resource Data

When a resource is important enough to appear in a navigator path, add it to [data/resources.json](data/resources.json).

Each resource must include:

- `id` in lowercase kebab-case.
- `name`, `url`, and a factual `description`.
- `categories`, `topics`, `level`, `format`, `cost`, `trust`, `useCases`, and `timeToValue`.
- A unique URL.

Allowed values:

- `level`: `beginner`, `intermediate`, `advanced`, `all-levels`.
- `format`: `docs`, `course`, `roadmap`, `book`, `tool`, `api`, `dataset`, `project`, `practice`, `community`, `reference`, `list`.
- `cost`: `free`, `freemium`, `paid`, `mixed`.
- `trust`: `official`, `popular`, `community-maintained`, `project-based`, `beginner-friendly`, `regularly-updated`.
- `timeToValue`: `fast`, `medium`, `deep`.

## Resource Navigator Paths

When improving [data/paths.json](data/paths.json) or pages in [navigator/paths](navigator/paths), keep each path short and useful:

- Use 1 to 3 essentials.
- Use up to 5 next resources.
- Use up to 5 deep dives.
- Include at least one "skip until later" note.
- Include a checkpoint that proves the learner used the resources.
- Link to existing category pages when the user needs more options.
- Do not turn a path into a huge category list.

## Pull Request Checklist

- [ ] I added only resource links, documentation, or repository-maintenance files.
- [ ] Every new resource has a description.
- [ ] I updated `data/resources.json` if the resource appears in a navigator path.
- [ ] I updated `data/paths.json` and the matching markdown page if I changed a navigator recommendation.
- [ ] I did not upload copyrighted or binary resource files.
- [ ] I ran `npm run validate`.
- [ ] I removed duplicate links in the same file.

## Review Standard

Maintainers should prefer fewer high-quality links over large unverified dumps. New entries should be useful, reachable, safe, and aligned with software development.
