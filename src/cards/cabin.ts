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
  entityState,
  t,
} from "../core/i18n";
import { SlotMapCache, relevantEntityChanged } from "../core/card-update";
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
  renderMdiIcon,
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

function domainOf(entityId: string): string {
  return entityId.split(".", 1)[0];
}

type SeatKind = "heat" | "vent";

function isSeatOffState(state: string | undefined): boolean {
  if (!state) {
    return true;
  }
  const n = state.toLowerCase();
  return n === "off" || n === "unavailable";
}

function isSeatUnknownState(state: string | undefined): boolean {
  return state?.toLowerCase() === "unknown";
}

function isSeatActiveState(state: string | undefined): boolean {
  return Boolean(state) && !isSeatOffState(state) && !isSeatUnknownState(state);
}

@customElement("carlinko-cabin")
export class CarlinkoCabin extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: CabinConfig;
  @state() private _busy = false;
  @state() private _openSeatMenu: { slot: string; kind: SeatKind } | null =
    null;

  private readonly _slotCache = new SlotMapCache();

  private readonly _onDocPointerDown = (ev: PointerEvent): void => {
    if (!this._openSeatMenu) {
      return;
    }
    const path = ev.composedPath();
    const keep = path.some(
      (n) =>
        n instanceof HTMLElement &&
        (n.classList.contains("seat-icon") ||
          n.classList.contains("seat-menu")),
    );
    if (!keep) {
      this._closeSeatMenu();
    }
  };

  private readonly _onDocKeyDown = (ev: KeyboardEvent): void => {
    if (ev.key === "Escape" && this._openSeatMenu) {
      this._closeSeatMenu();
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("pointerdown", this._onDocPointerDown, true);
    document.addEventListener("keydown", this._onDocKeyDown);
  }

  public disconnectedCallback(): void {
    document.removeEventListener("pointerdown", this._onDocPointerDown, true);
    document.removeEventListener("keydown", this._onDocKeyDown);
    super.disconnectedCallback();
  }

  public setConfig(config: CabinConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._slotCache.invalidate();
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

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (
      changed.has("_config") ||
      changed.has("_busy") ||
      changed.has("_openSeatMenu")
    ) {
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
    return this._slotCache.get(this.hass, this._config, CABIN_SLOTS);
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

  private _closeSeatMenu(): void {
    if (this._openSeatMenu) {
      this._openSeatMenu = null;
    }
  }

  private _toggleSeatMenu(slot: string, kind: SeatKind): void {
    const cur = this._openSeatMenu;
    if (cur && cur.slot === slot && cur.kind === kind) {
      this._openSeatMenu = null;
      return;
    }
    this._openSeatMenu = { slot, kind };
  }

  private _offSelectOption(entityId: string): string | undefined {
    return getSelectOptions(this.hass, entityId).find(
      (opt) => opt.toLowerCase() === "off",
    );
  }

  private async _turnSeatOff(entityId: string): Promise<void> {
    if (!this.hass?.states[entityId]) {
      return;
    }
    const state = getStateValue(this.hass, entityId);
    if (!isSeatActiveState(state)) {
      return;
    }
    if (domainOf(entityId) === "select") {
      const off = this._offSelectOption(entityId);
      if (!off) {
        return;
      }
      await selectOption(this.hass, entityId, off);
      return;
    }
    await turnOff(this.hass, entityId);
  }

  private _setSeatLevel(
    entityId: string,
    option: string,
    siblingId: string | undefined,
  ): void {
    if (!this.hass) {
      return;
    }
    this._run(async () => {
      if (option.toLowerCase() !== "off" && siblingId) {
        await this._turnSeatOff(siblingId);
      }
      await selectOption(this.hass!, entityId, option);
    });
  }

  private _toggleSeatBinary(
    entityId: string,
    siblingId: string | undefined,
  ): void {
    if (!this.hass) {
      return;
    }
    const on = getStateValue(this.hass, entityId) === "on";
    this._run(async () => {
      if (!on && siblingId) {
        await this._turnSeatOff(siblingId);
      }
      if (on) {
        await turnOff(this.hass!, entityId);
      } else {
        await turnOn(this.hass!, entityId);
      }
    });
  }

  private _seatStateLabel(
    entityId: string,
    entityKey: string,
    state: string | undefined,
  ): string {
    if (domainOf(entityId) === "select") {
      return entityState(this.hass, "select", entityKey, state);
    }
    if (state === "on") {
      return "On";
    }
    return entityState(this.hass, "select", entityKey, "off");
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

  private _seatIcon(
    zone: SeatZone,
    kind: SeatKind,
    entityId: string,
    entityKey: string,
    siblingId: string | undefined,
    active: boolean,
  ): TemplateResult {
    const state = getStateValue(this.hass, entityId);
    const domain = domainOf(entityId);
    const roleLabel =
      kind === "heat"
        ? t(this.hass, "status.heat")
        : t(this.hass, "status.vent");
    const stateLabel = this._seatStateLabel(entityId, entityKey, state);
    const open =
      this._openSeatMenu?.slot === zone.slot &&
      this._openSeatMenu.kind === kind;
    const isSelect = domain === "select";
    const onClick = isSelect
      ? (ev: Event) => {
          ev.stopPropagation();
          this._toggleSeatMenu(zone.slot, kind);
        }
      : () => this._toggleSeatBinary(entityId, siblingId);
    const menuUp = zone.slot === "seat-rl" || zone.slot === "seat-rr";
    const menuEnd = zone.slot === "seat-fr" || zone.slot === "seat-rr";
    const options = isSelect ? getSelectOptions(this.hass, entityId) : [];
    return html`
      <div
        class="seat-icon-wrap"
        @mouseenter=${() => {
          if (isSelect && !this._busy) {
            this._openSeatMenu = { slot: zone.slot, kind };
          }
        }}
        @mouseleave=${() => {
          if (isSelect) {
            this._closeSeatMenu();
          }
        }}
      >
        <button
          type="button"
          class="seat-icon ${kind}${active ? " active" : ""}${open
            ? " open"
            : ""}"
          ?disabled=${this._busy}
          title=${`${roleLabel}: ${stateLabel}`}
          aria-label=${`${roleLabel}: ${stateLabel}`}
          aria-haspopup=${isSelect ? "listbox" : nothing}
          aria-expanded=${isSelect ? String(open) : nothing}
          @click=${onClick}
        >
          ${kind === "heat"
            ? renderMdiIcon("mdi:car-seat-heater")
            : renderMdiIcon("mdi:car-seat-cooler")}
        </button>
        ${open && isSelect
          ? html`
              <div
                class="seat-menu ${kind}${menuUp ? " up" : ""}${menuEnd
                  ? " end"
                  : ""}"
                role="listbox"
                aria-label=${roleLabel}
              >
                ${options.map((opt) => {
                  const current = opt === state;
                  const off = opt.toLowerCase() === "off";
                  const label = entityState(
                    this.hass,
                    "select",
                    entityKey,
                    opt,
                  );
                  return html`
                    <button
                      type="button"
                      class="seat-option${off ? " off" : ""}${current
                        ? " current"
                        : ""}"
                      role="option"
                      aria-selected=${String(current)}
                      ?disabled=${this._busy}
                      @click=${(ev: Event) => {
                        ev.stopPropagation();
                        this._closeSeatMenu();
                        this._setSeatLevel(entityId, opt, siblingId);
                      }}
                    >
                      ${label}
                    </button>
                  `;
                })}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  private _seatZone(
    zone: SeatZone,
    slots: Record<string, string | undefined>,
  ): TemplateResult | typeof nothing {
    const heatId = zone.heat ? slots[zone.heat] : undefined;
    const ventId = zone.vent ? slots[zone.vent] : undefined;
    const heat =
      heatId && this.hass?.states[heatId] ? heatId : undefined;
    const vent =
      ventId && this.hass?.states[ventId] ? ventId : undefined;
    if (!heat && !vent) {
      return nothing;
    }
    const heatState = heat ? getStateValue(this.hass, heat) : undefined;
    const ventState = vent ? getStateValue(this.hass, vent) : undefined;
    const heatOn = isSeatActiveState(heatState);
    const ventOn = isSeatActiveState(ventState);
    let mode: SeatKind | "off" | "unknown" = "off";
    let label = entityState(this.hass, "select", "seat_heat_l", "off");
    if (heatOn && zone.heat) {
      mode = "heat";
      label = this._seatStateLabel(heat!, zone.heat, heatState);
    } else if (ventOn && zone.vent) {
      mode = "vent";
      label = this._seatStateLabel(vent!, zone.vent, ventState);
    } else if (isSeatUnknownState(heatState) || isSeatUnknownState(ventState)) {
      mode = "unknown";
      const unknownKey = zone.heat ?? zone.vent ?? "seat_heat_l";
      const unknownState = isSeatUnknownState(heatState)
        ? heatState
        : ventState;
      label = entityState(this.hass, "select", unknownKey, unknownState);
    }
    const menuOpen = this._openSeatMenu?.slot === zone.slot;
    return html`
      <div
        slot=${zone.slot}
        class="seat-chip${menuOpen ? " menu-open" : ""}"
      >
        <div class="seat-icons">
          ${heat && zone.heat
            ? this._seatIcon(zone, "heat", heat, zone.heat, vent, heatOn)
            : nothing}
          ${vent && zone.vent
            ? this._seatIcon(zone, "vent", vent, zone.vent, heat, ventOn)
            : nothing}
        </div>
        <span class="seat-state ${mode}">${label}</span>
      </div>
    `;
  }

  private _wheelChip(
    pressureId: string | undefined,
    tempId: string | undefined,
    tone: string,
  ): TemplateResult | typeof nothing {
    if (!this.hass) {
      return nothing;
    }
    const hasPressure = Boolean(
      pressureId && this.hass.states[pressureId],
    );
    const hasTemp = Boolean(tempId && this.hass.states[tempId]);
    if (!hasPressure && !hasTemp) {
      return nothing;
    }
    const pressureLabel = hasPressure
      ? formatState(this.hass, pressureId!)
      : undefined;
    const tempLabel = hasTemp ? formatState(this.hass, tempId!) : undefined;
    const moreInfoId = hasPressure ? pressureId! : tempId!;
    const a11y = [pressureLabel, tempLabel].filter(Boolean).join(", ");
    return html`
      <button
        type="button"
        class="wheel-chip tone-${tone}"
        title=${a11y}
        aria-label=${a11y}
        @click=${() => fireMoreInfo(this, moreInfoId)}
      >
        ${renderMdiIcon("mdi:tire")}
        <span class="wheel-chip-text">
          ${pressureLabel
            ? html`<span class="wheel-pressure">${pressureLabel}</span>`
            : nothing}
          ${tempLabel
            ? html`<span class="wheel-temp">${tempLabel}</span>`
            : nothing}
        </span>
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
      <div slot=${zone.slot} class="wheel-zone">
        ${this._wheelChip(pressureId, tempId, tone)}
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
      this._entityExists(slots.find) ||
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
    const findId = slots.find;
    const defogId = slots.defog;
    const chargeId = slots.charge_stop;
    const trunkId = slots.trunk;
    const chargerConnected = this._chargerConnected(slots);
    const showCharge =
      this._entityExists(chargeId) && chargerConnected;
    const showEngine = this._entityExists(engineId);
    const showFind = this._entityExists(findId);
    if (
      !lockId &&
      !showEngine &&
      !showFind &&
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
      ${showEngine || showFind
        ? html`<div slot="engine" class="map-actions">
            ${showEngine
              ? renderActionButton({
                  label: engineOn
                    ? t(this.hass, "action.engine_off")
                    : t(this.hass, "action.engine_on"),
                  icon: renderMdiIcon("mdi:engine"),
                  disabled: this._busy,
                  variant: engineOn ? "ok" : "danger",
                  onClick: () =>
                    this._run(() =>
                      engineOn
                        ? turnOff(this.hass!, engineId!)
                        : turnOn(this.hass!, engineId!),
                    ),
                })
              : nothing}
            ${showFind
              ? renderActionButton({
                  label: entityName(this.hass, "button", "find"),
                  icon: renderMdiIcon("mdi:map-marker"),
                  disabled: this._busy,
                  onClick: () =>
                    this._run(() => pressButton(this.hass!, findId!)),
                })
              : nothing}
          </div>`
        : nothing}
      ${this._entityExists(lockId)
        ? html`<div slot="lock" class="map-actions">
            ${renderActionButton({
              label: locked
                ? t(this.hass, "action.unlock_doors")
                : t(this.hass, "action.lock_doors"),
              icon: locked
                ? renderMdiIcon("mdi:car-door-lock")
                : renderMdiIcon("mdi:lock-open-variant"),
              disabled: this._busy,
              variant: locked ? "ok" : "danger",
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
              icon: renderMdiIcon("mdi:car-defrost-front"),
              disabled: this._busy || defogReadOnly,
              variant: defogOn ? "danger" : "",
              onClick: () =>
                this._run(() => toggleSwitch(this.hass!, defogId!)),
            })}
          </div>`
        : nothing}
      ${showCharge
        ? html`<div slot="charge" class="map-actions">
            ${renderActionButton({
              label: entityName(this.hass, "button", "charge_stop"),
              icon: renderMdiIcon("mdi:ev-station"),
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
              icon: renderMdiIcon("mdi:car-back"),
              disabled: this._busy,
              variant: trunkOpen ? "danger" : "ok",
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
      <div slot="windows" class="map-actions map-actions-stack">
        ${hasCover
          ? windowsOpen
            ? renderActionButton({
                label: t(this.hass, "action.close_windows"),
                icon: renderMdiIcon("mdi:window-closed"),
                disabled: this._busy,
                variant: "danger",
                onClick: () =>
                  this._run(() => closeCover(this.hass!, coverId!)),
              })
            : renderActionButton({
                label: t(this.hass, "action.open_windows"),
                icon: renderMdiIcon("mdi:window-open"),
                disabled: this._busy,
                variant: "ok",
                onClick: () =>
                  this._run(() => openCover(this.hass!, coverId!)),
              })
          : nothing}
        ${hasVent
          ? renderActionButton({
              label: t(this.hass, "action.vent_windows"),
              icon: renderMdiIcon("mdi:window-open-variant"),
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
                icon: renderMdiIcon("mdi:window-closed"),
                disabled: this._busy,
                variant: "danger",
                onClick: () =>
                  this._run(() => closeCover(this.hass!, coverId!)),
              })
            : renderActionButton({
                label: t(this.hass, "action.open_sunroof"),
                icon: renderMdiIcon("mdi:window-open"),
                disabled: this._busy,
                variant: "ok",
                onClick: () =>
                  this._run(() => openCover(this.hass!, coverId!)),
              })
          : nothing}
        ${hasTilt
          ? renderActionButton({
              label: t(this.hass, "action.tilt_sunroof"),
              icon: renderMdiIcon("mdi:angle-acute"),
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
                            icon: renderMdiIcon("mdi:power"),
                            disabled: this._busy,
                            variant: climateOn ? "ok" : "",
                            onClick: () => this._toggleClimate(),
                          })}
                          ${renderActionButton({
                            label: t(this.hass, "climate.increase_temp"),
                            icon: renderMdiIcon("mdi:plus"),
                            disabled: this._busy || target === undefined,
                            variant: "heat",
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
                            icon: renderMdiIcon("mdi:minus"),
                            disabled: this._busy || target === undefined,
                            variant: "cool",
                            onClick: () => this._nudgeTemp(-1),
                          })}
                        `
                      : nothing}
                  </div>
                  <div class="controls-right">
                    ${s.quick_cool && this.hass.states[s.quick_cool]
                      ? renderActionButton({
                          label: entityName(this.hass, "button", "quick_cool"),
                          icon: renderMdiIcon("mdi:snowflake"),
                          disabled: this._busy,
                          variant: "cool",
                          onClick: () =>
                            this._run(() =>
                              pressButton(this.hass!, s.quick_cool!),
                            ),
                        })
                      : nothing}
                    ${s.quick_heat && this.hass.states[s.quick_heat]
                      ? renderActionButton({
                          label: entityName(this.hass, "button", "quick_heat"),
                          icon: renderMdiIcon("mdi:fire"),
                          disabled: this._busy,
                          variant: "heat",
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
      ha-card {
        overflow: visible;
      }
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
      .seat-chip,
      .wheel-zone {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .wheel-zone {
        align-items: flex-start;
      }
      /*
       * No backdrop-filter here: it would create a stacking context and trap
       * the open level menu behind the other seat/map regions.
       */
      .seat-chip {
        position: relative;
        align-items: center;
        gap: 3px;
        border: 1px solid var(--ck-border);
        background: var(--ck-bg);
        border-radius: 8px;
        padding: 5px 7px 4px;
      }
      .seat-chip.menu-open {
        z-index: 30;
      }
      .seat-icons {
        display: inline-flex;
        gap: 4px;
      }
      .seat-icon-wrap {
        position: relative;
      }
      .seat-icon,
      .wheel-chip {
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
      .seat-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.7rem;
        height: 1.7rem;
        padding: 0;
        color: var(--ck-muted);
        backdrop-filter: none;
      }
      .seat-icon ha-icon {
        --mdc-icon-size: 1rem;
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
      }
      .seat-icon.heat {
        border-color: color-mix(in srgb, var(--ck-seat-heat) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-heat) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.vent {
        border-color: color-mix(in srgb, var(--ck-seat-vent) 45%, transparent);
        color: color-mix(
          in srgb,
          var(--ck-seat-vent) 62%,
          var(--ck-muted)
        );
      }
      .seat-icon.heat.active,
      .seat-icon.heat.open {
        color: var(--ck-seat-heat);
        border-color: var(--ck-seat-heat);
        background: color-mix(in srgb, var(--ck-seat-heat) 20%, transparent);
      }
      .seat-icon.vent.active,
      .seat-icon.vent.open {
        color: var(--ck-seat-vent);
        border-color: var(--ck-seat-vent);
        background: color-mix(in srgb, var(--ck-seat-vent) 20%, transparent);
      }
      .seat-icon.open {
        box-shadow: 0 0 0 2px color-mix(in srgb, currentColor 40%, transparent);
      }
      .seat-state {
        font-size: 0.72rem;
        font-weight: 600;
        white-space: nowrap;
        line-height: 1.1;
      }
      .seat-state.off,
      .seat-state.unknown {
        color: var(--ck-muted);
        font-weight: 500;
      }
      .seat-state.heat {
        color: var(--ck-seat-heat);
      }
      .seat-state.vent {
        color: var(--ck-seat-vent);
      }
      .seat-menu {
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        z-index: 8;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 92px;
        padding: 4px;
        border: 1px solid var(--ck-border);
        border-radius: 8px;
        background: color-mix(in srgb, var(--ck-bg) 94%, var(--ck-text) 6%);
        box-shadow: 0 8px 20px color-mix(in srgb, #000 45%, transparent);
      }
      /* Keep pointer inside the wrap while moving icon -> menu (hover open). */
      .seat-menu::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: -8px;
        height: 8px;
      }
      .seat-menu.up::before {
        top: auto;
        bottom: -8px;
      }
      .seat-menu.up {
        top: auto;
        bottom: calc(100% + 6px);
      }
      .seat-menu.end {
        left: auto;
        right: 0;
      }
      .seat-menu.heat {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-heat) 50%,
          var(--ck-border)
        );
      }
      .seat-menu.vent {
        border-color: color-mix(
          in srgb,
          var(--ck-seat-vent) 50%,
          var(--ck-border)
        );
      }
      .seat-option {
        display: block;
        width: 100%;
        border: 0;
        background: transparent;
        color: var(--ck-text);
        font: inherit;
        font-size: 0.74rem;
        text-align: left;
        padding: 5px 8px;
        border-radius: 5px;
        cursor: pointer;
        white-space: nowrap;
      }
      .seat-menu.heat .seat-option {
        color: color-mix(in srgb, var(--ck-seat-heat) 78%, var(--ck-text));
      }
      .seat-menu.vent .seat-option {
        color: color-mix(in srgb, var(--ck-seat-vent) 78%, var(--ck-text));
      }
      .seat-option.off {
        color: var(--ck-muted);
      }
      .seat-option.current {
        background: color-mix(in srgb, currentColor 18%, transparent);
        font-weight: 700;
      }
      .seat-option:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 26%, transparent);
      }
      .wheel-chip {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 4px 7px;
      }
      .wheel-chip ha-icon {
        --mdc-icon-size: 0.95rem;
        width: 0.95rem;
        height: 0.95rem;
        flex-shrink: 0;
      }
      .wheel-chip-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
        line-height: 1.15;
      }
      .wheel-pressure {
        font-weight: 600;
      }
      .wheel-temp {
        color: var(--ck-muted);
        font-size: 0.65rem;
      }
      .wheel-chip.tone-ok {
        border-color: var(--ck-tyre-ok);
        color: var(--ck-tyre-ok);
      }
      .wheel-chip.tone-warn {
        border-color: var(--ck-tyre-warn);
        color: var(--ck-tyre-warn);
      }
      .wheel-chip.tone-danger {
        border-color: var(--ck-tyre-danger);
        color: var(--ck-tyre-danger);
      }
      .wheel-chip.tone-ok .wheel-temp,
      .wheel-chip.tone-warn .wheel-temp,
      .wheel-chip.tone-danger .wheel-temp {
        color: var(--ck-muted);
      }
      .seat-icon:hover:not(:disabled),
      .wheel-chip:hover {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .seat-icon:disabled,
      .seat-option:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .map-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 4px;
      }
      .map-actions-stack {
        flex-direction: column;
        flex-wrap: nowrap;
        align-items: center;
      }
      .map-actions .action.icon {
        width: 2.35rem;
        height: 2.35rem;
        min-width: 2.35rem;
        background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
        backdrop-filter: blur(2px);
      }
      .map-actions .action.icon:hover:not(:disabled) {
        background: color-mix(in srgb, currentColor 14%, var(--ck-bg));
        border-color: currentColor;
      }
      .map-actions .action.icon ha-icon {
        --mdc-icon-size: 1.35rem;
        width: 1.35rem;
        height: 1.35rem;
      }
      carlinko-car-outline {
        margin-top: 12px;
        max-width: 320px;
        overflow: visible;
      }
      @container ck-card (max-width: 360px) {
        .seat-chip {
          padding: 4px 5px 3px;
        }
        .seat-icon {
          width: 1.45rem;
          height: 1.45rem;
        }
        .seat-icon ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .seat-state {
          font-size: 0.65rem;
        }
        .seat-menu {
          min-width: 80px;
        }
        .wheel-chip {
          padding: 3px 5px;
          font-size: 0.65rem;
          gap: 4px;
        }
        .wheel-chip ha-icon {
          --mdc-icon-size: 0.85rem;
          width: 0.85rem;
          height: 0.85rem;
        }
        .wheel-temp {
          font-size: 0.6rem;
        }
        .map-actions .action.icon {
          width: 2.1rem;
          height: 2.1rem;
          min-width: 2.1rem;
        }
        .map-actions .action.icon ha-icon {
          --mdc-icon-size: 1.15rem;
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
