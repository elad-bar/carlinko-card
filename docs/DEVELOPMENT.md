# Local development

How to work on CarLinko Cards against a live Home Assistant that already runs
[ha-carlinko](https://github.com/elad-bar/ha-carlinko/).

## Prerequisites

- Node.js 20+ (or current LTS) and npm
- A Home Assistant instance with the CarLinko integration and at least one vehicle
- A long-lived access token (Profile → Security → Long-lived access tokens)

Cards never call CarLinko cloud APIs. They only use HA entities and services.

## Playground (fast iteration)

The Vite playground connects over WebSocket and mounts all five cards with a thin
`hass` shim (no Lovelace required).

1. `npm ci`
2. Copy `playground/.env.example` → `playground/.env` (or `.env.local`)
3. Set `VITE_HA_URL` and `VITE_HA_TOKEN`. Optional: `VITE_DEVICE_ID` to pre-select a device
4. `npm run playground`
5. Pick a CarLinko vehicle device → Apply

Layout: Overview | TPMS, then Charging | Climate, then Windows.

**Secrets:** never commit `.env` / tokens. Redact them from logs and screenshots.

## Fidelity deploy (real Lovelace)

For editor UX, themes, and full HA chrome, copy the built bundle into HA’s `www/`
folder (Samba, SSHFS, or a local checkout of `/config`).

1. Point `CARLINKO_WWW` at the target directory, for example:
   - Windows: `D:\HA\config\www\carlinko-card`
   - Unix: `/mnt/ha/config/www/carlinko-card`
2. One-shot build + copy:

   ```bash
   # Windows PowerShell
   $env:CARLINKO_WWW = "D:\HA\config\www\carlinko-card"
   npm run deploy

   # Unix
   export CARLINKO_WWW=/mnt/ha/config/www/carlinko-card
   npm run deploy
   ```

3. Watch mode (rebuild and re-copy on change):

   ```bash
   npm run deploy:watch
   ```

4. Add a Lovelace resource (if not already present):

   - URL: `/local/carlinko-card/carlinko-card.js`
   - Type: **module**

5. Hard-refresh the browser after each deploy.

If `CARLINKO_WWW` is unset, `npm run build` only writes to `dist/`. When it is set,
the Vite `closeBundle` hook also copies `carlinko-card.js` (+ `.map`) into that folder.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test:changelog
```

Optional: `pre-commit install` then `pre-commit run --all-files`.

Releases and changelog rules: [CONTRIBUTING.md](../CONTRIBUTING.md).
Standards: [docs/standards/](./standards/).

## Useful docs

- [OBJECTIVE.md](./OBJECTIVE.md) — product scope
- [ENTITY_MAP.md](./ENTITY_MAP.md) — slot → ha-carlinko keys
- [TODO.md](./TODO.md) — backlog
