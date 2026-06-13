# Known Bugs

## Content And Data Issues

### Inconsistent HackTricks URL

Severity:
Low

Impact:
The same resource is represented with different URLs across the catalog and navigator layers, which weakens consistency and can create future duplicate-data problems.

Known locations:

- `data/resources.json`
- `navigator/paths/cybersecurity-safe.md`
- `resources/security.md`

### README opener under-communicates the main value proposition

Severity:
Low

Impact:
New visitors may read the repo as another link list before they reach the stronger Resource Navigator framing.

### Some first-step recommendations are broader than intended

Severity:
Medium

Impact:
Paths that begin with large discovery hubs can erode the anti-overwhelm goal and make the navigator less differentiated.

Known candidates:

- `navigator/paths/project-tools.md`
- `navigator/paths/ai-ml-engineering.md`

## Environment And Workflow Issues

### Historical sandbox flakiness during weekly audits

Severity:
External / environment-specific

Impact:
Prior read-only audit runs sometimes failed to execute `npm run check` because of `CreateProcessAsUserW failed: 5`.

Note:
This was a runner/sandbox issue from previous sessions, not a repository code bug. Keep it documented so future agents do not misclassify it as a repo regression.
