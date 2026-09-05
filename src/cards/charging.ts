import { LitElement, html, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import {
  ensureCarlinkoTranslations,
  entityName,
  t,
} from "../core/i18n";
import { SlotMapCache, relevantEntityChanged } from "../core/card-update";
import { CHARGING_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  fireMoreInfo,
  formatMinutesRemaining,
  formatState,
  getNumericState,
  isChargerConnected,
  isOn,
  pressButton,
} from "../core/hass";
import {
  actionStyles,
  chargeBatteryStyles,
  chargingHeroStyles,
  metricStyles,
  renderActionButton,
  renderChargeBattery,
  renderMetricRow,
  renderSocRing,
  sharedHostStyles,
  socRingStyles,
} from "../core/ui";

export type ChargingConfig = CardConfigBase;

const ICON_STOP = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="6" width="12" height="12" rx="1" fill="currentColor" />
  </svg>
`;

@customElement("carlinko-charging")
export class CarlinkoCharging extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ChargingConfig;
  @state() private _busy = false;

  private readonly _slotCache = new SlotMapCache();

  public setConfig(config: ChargingConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._slotCache.invalidate();
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
      title: t(undefined, "stub.charging"),
    };
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config") || changed.has("_busy")) {
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
    return this._slotCache.get(this.hass, this._config, CHARGING_SLOTS);
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

  private _metaRow(
    label: string,
    value: string,
    entityId: string | undefined,
    valueClass?: string,
  ) {
    if (!entityId || !this.hass?.states[entityId]) {
      return nothing;
    }
    return html`
      <button
        type="button"
        class="charge-meta-row"
        @click=${() => fireMoreInfo(this, entityId)}
      >
        <span class="charge-meta-label">${label}:</span>
        <span class="charge-meta-value${valueClass ? ` ${valueClass}` : ""}"
          >${value}</span
        >
      </button>
    `;
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
    const charging = isOn(this.hass, s.charging);
    const batteryPct = getNumericState(this.hass, s.battery);
    const hasBattery = Boolean(s.battery && this.hass.states[s.battery]);
    const hasCharging = Boolean(s.charging && this.hass.states[s.charging]);
    const hasPower = Boolean(s.charge_power && this.hass.states[s.charge_power]);
    const hasRemaining = Boolean(
      s.charge_remaining && this.hass.states[s.charge_remaining],
    );
    const hasSecondary =
      (s.charge_state && this.hass.states[s.charge_state]) ||
      (s.charge_mode && this.hass.states[s.charge_mode]);
    const showStop =
      Boolean(s.charge_stop && this.hass.states[s.charge_stop]) &&
      isChargerConnected(this.hass, s.charge_mode);

    const showHero =
      hasBattery || hasCharging || hasPower || hasRemaining;

    const pluggedValue = charging
      ? entityName(this.hass, "binary_sensor", "charging")
      : t(this.hass, "status.not_charging");
    const pluggedClass = charging ? "ok" : "muted";
    const powerText = formatState(this.hass, s.charge_power);
    const timeText = formatMinutesRemaining(this.hass, s.charge_remaining);
    const batteryLabel = entityName(this.hass, "sensor", "battery");
    const socLabel = t(this.hass, "status.soc");

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          ${showHero
            ? html`
                <div class="charge-hero">
                  ${hasBattery
                    ? renderSocRing({
                        percent: batteryPct,
                        socLabel,
                        onClick: () => fireMoreInfo(this, s.battery!),
                      })
                    : nothing}
                  ${hasBattery
                    ? html`<div class="charge-hero-link" aria-hidden="true"></div>
                        ${renderChargeBattery({
                          percent: batteryPct,
                          charging,
                          batteryLabel,
                          chargingLabel: entityName(
                            this.hass,
                            "binary_sensor",
                            "charging",
                          ),
                        })}`
                    : nothing}
                  <div class="charge-hero-meta">
                    ${hasCharging
                      ? this._metaRow(
                          t(this.hass, "status.plugged"),
                          pluggedValue,
                          s.charging,
                          pluggedClass,
                        )
                      : nothing}
                    ${hasPower
                      ? this._metaRow(
                          t(this.hass, "status.power"),
                          powerText,
                          s.charge_power,
                        )
                      : nothing}
                    ${hasRemaining
                      ? this._metaRow(
                          t(this.hass, "status.time"),
                          timeText,
                          s.charge_remaining,
                        )
                      : nothing}
                  </div>
                </div>
              `
            : nothing}
          ${hasSecondary
            ? html`
                <div class="charge-secondary">
                  ${renderMetricRow(
                    this,
                    this.hass,
                    entityName(this.hass, "sensor", "charge_state"),
                    s.charge_state,
                  )}
                  ${renderMetricRow(
                    this,
                    this.hass,
                    t(this.hass, "status.mode"),
                    s.charge_mode,
                  )}
                </div>
              `
            : nothing}
        </div>
        ${showStop
          ? html`
              <div class="actions">
                ${renderActionButton({
                  label: entityName(this.hass, "button", "charge_stop"),
                  icon: ICON_STOP,
                  showLabel: true,
                  disabled: this._busy,
                  variant: "danger",
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
    actionStyles,
    socRingStyles,
    chargeBatteryStyles,
    chargingHeroStyles,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-charging": CarlinkoCharging;
  }
}
