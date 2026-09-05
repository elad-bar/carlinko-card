---
name: add-feature
description: >-
  Implements a new CarLinko Cards feature in the correct layer (core, card,
  editor, playground, or docs) with ENTITY_MAP updates, changelog, and build.
  Use when adding a card, slot, control, editor field, or playground capability.
---

# Add a feature

Read before editing:

- [docs/standards/coding.md](../../../docs/standards/coding.md)
- [docs/standards/testing.md](../../../docs/standards/testing.md)
- [docs/standards/ci.md](../../../docs/standards/ci.md)

## Checklist

1. **Classify**: core / card / editor / playground / docs-only.
2. **Place the code** in the matching layer. Keep `src/core` free of layout; cards use resolve + hass helpers.
3. **Slots**: if entities/slots change, update [docs/ENTITY_MAP.md](../../../docs/ENTITY_MAP.md) and `src/core/slots.ts` together.
4. **Config**: prefer `device_id`; optional overrides via `entities` / `image_entity`.
5. **Version and changelog**: follow [changelog-version](../changelog-version/SKILL.md) (`### Added` or `### Changed`).
6. **Build**: `npm run build` so `dist/carlinko-card.js` matches source.
7. **Before PR:** from repo root, `pre-commit run --all-files` (or `npm run lint` + typecheck + build + `test:changelog`). Fix until clean. Do not skip hooks.
8. **PR**: one feature; note playground validation if UI/controls changed.
