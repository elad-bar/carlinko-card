# CarLinko Cards

Lovelace custom cards for vehicles managed by [ha-carlinko](https://github.com/elad-bar/ha-carlinko/).

**Requires** the CarLinko integration. This repo does not talk to CarLinko cloud APIs.

## Cards (Phase 1)

| Type | Description |
| --- | --- |
| `custom:carlinko-overview` | Hero hotspots (lock / engine / defog / charge / trunk), visual ranges/vitals |
| `custom:carlinko-charging` | Charge state, mode, remaining, power, stop charging |

Five Lovelace cards (Overview, Charging, Climate, TPMS, Windows) — see [docs/OBJECTIVE.md](docs/OBJECTIVE.md).

## Install (HACS)

1. HACS → Frontend → ⋮ → **Custom repositories**
2. Add this repo URL as type **Dashboard**
3. Download **CarLinko Cards**, then hard-refresh the browser
4. Add a card (visual editor device picker, or YAML):

```yaml
type: custom:carlinko-overview
device_id: 0123456789abcdef0123456789abcdef
title: My Car
```

## Install (manual)

1. `npm ci && npm run build`
2. Copy `dist/carlinko-card.js` to `/config/www/carlinko-card/`
3. Lovelace resource: `/local/carlinko-card/carlinko-card.js` (type: **module**)

Optional overrides:

```yaml
image_entity: image.some_front
entities:
  battery: sensor.custom_battery
```

## Local playground

```bash
cp playground/.env.example playground/.env
# set VITE_HA_URL and VITE_HA_TOKEN (optional VITE_DEVICE_ID)
npm ci
npm run playground
```

## Development

See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) (playground + deploy to HA `www/`),
[CONTRIBUTING.md](CONTRIBUTING.md), and [docs/standards/](docs/standards/).
CI runs lint, typecheck, build, HACS plugin validation, and publishes GitHub releases from `CHANGELOG.md` on `main`.

Backlog: [docs/TODO.md](docs/TODO.md).

## License

MIT
