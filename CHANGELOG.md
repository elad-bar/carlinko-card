# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.6] - 2026-09-05

### Changed

- Control icons use Home Assistant MDI via `ha-icon` (seat heat/vent use `car-seat-heater` / `car-seat-cooler`; online uses `car-wireless`); unused hotspot SVG duplicates removed

### Fixed

- Cabin/Overview: hide map overlays until the vehicle image loads so controls do not collapse before layout height exists
- Cabin: seat heat/vent buttons show translated level labels (Off / Low / Medium / High) from ha-carlinko instead of raw states (`off`, `l1`, …)
- Lovelace card editors: stop re-rendering ha-form on every hass state tick (cached schema, stable labels) so the filtered device/entity selectors stay responsive
- Cards: skip re-renders when unrelated entities update; cache slot→entity_id resolution so busy HA instances do not re-scan the registry every state_changed
- Overview: SOC/fuel percentage, remaining range, and consumption open more-info for their entities

## [0.1.5] - 2026-09-05

### Added

- Cabin: Find car (`find` / Search) button next to engine on/off on the hood

### Changed

- Drop unused status-chip / progress-bar UI primitives and Overview `moving` slot

### Removed

- Deprecated `carlinko-climate`, `carlinko-tpms`, and `carlinko-windows` cards and editors (use `carlinko-cabin`)

### Fixed

- Playground Vite config defines `__CARD_VERSION__` so the card entry module loads and HA connect can run (was stuck on "Not connected")
- Overview: push the hero vehicle image below odometer / total range / speed so mileage text is not on the roof
- Overview: spread status hotspots — online top-right, HV bottom-left, tyres bottom-right — so they no longer overlap on mobile
- Cabin: stack window open/close above vent on the lock’s left edge (no longer cut off by the card edge)
- Cabin: lock button is green when locked and red when unlocked
- Cabin: engine button is green when running and red when off
- Cabin: windows, trunk, and sunroof open/close buttons are green when closed and red when open
- Cabin: climate +/− and quick cool/heat use full heat/cool colors (border + icon)
- Cabin: seat heat/vent always use heat/vent colors (like quick heat/cool) so they stay distinguishable
- Cabin: defog button is red (border + icon) when on; neutral when off
- Charging: Stop charging uses the same red danger style as Cabin charge-stop
- Action / hotspot / seat / TPMS chips: hover wash uses each control’s own color (`currentColor`), not accent green; neutral map actions (e.g. sunroof tilt) also darken the border so hover is visible
- Cabin map actions (engine, find, lock, windows, trunk, sunroof, …): hover wash was blocked by a stronger translucent background rule — now matches other action buttons
- Charging: replace always-green battery glyph with an electricity indicator that is green only while charging (SoC ring unchanged)

## [0.1.4] - 2026-09-05

### Fixed

- Auto-bind slots from `device_id` on real Home Assistant: match `hass.entities` `translation_key` (display registry has no `unique_id`), so Overview/Cabin image and vitals resolve without manual `image_entity` / entity overrides

## [0.1.3] - 2026-09-05

### Fixed

- Console banner now prints the real `package.json` version (was stuck at `0.1.0`, which hid whether the `hass.hassUrl` freeze fix was deployed)
- Image URL helper fails soft (warn + relative path) instead of throwing during Overview/Cabin render
- Typecheck: restore Vite `ImportMeta.env` types for the playground (`vite/client` reference)

## [0.1.2] - 2026-09-05

### Changed

- CI: bump `actions/checkout` and `actions/setup-node` to v5 (Node 24 action runtime; clears Node 20 deprecation warnings)

## [0.1.1] - 2026-09-05

### Fixed

- Overview/Cabin image URLs no longer throw when Home Assistant provides `hass.hassUrl` as a function (was freezing the dashboard with repeated `.replace` errors)

## [0.1.0] - 2026-09-05

### Fixed

- CI dist freshness check compares the shipped JS only (source maps can differ across OS builds)
- Cabin Stop charge map button is hidden when the charger is not connected (`charge_mode` is not `ac`/`dc`)
- Charging card Stop charging is hidden when the charger is not connected (`charge_mode` is not `ac`/`dc`)

### Added

- i18n stubs: English card catalog plus ha-carlinko entity name/state labels via `hass.localize` (no device prefix)
- Phase 1 Overview card (`custom:carlinko-overview`) with device_id binding, vitals, and quick controls
- Shared core: slot map, entity resolve by device unique_id, hass helpers
- Lovelace device-selector editor and HA-connected Vite playground
- Entity map, objective, and backlog docs
- Engineering pipeline ported from ha-carlinko: standards, Cursor skills, ESLint/Prettier, CI, changelog verify, HACS plugin + release workflow
- Shared UI primitives (`src/core/ui`): metrics, actions, chips, progress bar, car outline shell
- Charging card (`custom:carlinko-charging`) with device_id binding and stop-charge action
- Climate card (`custom:carlinko-climate`): setpoint −/+, HVAC on/off, quick cool/heat, seat heat/vent on car outline
- Climate helpers: `setHvacMode`, `setTemperature`, `selectOption`, target/current temp attribute readers
- TPMS card (`custom:carlinko-tpms`): status chips; per-wheel pressure/temp on `vehicle_top` map (status-only when indirect)
- Windows card (`custom:carlinko-windows`): whole-car windows open/close/vent and sunroof open/close/tilt
- Cabin card (`custom:carlinko-cabin`): climate + seat heat/vent + TPMS on one top-down map
- Cabin map: windows/sunroof icon overlays; clearer seat vs TPMS anchor spacing

### Changed

- README: live card screenshots (Overview, Cabin, Charging) above the fold
- Card config uses required `device_id` (CarLinko vehicle device) instead of entity_prefix
- Climate seat map uses `vehicle_top` image when available (SVG outline fallback)
- Shared Lovelace device editor (`CarlinkoDeviceEditor`); Overview/Cabin expose top image override
- Local development guide (`docs/DEVELOPMENT.md`)
- `npm run deploy` / `deploy:watch` copy bundle to `CARLINKO_WWW` for HA fidelity testing
- Overview card: state-colored hotspots on the vehicle image for quick actions; vertical EV/fuel gauges and promoted odometer/total range (text action row removed)
- Overview hotspot anchors on hood / door / windshield / hatch; odometer and total range side-by-side with HV; consumption beside SOC/fuel gauges
- Overview speed in the headline (next to odometer/range), shown when engine is on instead of when moving
- Climate card: icon toolbar — left AC / + / setpoint / −, right quick cool / quick heat
- Climate and TPMS merged into Cabin; removed from card picker; `carlinko-climate` / `carlinko-tpms` remain as aliases
- Cabin map anchors: front TPMS vs seat vents spaced apart; rear TPMS aligned with rear wheels
- Cabin windows/sunroof covers show a single Open or Close icon from cover state
- Overview tyre status hotspot (`tyres_ok`); Cabin no longer shows tyre status chips
- Windows card removed from picker; `carlinko-windows` remains as a Cabin alias
- Overview tyre hotspot respects `device_class: problem` (off = OK / green)
- Cabin seat heat/vent controls: larger flame/fan icons with always-on role-colored borders (red heat / blue vent)
- Tyre status: problem (`tyres_ok`) red > `tyre_status` `check_tyres` orange > green; Cabin wheel readouts and Overview hotspot share tone
- Body/access controls (engine, lock, trunk, defog, charge stop) moved from Overview onto the Cabin top-down map; Overview keeps status chips
- Cabin body/access controls use the same square icon map-action buttons as windows/sunroof (not Overview circles)
- Overview SOC/fuel use horizontal level bars under the hero (SOC left, fuel right) instead of vertical gauges
- Overview: odometer/total range/speed overlay top-left on the hero; status hotspots on bottom-right; SOC/fuel range and consumption inline under each bar
- Charging card: SoC ring + battery hero with plugged/power/time metrics; battery slot; charge state/mode as secondary rows
- Charging SoC ring keeps green fill/% when not actively charging
- Charging SoC ring draws a clear green progress arc (SVG stroke) matching the mockup
- Charging SoC ring uses a CSS conic-gradient so the green fill always renders (SVG stroke was staying gray)
- Theme tokens (`--ck-*`) map to Home Assistant theme CSS variables for dark/light themes; light-only hardcodes removed from SoC ring, outline, stage, and Overview hero text
- Narrow Lovelace columns (~360px): container-query density for Overview hotspots/vitals and Cabin map chips

### Notes

- INT-01: ha-carlinko climate has no `current_temperature` today; Cabin card shows Current only if that attribute appears at runtime
