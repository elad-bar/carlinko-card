import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { TpmsConfig } from "./tpms";
import type { HomeAssistant } from "../core/types";

type HaFormSchema = Array<{
  name: string;
  label?: string;
  selector: Record<string, unknown>;
}>;

@customElement("carlinko-tpms-editor")
export class CarlinkoTpmsEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: TpmsConfig;

  public setConfig(config: TpmsConfig): void {
    this._config = { ...config };
  }

  private _schema(): HaFormSchema {
    return [
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
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = ev.detail?.value as TpmsConfig | undefined;
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

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-tpms-editor": CarlinkoTpmsEditor;
  }
}
