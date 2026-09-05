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
  unique_id?: string;
  platform?: string;
  device_id?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
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
  /** Absolute HA origin for playground / proxy image URLs (no trailing slash). */
  hassUrl?: string;
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
