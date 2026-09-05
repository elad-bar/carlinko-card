import type { HassEntity, HomeAssistant } from "./types";

export function getState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): HassEntity | undefined {
  if (!hass || !entityId) {
    return undefined;
  }
  return hass.states[entityId];
}

export function getStateValue(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): string | undefined {
  return getState(hass, entityId)?.state;
}

export function getNumericState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number | undefined {
  const raw = getStateValue(hass, entityId);
  if (raw === undefined || raw === "unknown" || raw === "unavailable") {
    return undefined;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function isOn(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): boolean {
  const state = getStateValue(hass, entityId);
  return state === "on" || state === "open" || state === "unlocked";
}

export function formatState(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  fallback = "—",
): string {
  const entity = getState(hass, entityId);
  if (!entity) {
    return fallback;
  }
  if (entity.state === "unknown" || entity.state === "unavailable") {
    return fallback;
  }
  const unit = entity.attributes.unit_of_measurement;
  return unit ? `${entity.state} ${unit}` : String(entity.state);
}

function withHassBase(
  hass: HomeAssistant | undefined,
  path: string,
): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = (hass?.hassUrl || "").replace(/\/$/, "");
  if (!base) {
    return path;
  }
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Build a displayable URL for an image entity. */
export function imageEntityUrl(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): string | undefined {
  const entity = getState(hass, entityId);
  if (!entity) {
    return undefined;
  }
  const entityPicture = entity.attributes.entity_picture;
  if (typeof entityPicture === "string" && entityPicture) {
    return withHassBase(hass, entityPicture);
  }
  // HA image entities: /api/image_proxy/{entity_id}?token=...
  const token = entity.attributes.access_token;
  if (typeof token === "string" && token) {
    return withHassBase(
      hass,
      `/api/image_proxy/${entityId}?token=${encodeURIComponent(token)}`,
    );
  }
  return withHassBase(hass, `/api/image_proxy/${entityId}`);
}

export async function callEntityService(
  hass: HomeAssistant,
  domain: string,
  service: string,
  entityId: string,
  data: Record<string, unknown> = {},
): Promise<void> {
  await hass.callService(domain, service, { ...data, entity_id: entityId });
}

export async function lockLock(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "lock", "lock", entityId);
}

export async function unlockLock(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "lock", "unlock", entityId);
}

export async function turnOn(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  const domain = entityId.split(".", 1)[0];
  await callEntityService(hass, domain, "turn_on", entityId);
}

export async function turnOff(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  const domain = entityId.split(".", 1)[0];
  await callEntityService(hass, domain, "turn_off", entityId);
}

export async function toggleSwitch(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  const domain = entityId.split(".", 1)[0];
  await callEntityService(hass, domain, "toggle", entityId);
}

export async function openCover(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "cover", "open_cover", entityId);
}

export async function closeCover(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "cover", "close_cover", entityId);
}

export async function pressButton(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "button", "press", entityId);
}

export function fireMoreInfo(node: HTMLElement, entityId: string): void {
  node.dispatchEvent(
    new CustomEvent("hass-more-info", {
      bubbles: true,
      composed: true,
      detail: { entityId },
    }),
  );
}
