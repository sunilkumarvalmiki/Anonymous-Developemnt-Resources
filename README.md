# Awesome Development Resources [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A resource-only catalog for software development learning, tools, references, roadmaps, APIs, design assets, communities, and career preparation.

This repository is optimized as a curated index of high-signal resource hubs. It should point developers toward thousands of useful resources without storing copyrighted books, binaries, screenshots, or unrelated project files.

## Contents

- [Start Here](#start-here)
- [Catalog](#catalog)
- [Curation Rules](#curation-rules)
- [Repository Automation](#repository-automation)

## Start Here

- [sindresorhus/awesome](https://github.com/sindresorhus/awesome) - The canonical meta-list of awesome lists across software and adjacent technical topics.
- [Ultimate Awesome](https://github.com/andrew/ultimate-awesome) - Automatically generated list of awesome lists on many topics, updated daily from awesome.ecosyste.ms.
- [Ecosyste.ms Awesome](https://awesome.ecosyste.ms/) - Open API service that indexes awesome lists and exposes project counts, stars, forks, topics, and update status.
- [Open Awesome](https://open-awesome.com/) - Searchable index of awesome-list projects grouped by categories and popularity.
- [AwesomeIndex](https://awesomeindex.dev/) - Discovery index for high-star resource repositories, awesome lists, and learning collections.
- [Free Programming Books](https://github.com/EbookFoundation/free-programming-books) - Large community-maintained collection of free programming books and learning resources.
- [free-for.dev](https://github.com/ripienaar/free-for-dev) - Large catalog of services with free tiers useful to developers and infrastructure teams.
- [Public APIs](https://github.com/public-apis/public-apis) - Community list of free APIs for projects, prototypes, and experiments.
- [Developer Roadmap](https://github.com/kamranahmedse/developer-roadmap) - Interactive roadmaps, guides, and learning paths for developer careers.
- [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) - Project-based learning resources for recreating real technologies from scratch.

## Catalog

<!--lint disable awesome-list-item-->
- [Resource Catalog Index](resources/README.md) - Overview of all maintained category pages in this repository.
- [High-Volume Discovery Sources](resources/high-volume-discovery.md) - Live indexes, registries, topic searches, and catalogs for finding thousands of resources.
- [Mega Indexes](resources/mega-indexes.md) - High-volume source-of-sources repositories and search indexes.
- [Learning and Roadmaps](resources/learning-roadmaps.md) - Curricula, project-based learning, courses, and structured paths.
- [Books, Courses, APIs, and Data](resources/apis-data.md) - Free books, public APIs, datasets, and reusable learning material.
- [Tools and Services](resources/tools-services.md) - Developer tools, cloud tiers, hosting, DevOps, testing, and productivity resources.
- [Languages and Frameworks](resources/languages-frameworks.md) - Language, framework, frontend, backend, and mobile ecosystem lists.
- [Design and Media](resources/design-media.md) - UI, UX, design systems, stock assets, fonts, icons, and creative coding resources.
- [Security](resources/security.md) - Ethical security, privacy, OSINT, application security, and defensive resources.
- [Career and Community](resources/career-community.md) - Interview preparation, community lists, student resources, and professional growth.
<!--lint enable awesome-list-item-->

## Curation Rules

<!--lint disable awesome-list-item-->
- Include resources only: links to repositories, official docs, learning hubs, tools, services, datasets, communities, and legally available materials.
- Do not upload copyrighted PDFs, books, videos, icon packs, course files, or scraped datasets.
- Prefer maintained, community-reviewed, source-backed resources over one-off blog posts.
- Every resource entry must have a short description and a working URL.
- Keep categories focused. If a link belongs in more than one place, choose the most useful primary category.
- Remove dead, deprecated, pirated, spammy, or unsafe links when found.
<!--lint enable awesome-list-item-->

## Repository Automation

<!--lint disable awesome-list-item-->
- GitHub Codespaces is supported through `.devcontainer/devcontainer.json`.
- Pull requests and pushes run `.github/workflows/validate.yml`.
- Scheduled validation runs weekly to catch stale formatting and link-health issues.
- `npm run validate` checks markdown resource formatting, local links, duplicate links within files, and accidental binary assets.
<!--lint enable awesome-list-item-->

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. The short version: add useful resources with descriptions, keep the catalog resource-only, and avoid uploading files that should be linked instead.
