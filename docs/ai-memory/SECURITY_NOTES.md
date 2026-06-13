# Security Notes

## Scope

This repository is a resource catalog with maintenance automation. The main security surfaces are:

- unsafe or hijacked outbound links
- accidental secret exposure
- risky workflow permissions
- repository drift into unsafe or unlawful security material

## Durable Security Rules

- Never store secrets, API keys, tokens, cookies, passwords, or private credentials in repo memory files.
- Remove or flag links that lead to malware, phishing, credential theft, piracy, or unrelated redirects.
- Keep security resources ethical, defensive, and educational.
- Prefer least-privilege GitHub Actions permissions.
- Prefer PR-based automation over silent direct edits to `main`.

## Known Security-Relevant Files

- `SECURITY.md`
- `.github/workflows/validate.yml`
- `.github/ISSUE_TEMPLATE/resource-suggestion.yml`
- `scripts/validate-resources.mjs`

## Secrets Handling

- Secrets scans must run before memory-doc commits when possible.
- If a source thread contains sensitive material, summarize the durable lesson without copying the secret.
- Do not quote private vulnerability details into public docs.

## Needs Verification

- Whether future Codex automation should commit directly to PR branches or stay artifact-only by default
- Whether any existing external resources have changed ownership or trust posture since the last weekly audit
