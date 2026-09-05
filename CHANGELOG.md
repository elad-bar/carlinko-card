# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-09-05

### Added

- Phase 1 Overview card (`custom:carlinko-overview`) with device_id binding, vitals, and quick controls
- Shared core: slot map, entity resolve by device unique_id, hass helpers
- Lovelace device-selector editor and HA-connected Vite playground
- Entity map, objective, and backlog docs
- Engineering pipeline ported from ha-carlinko: standards, Cursor skills, ESLint/Prettier, CI, changelog verify, HACS plugin + release workflow

### Changed

- Card config uses required `device_id` (CarLinko vehicle device) instead of entity_prefix
