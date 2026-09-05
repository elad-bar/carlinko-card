import type { EntityDomain, HomeAssistant } from "../types";
import { CARD_EN, type CardStringPath } from "./en";
import {
  ENTITY_NAME_FALLBACKS,
  ENTITY_STATE_FALLBACKS,
} from "./entity-fallbacks";

const CARLINKO_DOMAIN = "carlinko";

let translationsLoaded = false;
let translationsPromise: Promise<boolean> | undefined;

function lookupCardPath(path: CardStringPath): string {
  const [group, key] = path.split(".", 2) as [keyof typeof CARD_EN, string];
  const section = CARD_EN[group] as Record<string, string> | undefined;
  return section?.[key] ?? path;
}

function localizeResolved(
  hass: HomeAssistant | undefined,
  key: string,
): string | undefined {
  const raw = hass?.localize?.(key);
  if (typeof raw !== "string" || !raw.trim()) {
    return undefined;
  }
  // Unresolved keys often echo the key path back.
  if (raw === key || raw.startsWith("component.carlinko.")) {
    return undefined;
  }
  return raw;
}

/** Card-only string (English stub catalog). */
export function t(
  _hass: HomeAssistant | undefined,
  path: CardStringPath,
): string {
  return lookupCardPath(path);
}

/** Short entity name from ha-carlinko (no device/plate prefix). */
export function entityName(
  hass: HomeAssistant | undefined,
  domain: EntityDomain | string,
  key: string,
): string {
  const locKey = `component.${CARLINKO_DOMAIN}.entity.${domain}.${key}.name`;
  const fromHass = localizeResolved(hass, locKey);
  if (fromHass) {
    return fromHass;
  }
  return ENTITY_NAME_FALLBACKS[domain]?.[key] ?? key;
}

/** Translated enum state label from ha-carlinko. */
export function entityState(
  hass: HomeAssistant | undefined,
  domain: EntityDomain | string,
  key: string,
  state: string | undefined,
): string {
  if (!state) {
    return "—";
  }
  const normalized = state.toLowerCase();
  const locKey = `component.${CARLINKO_DOMAIN}.entity.${domain}.${key}.state.${normalized}`;
  const fromHass = localizeResolved(hass, locKey);
  if (fromHass) {
    return fromHass;
  }
  return ENTITY_STATE_FALLBACKS[domain]?.[key]?.[normalized] ?? state;
}

/** HV hotspot label: "HV" + translated state (Ready / LV / …). */
export function hvLabel(
  hass: HomeAssistant | undefined,
  state: string | undefined,
): string {
  const prefix = t(hass, "status.hv_prefix");
  const stateLabel = entityState(
    hass,
    "sensor",
    "hv_state",
    state || "unknown",
  );
  return `${prefix} ${stateLabel}`;
}

/**
 * Ensure carlinko entity translations are loaded into hass.localize.
 * Returns true when a load just completed (caller should requestUpdate).
 */
export async function ensureCarlinkoTranslations(
  hass: HomeAssistant | undefined,
): Promise<boolean> {
  if (!hass?.loadBackendTranslation || translationsLoaded) {
    return false;
  }
  if (!translationsPromise) {
    translationsPromise = hass
      .loadBackendTranslation("entity", CARLINKO_DOMAIN)
      .then(() => {
        translationsLoaded = true;
        return true;
      })
      .catch((err) => {
        console.warn("carlinko-card: failed to load entity translations", err);
        translationsPromise = undefined;
        return false;
      });
  }
  return translationsPromise;
}
