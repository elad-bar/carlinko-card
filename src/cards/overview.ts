import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import { resolveAllSlots } from "../core/resolve";
import { OVERVIEW_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  closeCover,
  fireMoreInfo,
  formatState,
  getNumericState,
  getStateValue,
  imageEntityUrl,
  isOn,
  getTyreTone,
  lockLock,
  openCover,
  pressButton,
  toggleSwitch,
  turnOff,
  turnOn,
  unlockLock,
} from "../core/hass";
import {
  CarlinkoVehicleStage,
  hotspotStyles,
  renderHotspotButton,
  renderVerticalGauge,
  sharedHostStyles,
  verticalGaugeStyles,
  type HotspotTone,
} from "../core/ui";

void CarlinkoVehicleStage;

/** ha-carlinko HV enum: off | lv | ready | unknown */
function hvHotspot(state: string | undefined): {
  label: string;
  tone: HotspotTone;
} {
  const raw = (state || "unknown").toLowerCase();
  switch (raw) {
    case "ready":
      return { label: "HV ready", tone: "ok" };
    case "lv":
      return { label: "HV LV", tone: "info" };
    case "off":
      return { label: "HV off", tone: "muted" };
    default:
      return { label: "HV unknown", tone: "warn" };
  }
}

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
    const img = imageEntityUrl(this.hass, s.image);
    const lockState = getStateValue(this.hass, s.lock);
    const locked = lockState === "locked";
    const engineOn = isOn(this.hass, s.engine);
    const defogOn = isOn(this.hass, s.defog);
    const trunkOpen = getStateValue(this.hass, s.trunk) === "open";
    const online = isOn(this.hass, s.online);
    const batteryPct = getNumericState(this.hass, s.battery);
    const fuelPct = getNumericState(this.hass, s.fuel);
    const defogReadOnly = Boolean(s.defog?.startsWith("binary_sensor."));

    const odometerText =
      s.odometer && this.hass.states[s.odometer]
        ? formatState(this.hass, s.odometer)
        : undefined;
    const totalRangeText =
      s.total_range && this.hass.states[s.total_range]
        ? formatState(this.hass, s.total_range)
        : undefined;
    const speedText =
      engineOn && s.engine && s.speed && this.hass.states[s.speed]
        ? formatState(this.hass, s.speed)
        : undefined;
    const evRangeText =
      s.range && this.hass.states[s.range]
        ? formatState(this.hass, s.range)
        : undefined;
    const fuelRangeText =
      s.fuel_range && this.hass.states[s.fuel_range]
        ? formatState(this.hass, s.fuel_range)
        : undefined;
    const hvState = getStateValue(this.hass, s.hv_state);
    const hv = s.hv_state ? hvHotspot(hvState) : undefined;
    const consumptionText =
      s.consumption && this.hass.states[s.consumption]
        ? formatState(this.hass, s.consumption)
        : undefined;
    const fuelConsumptionText =
      s.fuel_consumption && this.hass.states[s.fuel_consumption]
        ? formatState(this.hass, s.fuel_consumption)
        : undefined;

    const showHeadline = Boolean(
      odometerText || totalRangeText || speedText,
    );
    const tyreTone =
      s.tyres_ok || s.tyre_status
        ? getTyreTone(this.hass, s.tyres_ok, s.tyre_status)
        : undefined;
    const tyreLabel =
      tyreTone === "danger"
        ? "Tyre problem"
        : tyreTone === "warn"
          ? "Check tyres"
          : "Tyres OK";
    const tyreMoreInfo = s.tyres_ok ?? s.tyre_status;

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${img}>
              ${s.engine
                ? html`<div slot="engine">
                    ${renderHotspotButton({
                      icon: "engine",
                      label: engineOn ? "Turn engine off" : "Turn engine on",
                      tone: engineOn ? "ok" : "muted",
                      disabled: this._busy,
                      onClick: () =>
                        this._run(() =>
                          engineOn
                            ? turnOff(this.hass!, s.engine!)
                            : turnOn(this.hass!, s.engine!),
                        ),
                    })}
                  </div>`
                : nothing}
              ${s.lock
                ? html`<div slot="lock">
                    ${renderHotspotButton({
                      icon: locked ? "lock" : "unlock",
                      label: locked ? "Unlock doors" : "Lock doors",
                      tone: locked ? "muted" : "danger",
                      disabled: this._busy,
                      onClick: () =>
                        this._run(() =>
                          locked
                            ? unlockLock(this.hass!, s.lock!)
                            : lockLock(this.hass!, s.lock!),
                        ),
                    })}
                  </div>`
                : nothing}
              ${s.online
                ? html`<div slot="online">
                    ${renderHotspotButton({
                      icon: "signal",
                      label: online ? "Online" : "Offline",
                      tone: online ? "ok" : "muted",
                      onClick: () => fireMoreInfo(this, s.online!),
                    })}
                  </div>`
                : nothing}
              ${s.hv_state && hv
                ? html`<div slot="hv">
                    ${renderHotspotButton({
                      icon: "hv",
                      label: hv.label,
                      tone: hv.tone,
                      onClick: () => fireMoreInfo(this, s.hv_state!),
                    })}
                  </div>`
                : nothing}
              ${tyreTone && tyreMoreInfo
                ? html`<div slot="tyres">
                    ${renderHotspotButton({
                      icon: "tyre",
                      label: tyreLabel,
                      tone: tyreTone,
                      onClick: () => fireMoreInfo(this, tyreMoreInfo),
                    })}
                  </div>`
                : nothing}
              ${s.defog
                ? html`<div slot="defog">
                    ${renderHotspotButton({
                      icon: "defog",
                      label: defogOn ? "Turn defog off" : "Turn defog on",
                      tone: defogOn ? "warn" : "muted",
                      disabled: this._busy || defogReadOnly,
                      onClick: () =>
                        this._run(() => toggleSwitch(this.hass!, s.defog!)),
                    })}
                  </div>`
                : nothing}
              ${s.charge_stop
                ? html`<div slot="charge">
                    ${renderHotspotButton({
                      icon: "charge",
                      label: "Stop charge",
                      tone: "info",
                      disabled: this._busy,
                      onClick: () =>
                        this._run(() =>
                          pressButton(this.hass!, s.charge_stop!),
                        ),
                    })}
                  </div>`
                : nothing}
              ${s.trunk
                ? html`<div slot="trunk">
                    ${renderHotspotButton({
                      icon: "trunk",
                      label: trunkOpen ? "Close trunk" : "Open trunk",
                      tone: trunkOpen ? "warn" : "muted",
                      disabled: this._busy,
                      onClick: () =>
                        this._run(() =>
                          trunkOpen
                            ? closeCover(this.hass!, s.trunk!)
                            : openCover(this.hass!, s.trunk!),
                        ),
                    })}
                  </div>`
                : nothing}
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            ${showHeadline
              ? html`
                  <div class="headline">
                    ${odometerText
                      ? html`<button
                          type="button"
                          class="odo"
                          @click=${() => fireMoreInfo(this, s.odometer!)}
                        >
                          <span class="odo-label">Odometer</span>
                          <span class="odo-value">${odometerText}</span>
                        </button>`
                      : nothing}
                    ${totalRangeText
                      ? html`<button
                          type="button"
                          class="range-total"
                          @click=${() => fireMoreInfo(this, s.total_range!)}
                        >
                          <span class="range-label">Total range</span>
                          <span class="range-value">${totalRangeText}</span>
                        </button>`
                      : nothing}
                    ${speedText
                      ? html`<button
                          type="button"
                          class="speed"
                          @click=${() => fireMoreInfo(this, s.speed!)}
                        >
                          <span class="speed-label">Speed</span>
                          <span class="speed-value">${speedText}</span>
                        </button>`
                      : nothing}
                  </div>
                `
              : nothing}
            <div class="gauges">
              ${renderVerticalGauge({
                percent: batteryPct,
                primary:
                  batteryPct !== undefined || evRangeText ? "SOC" : undefined,
                secondary: evRangeText,
                meta: consumptionText,
                tone: "ok",
              })}
              ${renderVerticalGauge({
                percent: fuelPct,
                primary:
                  fuelPct !== undefined || fuelRangeText ? "Fuel" : undefined,
                secondary: fuelRangeText,
                meta: fuelConsumptionText,
                tone: "info",
              })}
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = [
    sharedHostStyles,
    hotspotStyles,
    verticalGaugeStyles,
    css`
      .body {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
      .hero {
        min-width: 0;
        width: 100%;
      }
      .vitals {
        display: flex;
        flex-direction: column;
        gap: 12px;
        min-width: 0;
      }
      .headline {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 12px 20px;
      }
      .odo,
      .range-total,
      .speed {
        border: none;
        background: transparent;
        color: inherit;
        padding: 0;
        cursor: pointer;
        font: inherit;
        text-align: left;
        min-width: 0;
      }
      .odo-label,
      .range-label,
      .speed-label {
        display: block;
        color: var(--ck-muted);
        font-size: 0.75rem;
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
      }
      .gauges {
        display: flex;
        flex-wrap: wrap;
        gap: 24px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-overview": CarlinkoOverview;
  }
}
