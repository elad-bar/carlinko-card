import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import { resolveAllSlots } from "../core/resolve";
import { OVERVIEW_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  closeCover,
  formatState,
  getNumericState,
  getStateValue,
  imageEntityUrl,
  isOn,
  lockLock,
  openCover,
  pressButton,
  toggleSwitch,
  turnOff,
  turnOn,
  unlockLock,
} from "../core/hass";
import {
  actionStyles,
  chipStyles,
  metricStyles,
  progressStyles,
  renderActionButton,
  renderMetricRow,
  renderProgressBar,
  renderStatusChip,
  sharedHostStyles,
} from "../core/ui";

export type OverviewConfig = CardConfigBase;

@customElement("carlinko-overview")
export class CarlinkoOverview extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: OverviewConfig;
  @state() private _busy = false;

  public setConfig(config: OverviewConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 6;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-overview-editor");
  }

  static getStubConfig(): OverviewConfig {
    return {
      device_id: "",
      title: "CarLinko",
    };
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return resolveAllSlots(this.hass, this._config, OVERVIEW_SLOTS);
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
      (err) => console.error("carlinko-overview action failed", err),
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
    const moving = isOn(this.hass, s.moving);
    const img = imageEntityUrl(this.hass, s.image);
    const lockState = getStateValue(this.hass, s.lock);
    const locked = lockState === "locked";
    const engineOn = isOn(this.hass, s.engine);
    const defogOn = isOn(this.hass, s.defog);
    const trunkOpen = getStateValue(this.hass, s.trunk) === "open";
    const batteryPct = getNumericState(this.hass, s.battery);

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body">
          <div class="hero">
            ${img
              ? html`<img class="car-img" src=${img} alt="Vehicle" />`
              : html`<div class="car-placeholder">No image</div>`}
          </div>
          <div class="vitals">
            ${renderMetricRow(this, this.hass, "Battery", s.battery, {
              numeric: true,
              suffix: "%",
            })}
            ${renderProgressBar(
              batteryPct,
              batteryPct !== undefined ? `Battery ${batteryPct}%` : undefined,
            )}
            ${renderMetricRow(this, this.hass, "EV range", s.range)}
            ${renderMetricRow(this, this.hass, "Fuel", s.fuel, {
              numeric: true,
              suffix: "%",
            })}
            ${renderMetricRow(this, this.hass, "Fuel range", s.fuel_range)}
            ${renderMetricRow(this, this.hass, "Total range", s.total_range)}
            <div class="chips">
              ${s.hv_state && this.hass.states[s.hv_state]
                ? renderStatusChip(`HV ${formatState(this.hass, s.hv_state)}`)
                : nothing}
              ${s.odometer && this.hass.states[s.odometer]
                ? renderStatusChip(formatState(this.hass, s.odometer))
                : nothing}
              ${s.consumption && this.hass.states[s.consumption]
                ? renderStatusChip(formatState(this.hass, s.consumption))
                : nothing}
              ${s.fuel_consumption && this.hass.states[s.fuel_consumption]
                ? renderStatusChip(formatState(this.hass, s.fuel_consumption))
                : nothing}
              ${s.online && this.hass.states[s.online]
                ? renderStatusChip(isOn(this.hass, s.online) ? "Online" : "Offline", {
                    ok: isOn(this.hass, s.online),
                  })
                : nothing}
              ${moving && s.speed && this.hass.states[s.speed]
                ? renderStatusChip(formatState(this.hass, s.speed))
                : nothing}
            </div>
          </div>
        </div>
        <div class="actions">
          ${s.lock
            ? renderActionButton({
                label: locked ? "Unlock" : "Lock",
                disabled: this._busy,
                variant: locked ? "danger" : "ok",
                onClick: () =>
                  this._run(() =>
                    locked
                      ? unlockLock(this.hass!, s.lock!)
                      : lockLock(this.hass!, s.lock!),
                  ),
              })
            : nothing}
          ${s.engine
            ? renderActionButton({
                label: `Engine ${engineOn ? "Off" : "On"}`,
                disabled: this._busy,
                variant: engineOn ? "ok" : "",
                onClick: () =>
                  this._run(() =>
                    engineOn
                      ? turnOff(this.hass!, s.engine!)
                      : turnOn(this.hass!, s.engine!),
                  ),
              })
            : nothing}
          ${s.defog
            ? renderActionButton({
                label: `Defog ${defogOn ? "On" : "Off"}`,
                disabled: this._busy || s.defog.startsWith("binary_sensor."),
                variant: defogOn ? "ok" : "",
                onClick: () =>
                  this._run(() => toggleSwitch(this.hass!, s.defog!)),
              })
            : nothing}
          ${s.charge_stop
            ? renderActionButton({
                label: "Stop charge",
                disabled: this._busy,
                onClick: () =>
                  this._run(() => pressButton(this.hass!, s.charge_stop!)),
              })
            : nothing}
          ${s.trunk
            ? renderActionButton({
                label: `Trunk ${trunkOpen ? "Close" : "Open"}`,
                disabled: this._busy,
                variant: trunkOpen ? "ok" : "",
                onClick: () =>
                  this._run(() =>
                    trunkOpen
                      ? closeCover(this.hass!, s.trunk!)
                      : openCover(this.hass!, s.trunk!),
                  ),
              })
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    sharedHostStyles,
    metricStyles,
    chipStyles,
    actionStyles,
    progressStyles,
    css`
      .body {
        display: grid;
        grid-template-columns: minmax(140px, 1fr) 1.2fr;
        gap: 16px;
        padding: 16px;
        align-items: start;
      }
      @media (max-width: 520px) {
        .body {
          grid-template-columns: 1fr;
        }
      }
      .hero {
        border-radius: 8px;
        overflow: hidden;
        background: linear-gradient(145deg, #e8eef2, #f7fafc);
        min-height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .car-img {
        width: 100%;
        height: auto;
        display: block;
        object-fit: contain;
        max-height: 180px;
      }
      .car-placeholder {
        color: var(--ck-muted);
        font-size: 0.9rem;
        padding: 24px;
      }
      .vitals {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-overview": CarlinkoOverview;
  }
}
