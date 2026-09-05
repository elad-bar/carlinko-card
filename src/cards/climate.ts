import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import { resolveAllSlots } from "../core/resolve";
import { CLIMATE_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  getClimateCurrentTemp,
  getClimateMaxTemp,
  getClimateMinTemp,
  getClimateTargetTemp,
  getClimateTempStep,
  getSelectOptions,
  getStateValue,
  imageEntityUrl,
  isClimateOn,
  pressButton,
  selectOption,
  setHvacMode,
  setTemperature,
  turnOff,
  turnOn,
} from "../core/hass";
import {
  actionStyles,
  chipStyles,
  metricStyles,
  renderActionButton,
  sharedHostStyles,
} from "../core/ui";

export type ClimateConfig = CardConfigBase;

type SeatZone = {
  slot: string;
  heat?: string;
  vent?: string;
};

const SEAT_ZONES: SeatZone[] = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" },
];

const ICON_POWER = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M13 3h-2v10h2V3Zm4.83 2.17-1.42 1.42A6.92 6.92 0 0 1 19 12a7 7 0 1 1-14 0c0-2.12.95-4.03 2.47-5.32L6.05 5.17A8.96 8.96 0 0 0 3 12a9 9 0 1 0 18 0c0-2.74-1.22-5.2-3.17-6.83Z"
    />
  </svg>
`;

const ICON_PLUS = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5Z" />
  </svg>
`;

const ICON_MINUS = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M5 11h14v2H5v-2Z" />
  </svg>
`;

const ICON_SNOWFLAKE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2v3.5l1.5-1.5 1 1L12 8l-2.5-2.5 1-1L12 5.5V2Zm0 20v-3.5l-1.5 1.5-1-1L12 16l2.5 2.5-1 1L12 18.5V22Zm10-10h-3.5l1.5 1.5-1 1L16 12l2.5-2.5 1 1L18.5 12H22ZM2 12h3.5L4 10.5l1-1L8 12l-2.5 2.5-1-1L5.5 12H2Zm14.95-6.36-1.41 1.41.71.71L14.83 9.5l-1.41-1.41.71-.71 1.41 1.41ZM9.17 14.5l1.41 1.41-.71.71-1.41-1.41.71-.71ZM9.17 9.5l.71.71-1.41 1.41-.71-.71L9.17 9.5Zm5.66 5.66.71.71-1.41 1.41-.71-.71 1.41-1.41Z"
    />
  </svg>
`;

const ICON_FIRE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M17.66 11.2c.03 1.6-1.02 2.96-2.28 4.05C15.31 16.1 14 17.45 13.15 19c-.55.9-.98 1.93-.85 3h.85c.22-1.19.78-2.2 1.4-3.08.68-.96 1.43-1.86 2.07-2.85.89-1.38 1.53-2.9 1.34-4.52-.11-.94-.5-1.86-1.1-2.62.55.9.9 1.97.8 3.07ZM12 2S9 7 9 11c0 2.4 1.34 4.37 3 5.6 1.66-1.23 3-3.2 3-5.6 0-4-3-9-3-9Zm0 12.5c-.83-.9-1.5-2.1-1.5-3.5 0-1.8.9-4.1 1.5-5.7.6 1.6 1.5 3.9 1.5 5.7 0 1.4-.67 2.6-1.5 3.5Z"
    />
  </svg>
`;

function domainOf(entityId: string): string {
  return entityId.split(".", 1)[0];
}

function shortSeatLabel(state: string | undefined): string {
  if (!state || state === "unknown" || state === "unavailable") {
    return "—";
  }
  if (state === "off" || state === "on") {
    return state;
  }
  return state.replace(/^level_?/i, "l").slice(0, 4);
}

@customElement("carlinko-climate")
export class CarlinkoClimate extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ClimateConfig;
  @state() private _busy = false;

  public setConfig(config: ClimateConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 6;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-climate-editor");
  }

  static getStubConfig(): ClimateConfig {
    return {
      device_id: "",
      title: "Climate",
    };
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return resolveAllSlots(this.hass, this._config, CLIMATE_SLOTS);
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
      (err) => console.error("carlinko-climate action failed", err),
    );
  }

  private _nudgeTemp(delta: number): void {
    const climateId = this._slots().climate;
    if (!this.hass || !climateId) {
      return;
    }
    const current = getClimateTargetTemp(this.hass, climateId);
    if (current === undefined) {
      return;
    }
    const step = getClimateTempStep(this.hass, climateId);
    const min = getClimateMinTemp(this.hass, climateId);
    const max = getClimateMaxTemp(this.hass, climateId);
    const next = Math.min(max, Math.max(min, current + delta * step));
    this._run(() => setTemperature(this.hass!, climateId, next));
  }

  private _toggleClimate(): void {
    const climateId = this._slots().climate;
    if (!this.hass || !climateId) {
      return;
    }
    const on = isClimateOn(this.hass, climateId);
    this._run(() =>
      setHvacMode(this.hass!, climateId, on ? "off" : "cool"),
    );
  }

  private _cycleSelect(entityId: string): void {
    if (!this.hass) {
      return;
    }
    const options = getSelectOptions(this.hass, entityId);
    if (options.length === 0) {
      return;
    }
    const current = getStateValue(this.hass, entityId) ?? options[0];
    const idx = options.indexOf(current);
    const next = options[(idx + 1) % options.length];
    this._run(() => selectOption(this.hass!, entityId, next));
  }

  private _toggleBinary(entityId: string): void {
    if (!this.hass) {
      return;
    }
    const on = getStateValue(this.hass, entityId) === "on";
    this._run(() =>
      on ? turnOff(this.hass!, entityId) : turnOn(this.hass!, entityId),
    );
  }

  private _seatControl(
    entityId: string | undefined,
    kind: "H" | "V",
  ): TemplateResult | typeof nothing {
    if (!entityId || !this.hass?.states[entityId]) {
      return nothing;
    }
    const state = getStateValue(this.hass, entityId);
    const domain = domainOf(entityId);
    const label = `${kind}:${shortSeatLabel(state)}`;
    const onClick =
      domain === "select"
        ? () => this._cycleSelect(entityId)
        : () => this._toggleBinary(entityId);
    return html`
      <button
        type="button"
        class="seat-btn"
        ?disabled=${this._busy}
        title=${state ?? ""}
        @click=${onClick}
      >
        ${label}
      </button>
    `;
  }

  private _seatZone(
    zone: SeatZone,
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const heat = zone.heat ? slots[zone.heat] : undefined;
    const vent = zone.vent ? slots[zone.vent] : undefined;
    if (
      (!heat || !this.hass?.states[heat]) &&
      (!vent || !this.hass?.states[vent])
    ) {
      return nothing;
    }
    return html`
      <div slot=${zone.slot} class="seat-zone">
        ${this._seatControl(heat, "H")} ${this._seatControl(vent, "V")}
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
    const climateId = s.climate;
    const climateEntity = climateId ? this.hass.states[climateId] : undefined;
    const climateOn = isClimateOn(this.hass, climateId);
    const target = getClimateTargetTemp(this.hass, climateId);
    const current = getClimateCurrentTemp(this.hass, climateId);
    const unit =
      (typeof climateEntity?.attributes.temperature_unit === "string"
        ? climateEntity.attributes.temperature_unit
        : undefined) ||
      (typeof climateEntity?.attributes.unit_of_measurement === "string"
        ? climateEntity.attributes.unit_of_measurement
        : "°C");

    const hasSeats = SEAT_ZONES.some((z) => {
      const heat = z.heat ? s[z.heat] : undefined;
      const vent = z.vent ? s[z.vent] : undefined;
      return (
        (heat && this.hass!.states[heat]) || (vent && this.hass!.states[vent])
      );
    });
    const topImg = imageEntityUrl(this.hass, s.image);

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          ${climateEntity || s.quick_cool || s.quick_heat
            ? html`
                <div class="controls-row">
                  <div class="controls-left">
                    ${climateEntity
                      ? html`
                          ${renderActionButton({
                            label: climateOn ? "Climate off" : "Climate on",
                            icon: ICON_POWER,
                            disabled: this._busy,
                            variant: climateOn ? "ok" : "",
                            onClick: () => this._toggleClimate(),
                          })}
                          ${renderActionButton({
                            label: "Increase temperature",
                            icon: ICON_PLUS,
                            disabled: this._busy || target === undefined,
                            onClick: () => this._nudgeTemp(1),
                          })}
                          <span class="setpoint-value" title="Setpoint"
                            >${target !== undefined
                              ? `${target}${unit}`
                              : "—"}</span
                          >
                          ${renderActionButton({
                            label: "Decrease temperature",
                            icon: ICON_MINUS,
                            disabled: this._busy || target === undefined,
                            onClick: () => this._nudgeTemp(-1),
                          })}
                        `
                      : nothing}
                  </div>
                  <div class="controls-right">
                    ${s.quick_cool && this.hass.states[s.quick_cool]
                      ? renderActionButton({
                          label: "Quick cool",
                          icon: ICON_SNOWFLAKE,
                          disabled: this._busy,
                          onClick: () =>
                            this._run(() =>
                              pressButton(this.hass!, s.quick_cool!),
                            ),
                        })
                      : nothing}
                    ${s.quick_heat && this.hass.states[s.quick_heat]
                      ? renderActionButton({
                          label: "Quick heat",
                          icon: ICON_FIRE,
                          disabled: this._busy,
                          onClick: () =>
                            this._run(() =>
                              pressButton(this.hass!, s.quick_heat!),
                            ),
                        })
                      : nothing}
                  </div>
                </div>
              `
            : nothing}
          ${climateEntity && current !== undefined
            ? html`
                <div class="current-row">
                  <span class="metric-label">Current</span>
                  <span class="metric-value">${current}${unit}</span>
                </div>
              `
            : nothing}
          ${hasSeats
            ? html`
                <carlinko-car-outline .src=${topImg}>
                  ${SEAT_ZONES.map((z) => this._seatZone(z, s))}
                </carlinko-car-outline>
              `
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
    css`
      .controls-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .controls-left,
      .controls-right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .setpoint-value {
        font-weight: 600;
        font-size: 1.15rem;
        min-width: 3.25rem;
        text-align: center;
        font-variant-numeric: tabular-nums;
      }
      .current-row {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 0;
      }
      .seat-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .seat-btn {
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
      .seat-btn:hover:not(:disabled) {
        border-color: var(--ck-accent);
      }
      .seat-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      carlinko-car-outline {
        margin-top: 12px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-climate": CarlinkoClimate;
  }
}
