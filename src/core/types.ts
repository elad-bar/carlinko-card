/** Minimal Home Assistant object surface used by cards. */
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HassEntityRegistryEntry {
  entity_id: string;
  /** Full entity registry only (not on HA display registry). */
  unique_id?: string;
  /**
   * EntityRegistryDisplayEntry field — ha-carlinko sets this to EntitySpec.key.
   * Primary match key on real Lovelace (unique_id is not exposed).
   */
  translation_key?: string;
  platform?: string;
  device_id?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
  /** Display registry uses boolean hidden instead of hidden_by. */
  hidden?: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  entities?: Record<string, HassEntityRegistryEntry>;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: { entity_id?: string | string[] },
  ) => Promise<unknown> | unknown;
  localize?: (key: string, ...args: unknown[]) => string;
  language?: string;
  /**
   * Load custom-integration backend translations into `localize`
   * (e.g. `loadBackendTranslation("entity", "carlinko")`).
   */
  loadBackendTranslation?: (
    category: string,
    integration?: string,
  ) => Promise<unknown>;
  /**
   * HA: `(path) => absolute URL`. Playground may pass an origin string
   * (no trailing slash) instead.
   */
  hassUrl?: string | ((path?: string) => string);
  config?: { external_url?: string; internal_url?: string };
}

export type EntityDomain =
  | "sensor"
  | "binary_sensor"
  | "switch"
  | "lock"
  | "cover"
  | "button"
  | "climate"
  | "select"
  | "number"
  | "image"
  | "device_tracker";

export interface SlotDef {
  /** UI slot name used in config.entities */
  slot: string;
  /** ha-carlinko EntitySpec.key */
  key: string;
  domain: EntityDomain;
  /** Alternate keys tried if primary missing (e.g. defrost_cmd → defrost) */
  fallbackKeys?: string[];
}

export interface CardConfigBase {
  type?: string;
  title?: string;
  /** Home Assistant device_id for the CarLinko vehicle device. */
  device_id: string;
  image_entity?: string;
  entities?: Record<string, string>;
}

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
  }
}
