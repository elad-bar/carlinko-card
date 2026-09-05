# Testing standards

## Required before PR / merge

From repo root:

```bash
npm run lint
npm run typecheck
npm run build
npm run test:changelog
```

`package.json` `version` must have a matching non-empty Keep a Changelog section (Added / Changed / Fixed) — enforced by `npm run test:changelog`.

## Playground (live)

For UI and control changes that touch real entities:

1. `npm run playground` with a valid `playground/.env`
2. Select a CarLinko device
3. Confirm vitals render and missing entities hide
4. Exercise only controls you own / intend to run

Do not paste tokens or personal vehicle identifiers into issues or PRs.

## Unit tests

Prefer focused tests for pure logic under `src/core/` (especially `resolve.ts`) when behavior is non-trivial. Full browser/HA E2E is not required in CI; playground remains the fidelity check.

## Dist

CI and HACS expect `dist/carlinko-card.js` to match a fresh `npm run build`. Do not hand-edit `dist/`.
