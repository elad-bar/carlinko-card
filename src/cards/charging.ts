import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import { resolveAllSlots } from "../core/resolve";
import { CHARGING_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import { isOn, pressButton } from "../core/hass";
import {
  actionStyles,
  chipStyles,
  metricStyles,
  renderActionButton,
  renderMetricRow,
  renderStatusChip,
  sharedHostStyles,
} from "../core/ui";

export type ChargingConfig = CardConfigBase;

@customElement("carlinko-charging")
export class CarlinkoCharging extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ChargingConfig;
  @state() private _busy = false;

  public setConfig(config: ChargingConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-charging-editor");
  }

  static getStubConfig(): ChargingConfig {
    return {
      device_id: "",
      title: "Charging",
    };
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return resolveAllSlots(this.hass, this._config, CHARGING_SLOTS);
  }

  private _run(action: () => Promise<void>): void {
    if (!this.hass) {
      return;
    }
    void runBusy(
      () => this._busy,
      (v) => {
        this._busy = v;
      },
      action,
      (err) => console.error("carlinko-charging action failed", err),
    );
  }

  protected render() {
    if (!this._config) {
      return html`<ha-card><div class="pad">Not configured</div></ha-card>`;
    }
    if (!this._config.device_id?.trim()) {
      return html`<ha-card
        ><div class="pad">Select a CarLinko vehicle device</div></ha-card
      >`;
    }
    if (!this.hass) {
      return html`<ha-card><div class="pad">Waiting for Home Assistant…</div></ha-card>`;
    }

    const s = this._slots();
    const charging = isOn(this.hass, s.charging);

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          <div class="chips">
            ${s.charging && this.hass.states[s.charging]
              ? renderStatusChip(charging ? "Charging" : "Not charging", {
                  ok: charging,
                })
              : nothing}
          </div>
          ${renderMetricRow(this, this.hass, "Charge state", s.charge_state)}
          ${renderMetricRow(this, this.hass, "Mode", s.charge_mode)}
          ${renderMetricRow(this, this.hass, "Remaining", s.charge_remaining)}
          ${renderMetricRow(this, this.hass, "Power", s.charge_power)}
        </div>
        ${s.charge_stop
          ? html`
              <div class="actions">
                ${renderActionButton({
                  label: "Stop charging",
                  disabled: this._busy,
                  onClick: () =>
                    this._run(() => pressButton(this.hass!, s.charge_stop!)),
                })}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static styles = [
    sharedHostStyles,
    metricStyles,
    chipStyles,
    actionStyles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-charging": CarlinkoCharging;
  }
}
