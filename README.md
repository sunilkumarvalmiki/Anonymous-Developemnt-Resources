# Awesome Development Resources [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

A simple, resource-only guide to useful development links.

This project collects trusted resources for learning software development, choosing tools, building projects, preparing for interviews, and finding developer communities. It is not a place for uploaded PDFs, copied courses, binaries, icon packs, or random files. Everything here should be a useful link with a clear reason to exist.

## Contents

- [What Makes This Different](#what-makes-this-different)
- [Who This Is For](#who-this-is-for)
- [How To Use This Repo](#how-to-use-this-repo)
- [Start Here](#start-here)
- [Catalog](#catalog)
- [Resource Navigator Direction](#resource-navigator-direction)
- [Curation Rules](#curation-rules)
- [Automation](#automation)

## What Makes This Different

Most resource repositories try to collect as many links as possible. That is useful, but it can also overwhelm people.

This project is moving toward a different goal:

> Tell us your goal. We give you the shortest trusted resource path.

The long-term direction is a **Resource Navigator**: outcome-based paths that tell a developer what to use first, what to use next, what to skip for now, and why. The design is documented in [Resource Navigator Design](docs/superpowers/specs/2026-05-31-resource-navigator-design.md).

## Who This Is For

- Beginners who do not know where to start.
- Self-taught developers who need a clear learning path.
- Developers choosing tools for a new project.
- Job seekers preparing for interviews.
- Open source contributors looking for useful starting points.
- Mentors, teachers, and agents that need organized developer-resource data.

## How To Use This Repo

1. If you want the biggest trusted resource hubs, start with the `Start Here` section.
2. If you already know the topic you need, browse the `Catalog` section.
3. Before adding links, read the `Curation Rules` section.
4. To suggest or improve resources, follow `CONTRIBUTING.md`.

## Start Here

These links are good first stops because they point to many other high-quality resources.

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

Use these pages when you want to browse by topic.

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

## Resource Navigator Direction

The next major improvement is to add goal-based paths. Instead of giving users hundreds of links at once, each path should answer:

- What should I use first?
- What should I use next?
- What can I skip until later?
- Why is this resource recommended?
- What small project or checkpoint proves I used the resources well?

Planned paths include:

<!--lint disable awesome-list-item-->
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
<!--lint enable awesome-list-item-->

## Curation Rules

Use these rules to keep the repository useful and safe.

<!--lint disable awesome-list-item-->
- Include resources only: repositories, official docs, learning hubs, tools, services, datasets, communities, APIs, and legally available material.
- Do not upload copyrighted PDFs, books, videos, icon packs, course files, archives, scraped datasets, or binaries.
- Prefer maintained, community-reviewed, source-backed resources over one-off blog posts.
- Every resource entry must have a short description and a working URL.
- Put each resource in the most useful category.
- Remove dead, deprecated, pirated, spammy, unsafe, or misleading links when found.
<!--lint enable awesome-list-item-->

## Automation

This repository uses automation to keep the catalog maintainable.

<!--lint disable awesome-list-item-->
- GitHub Codespaces is supported through `.devcontainer/devcontainer.json`.
- Pull requests and pushes run `.github/workflows/validate.yml`.
- Scheduled GitHub Actions check formatting and link health.
- `npm run validate` checks markdown formatting, local links, duplicate links within files, and accidental binary assets.
- A weekly Codex audit reviews README clarity, project positioning, resource quality, stale links, unsafe links, and possible Resource Navigator improvements.
<!--lint enable awesome-list-item-->

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

The short version:

<!--lint disable awesome-list-item-->
- Add useful resources, not files.
- Write clear descriptions.
- Avoid duplicates.
- Keep the project focused on development resources.
- Improve paths and recommendations when the Resource Navigator is implemented.
<!--lint enable awesome-list-item-->
