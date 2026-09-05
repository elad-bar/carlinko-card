# Contributing

Thanks for looking. This repo ships **Lovelace cards** for vehicles managed by
[ha-carlinko](https://github.com/elad-bar/ha-carlinko/). It does not talk to CarLinko cloud APIs.

## Before you start

- Read [docs/OBJECTIVE.md](docs/OBJECTIVE.md) and [docs/ENTITY_MAP.md](docs/ENTITY_MAP.md).
- Project invariants: [docs/standards/coding.md](docs/standards/coding.md),
  [testing.md](docs/standards/testing.md), [ci.md](docs/standards/ci.md).
- Cursor skills: [`.cursor/skills/`](.cursor/skills/) (`add-feature`, `fix-bug`, `changelog-version`).

## Local setup

Short path:

```bash
npm ci
cp playground/.env.example playground/.env
# set VITE_HA_URL and VITE_HA_TOKEN
npm run playground
```

Full guide (playground **and** deploy into HA `www/`): [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md).

Install hooks once (optional but recommended):

```bash
pip install pre-commit
pre-commit install
pre-commit run --all-files
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:changelog
```

## Releases

Version lives in [`package.json`](package.json). On merge to `main` / `master`, CI creates
`vX.Y.Z` (if missing) and a GitHub Release from the matching [`CHANGELOG.md`](CHANGELOG.md)
section. Agents/humans: use the changelog-version skill; **do not** create tags locally.

Before bumping for a release:

1. Compare `package.json` version to the latest GitHub release.
2. Update `CHANGELOG.md` (Keep a Changelog).
3. Run `npm run test:changelog` and `npm run build`; commit `dist/`.

## Pull requests

1. One feature or fix per PR.
2. Never commit `.env`, tokens, or personal vehicle identifiers.
3. If you change slots, update `ENTITY_MAP.md` and `src/core/slots.ts`.
4. Keep CI jobs as they are.

Backlog: [docs/TODO.md](docs/TODO.md).
