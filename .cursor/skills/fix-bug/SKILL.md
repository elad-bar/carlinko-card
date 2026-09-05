---
name: fix-bug
description: >-
  Fixes a CarLinko Cards bug with reproduce via playground, correct layer,
  regression where practical, and changelog Fixed entry. Use when fixing
  resolver, card render, editor, or playground issues.
---

# Fix a bug

Read before editing:

- [docs/standards/coding.md](../../../docs/standards/coding.md)
- [docs/standards/testing.md](../../../docs/standards/testing.md)
- [docs/standards/ci.md](../../../docs/standards/ci.md)

## Checklist

1. **Reproduce** with `npm run playground` and a real CarLinko device when possible. Redact tokens and personal identifiers from logs.
2. **Locate the layer**: resolve vs hass helpers vs card template vs editor vs playground shim.
3. **Regression** when practical (e.g. resolve unit case or clear repro steps in PR).
4. **Version and changelog**: follow [changelog-version](../changelog-version/SKILL.md) (`### Fixed`).
5. **Build**: `npm run build` if shipped card code changed.
6. **Before PR:** lint, typecheck, build, `test:changelog` / pre-commit until clean. Do not skip hooks.
7. **PR**: focused fix and test plan.
