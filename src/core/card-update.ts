import { resolveAllSlots } from "./resolve";
import type { CardConfigBase, HomeAssistant, SlotDef } from "./types";

/**
 * Whether any of the given entity ids have a new state object reference
 * (Home Assistant replaces the state object when that entity updates).
 */
export function relevantEntityChanged(
  oldHass: HomeAssistant | undefined,
  newHass: HomeAssistant | undefined,
  entityIds: Iterable<string | undefined>,
): boolean {
  if (oldHass === newHass) {
    return false;
  }
  if (!oldHass || !newHass) {
    return true;
  }
  for (const id of entityIds) {
    if (!id) {
      continue;
    }
    if (oldHass.states[id] !== newHass.states[id]) {
      return true;
    }
  }
  return false;
}

/**
 * Caches slot → entity_id maps so cards do not re-scan hass.entities on every
 * house-wide state_changed. Invalidate on config change or entities registry swap.
 */
export class SlotMapCache {
  private _map?: Record<string, string | undefined>;
  private _deviceId?: string;
  private _imageEntity?: string;
  private _entitiesJson?: string;
  private _entitiesRef?: HomeAssistant["entities"];

  invalidate(): void {
    this._map = undefined;
    this._deviceId = undefined;
    this._imageEntity = undefined;
    this._entitiesJson = undefined;
    this._entitiesRef = undefined;
  }

  /** Last resolved map, if any (for shouldUpdate without re-resolve). */
  peek(): Record<string, string | undefined> | undefined {
    return this._map;
  }

  get(
    hass: HomeAssistant | undefined,
    config: CardConfigBase,
    slots: readonly SlotDef[],
  ): Record<string, string | undefined> {
    const deviceId = config.device_id ?? "";
    const imageEntity = config.image_entity ?? "";
    const entitiesJson = JSON.stringify(config.entities ?? null);
    const entitiesRef = hass?.entities;

    if (
      this._map &&
      this._deviceId === deviceId &&
      this._imageEntity === imageEntity &&
      this._entitiesJson === entitiesJson &&
      this._entitiesRef === entitiesRef
    ) {
      return this._map;
    }

    this._map = resolveAllSlots(hass, config, slots);
    this._deviceId = deviceId;
    this._imageEntity = imageEntity;
    this._entitiesJson = entitiesJson;
    this._entitiesRef = entitiesRef;
    return this._map;
  }
}
