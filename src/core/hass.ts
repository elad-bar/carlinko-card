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

/** True when charge_mode indicates AC/DC plug connected. */
export function isChargerConnected(
  hass: HomeAssistant | undefined,
  chargeModeEntityId: string | undefined,
): boolean {
  const mode = getStateValue(hass, chargeModeEntityId);
  return mode === "ac" || mode === "dc";
}

/**
 * True when a binary sensor indicates an active problem.
 * For `device_class: problem`, HA uses on=problem / off=clear.
 * Otherwise treat on as healthy (e.g. a positively named `tyres_ok`).
 */
export function hasActiveProblem(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): boolean {
  const entity = getState(hass, entityId);
  if (!entity) {
    return false;
  }
  const on = entity.state === "on";
  if (entity.attributes.device_class === "problem") {
    return on;
  }
  return !on;
}

/** Tyre tone: problem (danger) > check_tyres (warn) > ok. */
export type TyreTone = "ok" | "warn" | "danger";

export function getTyreTone(
  hass: HomeAssistant | undefined,
  problemEntityId: string | undefined,
  statusEntityId: string | undefined,
): TyreTone {
  if (hasActiveProblem(hass, problemEntityId)) {
    return "danger";
  }
  if (getStateValue(hass, statusEntityId) === "check_tyres") {
    return "warn";
  }
  return "ok";
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

/** Format a charge-remaining sensor (minutes) as `4h 15m` / `45m`. */
export function formatMinutesRemaining(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  fallback = "—",
): string {
  const minutes = getNumericState(hass, entityId);
  if (minutes === undefined || minutes < 0) {
    return fallback;
  }
  const total = Math.round(minutes);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h <= 0) {
    return `${m}m`;
  }
  if (m <= 0) {
    return `${h}h`;
  }
  return `${h}h ${m}m`;
}

function withHassBase(
  hass: HomeAssistant | undefined,
  path: string,
): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const hassUrl = hass?.hassUrl;
  // Home Assistant exposes hassUrl(path); playground may pass an origin string.
  if (typeof hassUrl === "function") {
    return hassUrl(path);
  }
  if (typeof hassUrl === "string" && hassUrl) {
    const base = hassUrl.replace(/\/$/, "");
    return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  }
  return path;
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

/** True when a cover is open or in the process of opening. */
export function isCoverOpen(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): boolean {
  const state = getStateValue(hass, entityId);
  return state === "open" || state === "opening";
}

export async function pressButton(
  hass: HomeAssistant,
  entityId: string,
): Promise<void> {
  await callEntityService(hass, "button", "press", entityId);
}

export function getAttrNumber(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  attr: string,
): number | undefined {
  const entity = getState(hass, entityId);
  if (!entity) {
    return undefined;
  }
  const raw = entity.attributes[attr];
  if (raw === undefined || raw === null) {
    return undefined;
  }
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function getClimateTargetTemp(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number | undefined {
  return getAttrNumber(hass, entityId, "temperature");
}

export function getClimateCurrentTemp(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number | undefined {
  return getAttrNumber(hass, entityId, "current_temperature");
}

export function getClimateTempStep(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number {
  return getAttrNumber(hass, entityId, "target_temp_step") ?? 1;
}

export function getClimateMinTemp(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number {
  return getAttrNumber(hass, entityId, "min_temp") ?? 16;
}

export function getClimateMaxTemp(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): number {
  return getAttrNumber(hass, entityId, "max_temp") ?? 30;
}

export function isClimateOn(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): boolean {
  const state = getStateValue(hass, entityId);
  return (
    state === "cool" ||
    state === "heat" ||
    state === "heat_cool" ||
    state === "auto" ||
    state === "fan_only" ||
    state === "dry" ||
    state === "on"
  );
}

export async function setHvacMode(
  hass: HomeAssistant,
  entityId: string,
  hvacMode: string,
): Promise<void> {
  await callEntityService(hass, "climate", "set_hvac_mode", entityId, {
    hvac_mode: hvacMode,
  });
}

export async function setTemperature(
  hass: HomeAssistant,
  entityId: string,
  temperature: number,
): Promise<void> {
  await callEntityService(hass, "climate", "set_temperature", entityId, {
    temperature,
  });
}

export async function selectOption(
  hass: HomeAssistant,
  entityId: string,
  option: string,
): Promise<void> {
  await callEntityService(hass, "select", "select_option", entityId, {
    option,
  });
}

export function getSelectOptions(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
): string[] {
  const entity = getState(hass, entityId);
  const opts = entity?.attributes.options;
  if (!Array.isArray(opts)) {
    return [];
  }
  return opts.map(String);
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
