import { LitElement, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { t } from "../core/i18n";
import type { CardConfigBase, HomeAssistant } from "../core/types";

export type HaFormSchemaItem = {
  name: string;
  label?: string;
  selector: Record<string, unknown>;
};

export type HaFormSchema = HaFormSchemaItem[];

export const IMAGE_ENTITY_SCHEMA: HaFormSchemaItem = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" },
    },
  },
};

export const TOP_IMAGE_ENTITY_SCHEMA: HaFormSchemaItem = {
  name: "image_entity",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" },
    },
  },
};

/** Lovelace ha-form editor shared by all CarLinko cards. */
export abstract class CarlinkoDeviceEditor<
  T extends CardConfigBase,
> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: T;

  private _cachedSchema?: HaFormSchema;

  public setConfig(config: T): void {
    this._config = { ...config };
  }

  /** Extra fields after device_id + title. */
  protected extraSchema(): HaFormSchema {
    return [];
  }

  /**
   * Skip hass-only updates after the first paint. Lovelace assigns a new hass
   * on every state_changed; re-rendering ha-form re-runs expensive device /
   * entity selector filters.
   */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) {
      return true;
    }
    if (changed.has("hass")) {
      return changed.get("hass") === undefined;
    }
    return true;
  }

  private _buildSchema(): HaFormSchema {
    return [
      {
        name: "device_id",
        label: t(this.hass, "editor.device"),
        selector: {
          device: {
            filter: { integration: "carlinko" },
          },
        },
      },
      {
        name: "title",
        label: t(this.hass, "editor.title"),
        selector: { text: {} },
      },
      ...this.extraSchema().map((item) => {
        if (item.name !== "image_entity" || item.label) {
          return item;
        }
        const isTop = item === TOP_IMAGE_ENTITY_SCHEMA;
        return {
          ...item,
          label: t(
            this.hass,
            isTop ? "editor.top_image_override" : "editor.image_override",
          ),
        };
      }),
    ];
  }

  private _computeLabel = (schema: { name: string; label?: string }) =>
    schema.label || schema.name;

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = ev.detail?.value as T | undefined;
    if (!value) {
      return;
    }
    this._config = { ...value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    this._cachedSchema ??= this._buildSchema();

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._cachedSchema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
