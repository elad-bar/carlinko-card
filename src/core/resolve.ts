import type { CardConfigBase, EntityDomain, HomeAssistant, SlotDef } from "./types";

function uniqueIdMatchesKey(uniqueId: string, key: string): boolean {
  // ha-carlinko: carlinko_{vehicle_id}_{key}
  if (uniqueId === key || uniqueId.endsWith(`_${key}`)) {
    return true;
  }
  return uniqueId.startsWith("carlinko_") && uniqueId.endsWith(`_${key}`);
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

  const matches: string[] = [];

  for (const entry of Object.values(entities)) {
    if (!entry?.entity_id || !entry.unique_id) {
      continue;
    }
    if (entry.device_id !== deviceId) {
      continue;
    }
    if (entry.disabled_by || entry.hidden_by) {
      continue;
    }
    const domain = entry.entity_id.split(".", 1)[0] as EntityDomain;
    if (!domains.includes(domain)) {
      continue;
    }
    if (!uniqueIdMatchesKey(entry.unique_id, key)) {
      continue;
    }
    matches.push(entry.entity_id);
  }

  if (matches.length === 0) {
    return undefined;
  }

  const withState = matches.find((id) => exists(hass, id));
  return withState ?? matches[0];
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
