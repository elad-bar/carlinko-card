import type {
  CardConfigBase,
  EntityDomain,
  HassEntityRegistryEntry,
  HomeAssistant,
  SlotDef,
} from "./types";

const CARLINKO_PLATFORM = "carlinko";

/** Match ha-carlinko EntitySpec.key against registry display / full entry. */
function entryMatchesKey(
  entry: HassEntityRegistryEntry,
  key: string,
): boolean {
  // Real HA: hass.entities is EntityRegistryDisplayEntry — has translation_key,
  // not unique_id. ha-carlinko sets translation_key = EntitySpec.key.
  if (entry.translation_key === key) {
    return true;
  }
  // Full registry / playground: unique_id = carlinko_{vehicle_id}_{key}
  const uniqueId = entry.unique_id;
  if (uniqueId) {
    if (uniqueId === key || uniqueId.endsWith(`_${key}`)) {
      return true;
    }
    if (uniqueId.startsWith("carlinko_") && uniqueId.endsWith(`_${key}`)) {
      return true;
    }
  }
  // Last resort: object_id suffix (renamed entities may keep _key).
  const objectId = entry.entity_id.split(".", 2)[1] ?? "";
  return objectId === key || objectId.endsWith(`_${key}`);
}

function domainsForKey(slotDomain: EntityDomain, key: string): EntityDomain[] {
  if (
    key === "defrost" ||
    key.endsWith("_left") ||
    key.endsWith("_right")
  ) {
    // Seat heat/vent fallbacks may be binary_sensor or switch.
    return [slotDomain, "switch", "binary_sensor"];
  }
  return [slotDomain];
}

function exists(hass: HomeAssistant, entityId: string | undefined): boolean {
  return Boolean(entityId && hass.states[entityId]);
}

function isExcluded(entry: HassEntityRegistryEntry): boolean {
  if (entry.disabled_by || entry.hidden_by) {
    return true;
  }
  // Display registry uses boolean `hidden` instead of `hidden_by`.
  if (entry.hidden) {
    return true;
  }
  return false;
}

function findOnDevice(
  hass: HomeAssistant,
  deviceId: string,
  key: string,
  domains: readonly EntityDomain[],
): string | undefined {
  const entities = hass.entities;
  if (!entities) {
    return undefined;
  }

  const matches: HassEntityRegistryEntry[] = [];

  for (const entry of Object.values(entities)) {
    if (!entry?.entity_id) {
      continue;
    }
    if (entry.device_id !== deviceId) {
      continue;
    }
    if (isExcluded(entry)) {
      continue;
    }
    const domain = entry.entity_id.split(".", 1)[0] as EntityDomain;
    if (!domains.includes(domain)) {
      continue;
    }
    if (!entryMatchesKey(entry, key)) {
      continue;
    }
    matches.push(entry);
  }

  if (matches.length === 0) {
    return undefined;
  }

  // Prefer carlinko platform when multiple domains/keys collide.
  const ranked = [...matches].sort((a, b) => {
    const ap = a.platform === CARLINKO_PLATFORM ? 0 : 1;
    const bp = b.platform === CARLINKO_PLATFORM ? 0 : 1;
    return ap - bp;
  });

  const withState = ranked.find((e) => exists(hass, e.entity_id));
  return (withState ?? ranked[0]).entity_id;
}

/**
 * Resolve a slot to an entity_id, or undefined if missing.
 */
export function resolveSlot(
  hass: HomeAssistant | undefined,
  config: CardConfigBase,
  slotDef: SlotDef,
): string | undefined {
  if (!hass) {
    return undefined;
  }

  const override = config.entities?.[slotDef.slot];
  if (override) {
    return override;
  }

  if (slotDef.slot === "image" && config.image_entity) {
    return config.image_entity;
  }

  const deviceId = config.device_id?.trim();
  if (!deviceId) {
    return undefined;
  }

  const keys = [slotDef.key, ...(slotDef.fallbackKeys ?? [])];
  for (const key of keys) {
    const domains = domainsForKey(slotDef.domain, key);
    const found = findOnDevice(hass, deviceId, key, domains);
    if (found) {
      return found;
    }
  }

  return undefined;
}

export function resolveAllSlots(
  hass: HomeAssistant | undefined,
  config: CardConfigBase,
  slots: readonly SlotDef[],
): Record<string, string | undefined> {
  const out: Record<string, string | undefined> = {};
  for (const slot of slots) {
    out[slot.slot] = resolveSlot(hass, config, slot);
  }
  return out;
}
