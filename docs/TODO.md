# Backlog

Living backlog for CarLinko Cards. Update status as work progresses.

**Status legend:** `todo` · `in_progress` · `blocked` · `done` · `deferred`

| ID | Area | Item | Status | Notes |
| --- | --- | --- | --- | --- |
| DOC-01 | Docs | Project objective (`OBJECTIVE.md`) | done | Initial scope and card set |
| DOC-02 | Docs | This backlog (`TODO.md`) | done | Tracking document |
| DOC-03 | Docs | Entity slot → CarLinko `key` matrix | done | See `ENTITY_MAP.md` |
| DOC-04 | Docs | Install / HACS README | done | README HACS + manual install |
| DOC-05 | Docs | Local development guide | todo | CONTRIBUTING covers basics; expand later |
| PKG-01 | Packaging | Scaffold TS/Lit card package (Vite/Rollup) | done | Vite + Lit 3 |
| PKG-02 | Packaging | `hacs.json` (Dashboard type) + license | done | |
| PKG-03 | Packaging | Watch/deploy script to HA `www/` | todo | Fidelity testing path |
| CORE-01 | Core | Entity slot map module | done | `src/core/slots.ts` |
| CORE-02 | Core | Entity resolver (`device_id` + unique_id) | done | `src/core/resolve.ts` |
| CORE-03 | Core | Hass helpers (state, services, more-info) | done | `src/core/hass.ts` |
| CORE-04 | Core | Shared UI primitives | done | `src/core/ui` + `busy.ts` |
| CORE-05 | Core | i18n stubs (en first) | todo | Expand locales later |
| CARD-01 | Cards | Overview card | done | `custom:carlinko-overview` |
| CARD-02 | Cards | Charging card | done | `custom:carlinko-charging` |
| CARD-03 | Cards | Climate card | done | `custom:carlinko-climate`; purify deferred |
| CARD-04 | Cards | TPMS card | todo | Per-wheel + status; hide if indirect |
| CARD-05 | Cards | Windows card | todo | Windows + sunroof |
| CARD-06 | Cards | Visual editors (basic) | todo | device_id picker exists for Overview; expand later |
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
| UX-01 | Polish | Align layout with mockup refinements | deferred | Discuss later |
| UX-02 | Polish | Mobile / responsive layout | deferred | |
| UX-03 | Polish | Theme tokens / dark HA themes | deferred | |
| REL-01 | Release | First HACS-ready publish | todo | Pipeline ready; push to main when repo is remote |

## Suggested order

1. ~~Phase 1 foundation (DOC-03, PKG, CORE, CARD-01, DEV)~~ **done**
2. ~~Pipeline (PIPE-01…PIPE-07)~~ **done**
3. ~~CORE-04 + CARD-02 Charging~~ **done** → ~~CARD-03 Climate~~ **done** → CARD-04 → CARD-05 → CARD-06
4. DOC-05 → PKG-03 → REL-01
5. UX-* when visuals are reviewed

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
