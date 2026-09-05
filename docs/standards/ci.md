# CI standards

Workflow: [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml). Keep this page as **intent**; change the YAML when behavior must change.

## Triggers

- Push to `main`, `master`, or `develop`
- Pull requests
- Weekly cron (Monday 06:00 UTC)
- `workflow_dispatch`

Concurrency cancels in-progress runs on the same ref.

## Jobs that must stay

| Job | Purpose |
| --- | --- |
| **quality** | Node 22: `npm ci`, lint, typecheck, build, `test:changelog` |
| **hacs** | HACS action with `category: plugin` (Dashboard) |
| **release** | On push to `main`/`master` after quality+hacs succeed |

Do not skip hooks or drop a required job to land a PR.

## Release

The **release** job runs only on **push** to `main` or `master`.

- Version comes from [`package.json`](../../package.json) `version`.
- Notes come from the matching section of [`CHANGELOG.md`](../../CHANGELOG.md) via `scripts/extract-changelog-section.mjs`.
- Tag is `vX.Y.Z`. Tag create and `gh release create` are **idempotent** (skip if already exists).

Do not hand-create release tags that fight this workflow. Before bumping the version: add a Keep a Changelog section and run `npm run test:changelog`. See [CONTRIBUTING.md](../../CONTRIBUTING.md) and the [changelog-version](../../.cursor/skills/changelog-version/SKILL.md) skill.

Agents must **not** run `git tag` / `gh release create` locally — CI publishes.

## Local equivalent

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm run test:changelog
pre-commit run --all-files   # after pre-commit install
```
