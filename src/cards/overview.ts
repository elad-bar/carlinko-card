import { LitElement, css, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  ensureCarlinkoTranslations,
  entityName,
  entityState,
  hvLabel,
  t,
} from "../core/i18n";
import { SlotMapCache, relevantEntityChanged } from "../core/card-update";
import { OVERVIEW_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  fireMoreInfo,
  formatState,
  getNumericState,
  getStateValue,
  imageEntityUrl,
  isOn,
  getTyreTone,
} from "../core/hass";
import {
  CarlinkoVehicleStage,
  horizontalLevelStyles,
  hotspotStyles,
  renderHorizontalLevel,
  renderHotspotButton,
  sharedHostStyles,
  type HotspotTone,
} from "../core/ui";

void CarlinkoVehicleStage;

/** ha-carlinko HV enum: off | lv | ready | unknown */
function hvHotspot(
  hass: HomeAssistant | undefined,
  state: string | undefined,
): {
  label: string;
  tone: HotspotTone;
} {
  const raw = (state || "unknown").toLowerCase();
  const label = hvLabel(hass, raw);
  switch (raw) {
    case "ready":
      return { label, tone: "ok" };
    case "lv":
      return { label, tone: "info" };
    case "off":
      return { label, tone: "muted" };
    default:
      return { label, tone: "warn" };
  }
}

export type OverviewConfig = CardConfigBase;

@customElement("carlinko-overview")
export class CarlinkoOverview extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: OverviewConfig;

  private readonly _slotCache = new SlotMapCache();

  public setConfig(config: OverviewConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._slotCache.invalidate();
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
      title: t(undefined, "stub.overview"),
    };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config")) {
      return true;
    }
    if (changed.has("hass")) {
      const oldHass = changed.get("hass") as HomeAssistant | undefined;
      if (!oldHass || !this.hass) {
        return true;
      }
      if (oldHass.entities !== this.hass.entities) {
        this._slotCache.invalidate();
        return true;
      }
      const slots = this._slotCache.peek();
      if (!slots) {
        return true;
      }
      return relevantEntityChanged(oldHass, this.hass, Object.values(slots));
    }
    return true;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) {
      void ensureCarlinkoTranslations(this.hass).then((loaded) => {
        if (loaded) {
          this.requestUpdate();
        }
      });
    }
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return this._slotCache.get(this.hass, this._config, OVERVIEW_SLOTS);
  }

  protected render() {
    if (!this._config) {
      return html`<ha-card
        ><div class="pad">${t(this.hass, "chrome.not_configured")}</div></ha-card
      >`;
    }
    if (!this._config.device_id?.trim()) {
      return html`<ha-card
        ><div class="pad">${t(this.hass, "chrome.select_device")}</div></ha-card
      >`;
    }
    if (!this.hass) {
      return html`<ha-card
        ><div class="pad">${t(undefined, "chrome.waiting_hass")}</div></ha-card
      >`;
    }

    const s = this._slots();
    const img = imageEntityUrl(this.hass, s.image);
    const engineOn = isOn(this.hass, s.engine);
    const online = isOn(this.hass, s.online);
    const batteryPct = getNumericState(this.hass, s.battery);
    const fuelPct = getNumericState(this.hass, s.fuel);

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
    const hv = s.hv_state ? hvHotspot(this.hass, hvState) : undefined;
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
        ? entityName(this.hass, "binary_sensor", "tyres_ok")
        : tyreTone === "warn"
          ? entityState(this.hass, "sensor", "tyre_status", "check_tyres")
          : t(this.hass, "status.tyres_ok");
    const tyreMoreInfo = s.tyres_ok ?? s.tyre_status;

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body">
          <div class="hero">
            <carlinko-vehicle-stage .src=${img}>
              ${showHeadline
                ? html`<div slot="headline" class="headline">
                    ${odometerText
                      ? html`<button
                          type="button"
                          class="odo"
                          @click=${() => fireMoreInfo(this, s.odometer!)}
                        >
                          <span class="odo-label"
                            >${entityName(
                              this.hass,
                              "sensor",
                              "odometer",
                            )}</span
                          >
                          <span class="odo-value">${odometerText}</span>
                        </button>`
                      : nothing}
                    ${totalRangeText
                      ? html`<button
                          type="button"
                          class="range-total"
                          @click=${() => fireMoreInfo(this, s.total_range!)}
                        >
                          <span class="range-label"
                            >${entityName(
                              this.hass,
                              "sensor",
                              "total_range",
                            )}</span
                          >
                          <span class="range-value">${totalRangeText}</span>
                        </button>`
                      : nothing}
                    ${speedText
                      ? html`<button
                          type="button"
                          class="speed"
                          @click=${() => fireMoreInfo(this, s.speed!)}
                        >
                          <span class="speed-label"
                            >${entityName(this.hass, "sensor", "speed")}</span
                          >
                          <span class="speed-value">${speedText}</span>
                        </button>`
                      : nothing}
                  </div>`
                : nothing}
              ${s.online
                ? html`<div slot="online">
                    ${renderHotspotButton({
                      icon: "signal",
                      label: online
                        ? entityName(this.hass, "binary_sensor", "online")
                        : t(this.hass, "status.offline"),
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
            </carlinko-vehicle-stage>
          </div>
          <div class="vitals">
            <div class="levels">
              ${renderHorizontalLevel({
                percent: batteryPct,
                primary:
                  batteryPct !== undefined || evRangeText
                    ? t(this.hass, "status.soc")
                    : undefined,
                secondary: evRangeText,
                meta: consumptionText,
                tone: "ok",
              })}
              ${renderHorizontalLevel({
                percent: fuelPct,
                primary:
                  fuelPct !== undefined || fuelRangeText
                    ? entityName(this.hass, "sensor", "fuel")
                    : undefined,
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
    horizontalLevelStyles,
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
      .levels {
        display: flex;
        flex-wrap: wrap;
        gap: 16px 24px;
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
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      .odo-value,
      .range-value,
      .speed-value {
        font-size: 1.35rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        line-height: 1.2;
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 0.55),
          0 0 8px rgba(0, 0, 0, 0.35),
          0 1px 2px rgba(255, 255, 255, 0.75),
          0 0 8px rgba(255, 255, 255, 0.45);
      }
      @container ck-card (max-width: 360px) {
        .body {
          gap: 12px;
          padding: 12px;
        }
        .vitals {
          gap: 8px;
        }
        .levels {
          gap: 12px 16px;
        }
        .headline {
          gap: 8px 12px;
        }
        .odo-value,
        .range-value,
        .speed-value {
          font-size: 1.15rem;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-overview": CarlinkoOverview;
  }
}
