# Backlog

Living backlog for CarLinko Cards. Update status as work progresses.

**Status legend:** `todo` · `in_progress` · `blocked` · `done` · `deferred`

| ID | Area | Item | Status | Notes |
| --- | --- | --- | --- | --- |
| DOC-01 | Docs | Project objective (`OBJECTIVE.md`) | done | Initial scope and card set |
| DOC-02 | Docs | This backlog (`TODO.md`) | done | Tracking document |
| DOC-03 | Docs | Entity slot → CarLinko `key` matrix | done | See `ENTITY_MAP.md` |
| DOC-04 | Docs | Install / HACS README | done | README HACS + manual install |
| DOC-05 | Docs | Local development guide | done | `docs/DEVELOPMENT.md` |
| PKG-01 | Packaging | Scaffold TS/Lit card package (Vite/Rollup) | done | Vite + Lit 3 |
| PKG-02 | Packaging | `hacs.json` (Dashboard type) + license | done | |
| PKG-03 | Packaging | Watch/deploy script to HA `www/` | done | `npm run deploy` / `deploy:watch` + `CARLINKO_WWW` |
| CORE-01 | Core | Entity slot map module | done | `src/core/slots.ts` |
| CORE-02 | Core | Entity resolver (`device_id` + unique_id) | done | `src/core/resolve.ts` |
| CORE-03 | Core | Hass helpers (state, services, more-info) | done | `src/core/hass.ts` |
| CORE-04 | Core | Shared UI primitives | done | `src/core/ui` + `busy.ts` |
| CORE-05 | Core | i18n stubs (en first) | done | Card en catalog + hass.localize entity labels; more card locales later |
| CARD-01 | Cards | Overview card | done | `custom:carlinko-overview` |
| CARD-02 | Cards | Charging card | done | `custom:carlinko-charging` |
| CARD-03 | Cards | Climate card | done | Merged into Cabin; `carlinko-climate` alias remains |
| CARD-04 | Cards | TPMS card | done | Merged into Cabin; `carlinko-tpms` alias remains |
| CARD-05 | Cards | Windows card | done | Merged into Cabin; `carlinko-windows` alias remains |
| CARD-06 | Cards | Visual editors (basic) | done | Shared device editor; image override on Overview/Cabin |
| CARD-07 | Cards | Cabin card (Climate+TPMS) | done | `custom:carlinko-cabin`; always-on seat + wheel map |
| DEV-01 | Dev | Vite playground + HA WebSocket auth | done | `npm run playground` |
| DEV-02 | Dev | Thin `hass` shim for cards outside Lovelace | done | `playground/main.ts` |
| DEV-03 | Dev | Validate Overview against live ha-carlinko | done | Playground connected; Overview shows live vitals/controls |
| INT-01 | Integration | Confirm climate `current_temperature` | done | Absent in ha-carlinko; card hides Current unless attr present |
| INT-02 | Integration | Document Overview image entity options | done | Defaults to `vehicle_front` |
| PIPE-01 | Pipeline | `docs/standards/{coding,testing,ci}.md` | done | Card-adapted from ha-carlinko |
| PIPE-02 | Pipeline | Cursor skills: add-feature, fix-bug, changelog-version | done | No translate skill yet |
| PIPE-03 | Pipeline | Pre-commit + ESLint/Prettier | done | TS/JSON/MD/YAML |
| PIPE-04 | Pipeline | CHANGELOG + verify/extract scripts + npm scripts | done | Version from `package.json` |
| PIPE-05 | Pipeline | GitHub CI (quality + HACS plugin + release) | done | Release on main |
| PIPE-06 | Pipeline | CONTRIBUTING, SECURITY, CODEOWNERS, PR template | done | |
| PIPE-07 | Pipeline | Commit `dist/carlinko-card.js` for HACS | done | Main dist no longer gitignored |
| UX-01 | Polish | Align layout with mockup refinements | done | Overview: hotspot hero + visual vitals |
| UX-02 | Polish | Mobile / responsive layout | done | Container queries ~360px; Overview/Cabin density |
| UX-03 | Polish | Theme tokens / dark HA themes | done | `--ck-*` mapped to HA theme vars; no light-only hardcodes |
| REL-01 | Release | First HACS-ready publish | done | Public `elad-bar/carlinko-card`; `v0.1.0` release; `dist/` + `hacs.json`; CI HACS job green |
| REL-02 | Release | Submit to HACS default store | todo | Optional: PR to `hacs/default` `./plugin` after custom-repo install works |

## Suggested order

1. ~~Phase 1 foundation (DOC-03, PKG, CORE, CARD-01, DEV)~~ **done**
2. ~~Pipeline (PIPE-01…PIPE-07)~~ **done**
3. ~~CORE-04 + CARD-02…CARD-05~~ **done** → ~~CARD-06 editors~~ **done**
4. ~~DOC-05 + PKG-03~~ **done** → ~~REL-01~~ **done**
5. ~~UX-* polish~~ **done** (`UX-01`…`UX-03`)
6. REL-02 (optional default-store inclusion)

## Progress log

| Date | Update |
| --- | --- |
| 2026-09-05 | Backlog created. Objective and initial mockup documented. |
| 2026-09-05 | Phase 1 implemented: `ENTITY_MAP.md`, Lit/Vite package, core resolver/helpers, `carlinko-overview`, HA playground. |
| 2026-09-05 | Config migrated to required `device_id` (removed `entity_prefix`). Lovelace device selector + playground device dropdown. |
| 2026-09-05 | Live validation: playground connected to HA; Overview mounted with live vitals/controls. Hardened `.gitignore` for env secrets. |
| 2026-09-05 | Backlog: added PIPE-01…PIPE-07 for ha-carlinko pipeline port (skills, standards, CI, changelog/release). |
| 2026-09-05 | Pipeline port complete: standards, Cursor skills, ESLint/Prettier/pre-commit, CHANGELOG scripts, CI quality+HACS+release, CONTRIBUTING/SECURITY, committed `dist/` for HACS. |
| 2026-09-05 | CORE-04 shared UI primitives + CARD-02 Charging card; playground mounts Overview and Charging. |
| 2026-09-05 | CARD-03 Climate + INT-01: no current_temperature in ha-carlinko; Current row gated on attribute; playground mounts Climate. |
| 2026-09-05 | CARD-04 TPMS: per-wheel pressure/temp on vehicle_top; indirect status-only; playground mounts TPMS. |
| 2026-09-05 | CARD-05 Windows: open/close/vent + sunroof open/close/tilt; playground pairs TPMS|Windows. |
| 2026-09-05 | CARD-06: shared Lovelace device editor; Climate/TPMS top image override in UI. |
| 2026-09-05 | DOC-05 + PKG-03: DEVELOPMENT.md; `deploy` / `deploy:watch` via `CARLINKO_WWW`. |
| 2026-09-05 | UX-01: Overview hotspot controls on vehicle image + vertical EV/fuel gauges; text action row removed. |
| 2026-09-05 | CARD-07: merged Climate+TPMS into `custom:carlinko-cabin`; old types kept as aliases; playground mounts Cabin. |
| 2026-09-05 | Cabin map spacing (front TPMS vs seats, rear on wheels) + windows/sunroof icon overlays on Cabin. |
| 2026-09-05 | Tyre OK hotspot on Overview; removed Cabin tyre chips; Windows picker dropped; playground Overview\|Cabin then Charging. |
| 2026-09-05 | Body/access controls (engine, lock, trunk, defog, charge stop) moved from Overview to Cabin map anchors. |
| 2026-09-05 | CORE-05: card i18n stubs (en) + reuse ha-carlinko entity name/state via `hass.localize` (no device prefix). |
| 2026-09-05 | UX-03 theme tokens (HA CSS vars) + UX-02 container-query density for Overview/Cabin overlays. |
| 2026-09-05 | REL-01 done: repo public with description/topics, `v0.1.0` GitHub release, HACS CI green; install via custom Dashboard repo. REL-02 added for optional `hacs/default` PR. |

## How to update

- Change **Status** in the table when starting or finishing an item.
- Add a short line to **Progress log** for meaningful milestones.
- New work: append a new `ID` in the matching area (`DOC-`, `PKG-`, `CORE-`, `CARD-`, `DEV-`, `INT-`, `PIPE-`, `UX-`, `REL-`).
- Do not delete done rows; mark them `done` so history stays visible.

## Phase 1 live validation checklist (DEV-03)

1. Copy `playground/.env.example` → `playground/.env` (or `.env.local`)
2. Set `VITE_HA_URL`, `VITE_HA_TOKEN` (long-lived access token), optional `VITE_DEVICE_ID`
3. `npm run playground` → select a CarLinko device → Apply
4. Confirm Overview shows battery/range/image when entities exist
5. Confirm missing capability entities hide controls
6. Optionally test one control (e.g. lock) on a car you own
