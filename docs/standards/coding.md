# Coding standards

Project invariants for CarLinko Cards (Lovelace / HACS Dashboard). Change this file when the rules change.

## Layers

| Path | Role |
| --- | --- |
| `src/core/` | Shared types, slot map, entity resolve, hass helpers — no card layout |
| `src/cards/` | Lit custom cards and editors |
| `src/carlinko-card.ts` | Entry: register elements + `window.customCards` |
| `playground/` | Local HA-connected shell only; not shipped to HACS |
| `docs/` | Objective, entity map, backlog, standards |
| `dist/` | Built `carlinko-card.js` for HACS / manual install |

Keep platforms thin: cards call `resolve` + `hass` helpers; do not duplicate entity-id guessing in UI code.

## UI copy (i18n)

- Card chrome and action phrasing: `src/core/i18n` (`t(...)`). English stubs only for now.
- Entity labels and enum states: `entityName` / `entityState` via `hass.localize` (`component.carlinko.entity…`) — short names without the device/plate. Never use `friendly_name` for UI labels.

## Entity binding

- Cards bind to a Home Assistant **`device_id`** (CarLinko vehicle device).
- Slots map to ha-carlinko `EntitySpec.key` values — see [ENTITY_MAP.md](../ENTITY_MAP.md).
- Resolution order: slot override → entities on `device_id` with matching `unique_id` → hide if missing.
- When adding or renaming slots, update `ENTITY_MAP.md` and `src/core/slots.ts` together.

## Secrets and privacy

- Never commit `.env`, tokens, long-lived access tokens, or VIN/plate in logs, screenshots, or PRs.
- Playground credentials stay in gitignored `playground/.env`.

## Style

- TypeScript strict; Lit 3 custom elements.
- Prefer small focused PRs (one feature or fix).
- After UI or resolver changes: `npm run build` so `dist/carlinko-card.js` stays in sync for HACS.
