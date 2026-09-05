import {
  LitElement,
  css,
  html,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import {
  ensureCarlinkoTranslations,
  entityName,
  t,
} from "../core/i18n";
import { resolveAllSlots } from "../core/resolve";
import { CABIN_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  fireMoreInfo,
  formatState,
  closeCover,
  getClimateCurrentTemp,
  getClimateMaxTemp,
  getClimateMinTemp,
  getClimateTargetTemp,
  getClimateTempStep,
  getSelectOptions,
  getStateValue,
  getTyreTone,
  imageEntityUrl,
  isChargerConnected,
  isClimateOn,
  isCoverOpen,
  isOn,
  lockLock,
  openCover,
  pressButton,
  selectOption,
  setHvacMode,
  setTemperature,
  toggleSwitch,
  turnOff,
  turnOn,
  unlockLock,
} from "../core/hass";
import {
  actionStyles,
  metricStyles,
  renderActionButton,
  sharedHostStyles,
} from "../core/ui";

export type CabinConfig = CardConfigBase;

type SeatZone = {
  slot: string;
  heat?: string;
  vent?: string;
};

type WheelZone = {
  slot: string;
  pressure: string;
  temp: string;
};

const SEAT_ZONES: SeatZone[] = [
  { slot: "seat-fl", heat: "seat_heat_l", vent: "seat_vent_l" },
  { slot: "seat-fr", heat: "seat_heat_r", vent: "seat_vent_r" },
  { slot: "seat-rl", heat: "seat_heat_lr", vent: "seat_vent_lr" },
  { slot: "seat-rr", heat: "seat_heat_rr", vent: "seat_vent_rr" },
];

const WHEEL_ZONES: WheelZone[] = [
  { slot: "wheel-fl", pressure: "tyre_fl", temp: "tyre_fl_temp" },
  { slot: "wheel-fr", pressure: "tyre_fr", temp: "tyre_fr_temp" },
  { slot: "wheel-rl", pressure: "tyre_rl", temp: "tyre_rl_temp" },
  { slot: "wheel-rr", pressure: "tyre_rr", temp: "tyre_rr_temp" },
];

const PRESSURE_SLOTS = ["tyre_fl", "tyre_fr", "tyre_rl", "tyre_rr"] as const;

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

const ICON_FAN = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm4.5-5.5c-1.4 0-2.6.8-3.2 2A3.5 3.5 0 0 1 16 11.5c0 .2 0 .4-.05.6 1.3.5 2.3 1.7 2.3 3.1 0 1.9-1.6 3.4-3.5 3.4-.7 0-1.35-.2-1.9-.55A3.5 3.5 0 0 1 12 20.5a3.5 3.5 0 0 1-.85-6.85A3.5 3.5 0 0 1 8.25 18c-1.9 0-3.5-1.5-3.5-3.4 0-1.4 1-2.6 2.3-3.1A3.5 3.5 0 0 1 7 11.5c0-1.6 1.1-3 2.7-3.4A3.48 3.48 0 0 1 6.5 5.5C4.6 5.5 3 7 3 8.9c0 1.4 1 2.6 2.3 3.1A3.5 3.5 0 0 1 8 8.5c.7 0 1.35.2 1.9.55A3.5 3.5 0 0 1 12 3.5c.9 0 1.75.35 2.4.95A3.48 3.48 0 0 1 16.5 5.5c1.9 0 3.5 1.5 3.5 3.4 0 1.4-1 2.6-2.3 3.1.05-.2.05-.4.05-.6A3.5 3.5 0 0 1 16.5 5.5Z"
    />
  </svg>
`;

const ICON_WINDOW_OPEN = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h5V6H6Zm7 0v5h5V6h-5Zm0 7v5h5v-5h-5Z"
    />
  </svg>
`;

const ICON_WINDOW_CLOSE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v12h12V6H6Z"
    />
  </svg>
`;

const ICON_WINDOW_VENT = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 4h16v16H4V4Zm2 2v5h12V6H6Zm0 7v5h12v-5H6Z"
    />
  </svg>
`;

const ICON_SUNROOF_OPEN = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Zm3 2v4h8v-4H8Z"
    />
  </svg>
`;

const ICON_SUNROOF_CLOSE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 6h18v3H3V6Zm2 5h14v8H5v-8Z"
    />
  </svg>
`;

const ICON_SUNROOF_TILT = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M3 8h18v2H3V8Zm2 4 14 2v6H5v-8Zm2 3.3V18h10v-2.3l-10-1.4Z"
    />
  </svg>
`;

const ICON_LOCK = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
    />
  </svg>
`;

const ICON_UNLOCK = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
    />
  </svg>
`;

const ICON_DEFOG = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
    />
  </svg>
`;

const ICON_CHARGE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
    />
  </svg>
`;

const ICON_TRUNK = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
    />
  </svg>
`;

const ICON_ENGINE = html`
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
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

@customElement("carlinko-cabin")
export class CarlinkoCabin extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: CabinConfig;
  @state() private _busy = false;

  public setConfig(config: CabinConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 7;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-cabin-editor");
  }

  static getStubConfig(): CabinConfig {
    return {
      device_id: "",
      title: t(undefined, "stub.cabin"),
    };
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
    return resolveAllSlots(this.hass, this._config, CABIN_SLOTS);
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
      (err) => console.error("carlinko-cabin action failed", err),
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

  private _hasDirectTpms(slots: Record<string, string | undefined>): boolean {
    if (!this.hass) {
      return false;
    }
    return PRESSURE_SLOTS.some((key) => {
      const id = slots[key];
      return Boolean(id && this.hass!.states[id]);
    });
  }

  private _hasSeats(slots: Record<string, string | undefined>): boolean {
    if (!this.hass) {
      return false;
    }
    return SEAT_ZONES.some((z) => {
      const heat = z.heat ? slots[z.heat] : undefined;
      const vent = z.vent ? slots[z.vent] : undefined;
      return (
        (heat && this.hass!.states[heat]) || (vent && this.hass!.states[vent])
      );
    });
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
    const role = kind === "H" ? "heat" : "vent";
    const roleLabel =
      kind === "H" ? t(this.hass, "status.heat") : t(this.hass, "status.vent");
    const stateLabel = shortSeatLabel(state);
    const onClick =
      domain === "select"
        ? () => this._cycleSelect(entityId)
        : () => this._toggleBinary(entityId);
    return html`
      <button
        type="button"
        class="seat-btn ${role}"
        ?disabled=${this._busy}
        title=${`${roleLabel}: ${state ?? "—"}`}
        aria-label=${`${roleLabel}: ${state ?? "—"}`}
        @click=${onClick}
      >
        ${kind === "H" ? ICON_FIRE : ICON_FAN}
        <span class="seat-state">${stateLabel}</span>
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
    const tone = getTyreTone(this.hass, slots.tyres_ok, slots.tyre_status);
    return html`
      <div slot=${zone.slot} class="wheel-zone tone-${tone}">
        ${this._sensorBtn(pressureId, "wheel-pressure")}
        ${this._sensorBtn(tempId, "wheel-temp")}
      </div>
    `;
  }

  private _entityExists(entityId: string | undefined): boolean {
    return Boolean(entityId && this.hass?.states[entityId]);
  }

  private _hasWindowsControls(
    slots: Record<string, string | undefined>,
  ): boolean {
    return (
      this._entityExists(slots.windows) ||
      this._entityExists(slots.windows_vent) ||
      this._entityExists(slots.sunroof) ||
      this._entityExists(slots.sunroof_tilt)
    );
  }

  private _chargerConnected(
    slots: Record<string, string | undefined>,
  ): boolean {
    return isChargerConnected(this.hass, slots.charge_mode);
  }

  private _hasBodyControls(
    slots: Record<string, string | undefined>,
  ): boolean {
    return (
      this._entityExists(slots.lock) ||
      this._entityExists(slots.engine) ||
      this._entityExists(slots.defog) ||
      (this._entityExists(slots.charge_stop) &&
        this._chargerConnected(slots)) ||
      this._entityExists(slots.trunk)
    );
  }

  private _bodyActions(
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const lockId = slots.lock;
    const engineId = slots.engine;
    const defogId = slots.defog;
    const chargeId = slots.charge_stop;
    const trunkId = slots.trunk;
    const chargerConnected = this._chargerConnected(slots);
    const showCharge =
      this._entityExists(chargeId) && chargerConnected;
    if (
      !lockId &&
      !engineId &&
      !defogId &&
      !showCharge &&
      !trunkId
    ) {
      return nothing;
    }

    const lockState = getStateValue(this.hass, lockId);
    const locked = lockState === "locked";
    const engineOn = isOn(this.hass, engineId);
    const defogOn = isOn(this.hass, defogId);
    const defogReadOnly = Boolean(defogId?.startsWith("binary_sensor."));
    const trunkOpen = getStateValue(this.hass, trunkId) === "open";

    return html`
      ${this._entityExists(engineId)
        ? html`<div slot="engine" class="map-actions">
            ${renderActionButton({
              label: engineOn
                ? t(this.hass, "action.engine_off")
                : t(this.hass, "action.engine_on"),
              icon: ICON_ENGINE,
              disabled: this._busy,
              variant: engineOn ? "ok" : "",
              onClick: () =>
                this._run(() =>
                  engineOn
                    ? turnOff(this.hass!, engineId!)
                    : turnOn(this.hass!, engineId!),
                ),
            })}
          </div>`
        : nothing}
      ${this._entityExists(lockId)
        ? html`<div slot="lock" class="map-actions">
            ${renderActionButton({
              label: locked
                ? t(this.hass, "action.unlock_doors")
                : t(this.hass, "action.lock_doors"),
              icon: locked ? ICON_LOCK : ICON_UNLOCK,
              disabled: this._busy,
              variant: locked ? "" : "danger",
              onClick: () =>
                this._run(() =>
                  locked
                    ? unlockLock(this.hass!, lockId!)
                    : lockLock(this.hass!, lockId!),
                ),
            })}
          </div>`
        : nothing}
      ${this._entityExists(defogId)
        ? html`<div slot="defog" class="map-actions">
            ${renderActionButton({
              label: defogOn
                ? t(this.hass, "action.defog_off")
                : t(this.hass, "action.defog_on"),
              icon: ICON_DEFOG,
              disabled: this._busy || defogReadOnly,
              variant: defogOn ? "ok" : "",
              onClick: () =>
                this._run(() => toggleSwitch(this.hass!, defogId!)),
            })}
          </div>`
        : nothing}
      ${showCharge
        ? html`<div slot="charge" class="map-actions">
            ${renderActionButton({
              label: entityName(this.hass, "button", "charge_stop"),
              icon: ICON_CHARGE,
              disabled: this._busy,
              variant: "danger",
              onClick: () =>
                this._run(() => pressButton(this.hass!, chargeId!)),
            })}
          </div>`
        : nothing}
      ${this._entityExists(trunkId)
        ? html`<div slot="trunk" class="map-actions">
            ${renderActionButton({
              label: trunkOpen
                ? t(this.hass, "action.close_trunk")
                : t(this.hass, "action.open_trunk"),
              icon: ICON_TRUNK,
              disabled: this._busy,
              variant: trunkOpen ? "ok" : "",
              onClick: () =>
                this._run(() =>
                  trunkOpen
                    ? closeCover(this.hass!, trunkId!)
                    : openCover(this.hass!, trunkId!),
                ),
            })}
          </div>`
        : nothing}
    `;
  }

  private _windowsCluster(
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const coverId = slots.windows;
    const ventId = slots.windows_vent;
    const hasCover = this._entityExists(coverId);
    const hasVent = this._entityExists(ventId);
    if (!hasCover && !hasVent) {
      return nothing;
    }
    const windowsOpen = hasCover && isCoverOpen(this.hass, coverId);
    return html`
      <div slot="windows" class="map-actions">
        ${hasCover
          ? windowsOpen
            ? renderActionButton({
                label: t(this.hass, "action.close_windows"),
                icon: ICON_WINDOW_CLOSE,
                disabled: this._busy,
                onClick: () =>
                  this._run(() => closeCover(this.hass!, coverId!)),
              })
            : renderActionButton({
                label: t(this.hass, "action.open_windows"),
                icon: ICON_WINDOW_OPEN,
                disabled: this._busy,
                onClick: () =>
                  this._run(() => openCover(this.hass!, coverId!)),
              })
          : nothing}
        ${hasVent
          ? renderActionButton({
              label: t(this.hass, "action.vent_windows"),
              icon: ICON_WINDOW_VENT,
              disabled: this._busy,
              onClick: () =>
                this._run(() => pressButton(this.hass!, ventId!)),
            })
          : nothing}
      </div>
    `;
  }

  private _sunroofCluster(
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const coverId = slots.sunroof;
    const tiltId = slots.sunroof_tilt;
    const hasCover = this._entityExists(coverId);
    const hasTilt = this._entityExists(tiltId);
    if (!hasCover && !hasTilt) {
      return nothing;
    }
    const sunroofOpen = hasCover && isCoverOpen(this.hass, coverId);
    return html`
      <div slot="sunroof" class="map-actions">
        ${hasCover
          ? sunroofOpen
            ? renderActionButton({
                label: t(this.hass, "action.close_sunroof"),
                icon: ICON_SUNROOF_CLOSE,
                disabled: this._busy,
                onClick: () =>
                  this._run(() => closeCover(this.hass!, coverId!)),
              })
            : renderActionButton({
                label: t(this.hass, "action.open_sunroof"),
                icon: ICON_SUNROOF_OPEN,
                disabled: this._busy,
                onClick: () =>
                  this._run(() => openCover(this.hass!, coverId!)),
              })
          : nothing}
        ${hasTilt
          ? renderActionButton({
              label: t(this.hass, "action.tilt_sunroof"),
              icon: ICON_SUNROOF_TILT,
              disabled: this._busy,
              onClick: () =>
                this._run(() => pressButton(this.hass!, tiltId!)),
            })
          : nothing}
      </div>
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

    const hasSeats = this._hasSeats(s);
    const directTpms = this._hasDirectTpms(s);
    const hasWindows = this._hasWindowsControls(s);
    const hasBody = this._hasBodyControls(s);
    const topImg = imageEntityUrl(this.hass, s.image);
    const showMap = hasSeats || directTpms || hasWindows || hasBody;

    const hasClimateControls = Boolean(
      climateEntity ||
        (s.quick_cool && this.hass.states[s.quick_cool]) ||
        (s.quick_heat && this.hass.states[s.quick_heat]),
    );

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          ${hasClimateControls
            ? html`
                <div class="controls-row">
                  <div class="controls-left">
                    ${climateEntity
                      ? html`
                          ${renderActionButton({
                            label: climateOn
                              ? t(this.hass, "climate.off")
                              : t(this.hass, "climate.on"),
                            icon: ICON_POWER,
                            disabled: this._busy,
                            variant: climateOn ? "ok" : "",
                            onClick: () => this._toggleClimate(),
                          })}
                          ${renderActionButton({
                            label: t(this.hass, "climate.increase_temp"),
                            icon: ICON_PLUS,
                            disabled: this._busy || target === undefined,
                            onClick: () => this._nudgeTemp(1),
                          })}
                          <span
                            class="setpoint-value"
                            title=${t(this.hass, "climate.setpoint")}
                            >${target !== undefined
                              ? `${target}${unit}`
                              : "—"}</span
                          >
                          ${renderActionButton({
                            label: t(this.hass, "climate.decrease_temp"),
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
                          label: entityName(this.hass, "button", "quick_cool"),
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
                          label: entityName(this.hass, "button", "quick_heat"),
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
                  <span class="metric-label"
                    >${t(this.hass, "climate.current")}</span
                  >
                  <span class="metric-value">${current}${unit}</span>
                </div>
              `
            : nothing}
          ${showMap
            ? html`
                <carlinko-car-outline .src=${topImg}>
                  ${this._bodyActions(s)} ${this._windowsCluster(s)}
                  ${this._sunroofCluster(s)}
                  ${SEAT_ZONES.map((z) => this._seatZone(z, s))}
                  ${directTpms
                    ? WHEEL_ZONES.map((z) => this._wheelZone(z, s))
                    : nothing}
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
      .seat-zone,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        gap: 2px;
        align-items: flex-start;
      }
      .seat-btn,
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
      .seat-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 5px 8px;
        font-size: 0.8rem;
      }
      .seat-btn svg {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-btn.heat {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .seat-btn .seat-state {
        color: var(--ck-text);
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
      }
      .wheel-zone.tone-ok .wheel-pressure,
      .wheel-zone.tone-ok .wheel-temp {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-ok .wheel-pressure {
        color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure,
      .wheel-zone.tone-warn .wheel-temp {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-warn .wheel-pressure {
        color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure,
      .wheel-zone.tone-danger .wheel-temp {
        border-color: var(--ck-tyre-danger);
      }
      .wheel-zone.tone-danger .wheel-pressure {
        color: var(--ck-tyre-danger);
      }
      .seat-btn.heat:hover:not(:disabled) {
        border-color: var(--ck-seat-heat);
        color: var(--ck-seat-heat);
      }
      .seat-btn.vent:hover:not(:disabled) {
        border-color: var(--ck-seat-vent);
        color: var(--ck-seat-vent);
      }
      .wheel-zone.tone-ok .wheel-pressure:hover,
      .wheel-zone.tone-ok .wheel-temp:hover {
        border-color: var(--ck-tyre-ok);
      }
      .wheel-zone.tone-warn .wheel-pressure:hover,
      .wheel-zone.tone-warn .wheel-temp:hover {
        border-color: var(--ck-tyre-warn);
      }
      .wheel-zone.tone-danger .wheel-pressure:hover,
      .wheel-zone.tone-danger .wheel-temp:hover {
        border-color: var(--ck-tyre-danger);
      }
      .seat-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .map-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }
      .map-actions .action.icon {
        width: 2.35rem;
        height: 2.35rem;
        min-width: 2.35rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
      }
      .map-actions .action.icon svg {
        width: 1.35rem;
        height: 1.35rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
      }
      @container ck-card (max-width: 360px) {
        .seat-btn {
          padding: 4px 6px;
          font-size: 0.7rem;
          gap: 2px;
        }
        .seat-btn svg {
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-pressure,
        .wheel-temp {
          padding: 3px 5px;
          font-size: 0.65rem;
        }
        .map-actions .action.icon {
          width: 2.1rem;
          height: 2.1rem;
          min-width: 2.1rem;
        }
        .map-actions .action.icon svg {
          width: 1.15rem;
          height: 1.15rem;
        }
        carlinko-car-outline {
          max-width: 100%;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-cabin": CarlinkoCabin;
  }
}
