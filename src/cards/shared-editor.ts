import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { CardConfigBase, HomeAssistant } from "../core/types";

export type HaFormSchemaItem = {
  name: string;
  label?: string;
  selector: Record<string, unknown>;
};

export type HaFormSchema = HaFormSchemaItem[];

const DEVICE_AND_TITLE: HaFormSchema = [
  {
    name: "device_id",
    label: "Vehicle device",
    selector: {
      device: {
        filter: { integration: "carlinko" },
      },
    },
  },
  {
    name: "title",
    label: "Title",
    selector: { text: {} },
  },
];

export const IMAGE_ENTITY_SCHEMA: HaFormSchemaItem = {
  name: "image_entity",
  label: "Image override (optional)",
  selector: {
    entity: {
      domain: "image",
      filter: { integration: "carlinko" },
    },
  },
};

export const TOP_IMAGE_ENTITY_SCHEMA: HaFormSchemaItem = {
  name: "image_entity",
  label: "Top image override (optional)",
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

  public setConfig(config: T): void {
    this._config = { ...config };
  }

  /** Extra fields after device_id + title. */
  protected extraSchema(): HaFormSchema {
    return [];
  }

  private _schema(): HaFormSchema {
    return [...DEVICE_AND_TITLE, ...this.extraSchema()];
  }

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

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(schema: { name: string; label?: string }) =>
          schema.label || schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
