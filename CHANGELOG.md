# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-05

### Fixed

- Cabin Stop charge map button is hidden when the charger is not connected (`charge_mode` is not `ac`/`dc`)

### Added

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

### Notes

- INT-01: ha-carlinko climate has no `current_temperature` today; Cabin card shows Current only if that attribute appears at runtime
