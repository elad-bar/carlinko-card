import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { resolveAllSlots } from "../core/resolve";
import { TPMS_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  fireMoreInfo,
  formatState,
  imageEntityUrl,
  isOn,
} from "../core/hass";
import {
  chipStyles,
  renderStatusChip,
  sharedHostStyles,
} from "../core/ui";

export type TpmsConfig = CardConfigBase;

type WheelZone = {
  slot: string;
  pressure: string;
  temp: string;
};

const WHEEL_ZONES: WheelZone[] = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" },
];

const PRESSURE_SLOTS = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"] as const;

@customElement("carlinko-tpms")
export class CarlinkoTpms extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: TpmsConfig;

  public setConfig(config: TpmsConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 5;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-tpms-editor");
  }

  static getStubConfig(): TpmsConfig {
    return {
      device_id: "",
      title: "TPMS",
    };
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return resolveAllSlots(this.hass, this._config, TPMS_SLOTS);
  }

  private _hasDirectTpms(slots: Record<string, string | undefined>): boolean {
    if (!this.hass) {
      return false;
    }
    return PRESSURE_SLOTS.some((key) => {
      const id = slots[key];
      return Boolean(id && this.hass!.states[id]);
    });
  }

  private _sensorBtn(
    entityId: string | undefined,
    className: string,
  ): TemplateResult | typeof nothing {
    if (!this.hass || !entityId || !this.hass.states[entityId]) {
      return nothing;
    }
    const label = formatState(this.hass, entityId);
    return html`
      <button
        type="button"
        class=${className}
        @click=${() => fireMoreInfo(this, entityId)}
      >
        ${label}
      </button>
    `;
  }

  private _wheelZone(
    zone: WheelZone,
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const pressureId = slots[zone.pressure];
    const tempId = slots[zone.temp];
    const hasPressure = Boolean(
      pressureId && this.hass?.states[pressureId],
    );
    const hasTemp = Boolean(tempId && this.hass?.states[tempId]);
    if (!hasPressure && !hasTemp) {
      return nothing;
    }
    return html`
      <div slot=${zone.slot} class="wheel-zone">
        ${this._sensorBtn(pressureId, "wheel-pressure")}
        ${this._sensorBtn(tempId, "wheel-temp")}
      </div>
    `;
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
    const direct = this._hasDirectTpms(s);
    const topImg = imageEntityUrl(this.hass, s.image);
    const tyresOkId = s.tyres_ok;
    const tyresOkEntity =
      tyresOkId && this.hass.states[tyresOkId] ? tyresOkId : undefined;
    const statusId =
      s.tyre_status && this.hass.states[s.tyre_status]
        ? s.tyre_status
        : undefined;

    const hasAnyStatus = Boolean(tyresOkEntity || statusId || direct);
    if (!hasAnyStatus) {
      return html`<ha-card
        ><div class="pad">No TPMS entities for this vehicle</div></ha-card
      >`;
    }

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          <div class="chips">
            ${tyresOkEntity
              ? renderStatusChip(
                  isOn(this.hass, tyresOkEntity) ? "Tyres OK" : "Tyre problem",
                  { ok: isOn(this.hass, tyresOkEntity) },
                )
              : nothing}
            ${statusId
              ? html`
                  <button
                    type="button"
                    class="chip chip-btn"
                    @click=${() => fireMoreInfo(this, statusId)}
                  >
                    ${formatState(this.hass, statusId)}
                  </button>
                `
              : nothing}
          </div>
          ${direct
            ? html`
                <carlinko-car-outline .src=${topImg}>
                  ${WHEEL_ZONES.map((z) => this._wheelZone(z, s))}
                </carlinko-car-outline>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    sharedHostStyles,
    chipStyles,
    css`
      .chip-btn {
        font: inherit;
        cursor: pointer;
        color: inherit;
      }
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: flex-start;
      }
      .wheel-pressure,
      .wheel-temp {
        border: 1px solid var(--ck-border);
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        color: var(--ck-text);
        border-radius: 6px;
        padding: 4px 6px;
        font: inherit;
        font-size: 0.7rem;
        line-height: 1.2;
        cursor: pointer;
        white-space: nowrap;
        backdrop-filter: blur(2px);
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-pressure:hover,
      .wheel-temp:hover {
        border-color: var(--ck-accent);
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-tpms": CarlinkoTpms;
  }
}
