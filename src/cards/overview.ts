import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
  lockLock,
  openCover,
  pressButton,
  toggleSwitch,
  turnOff,
  turnOn,
  unlockLock,
} from "../core/hass";

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

  private async _run(action: () => Promise<void>): Promise<void> {
    if (this._busy || !this.hass) {
      return;
    }
    this._busy = true;
    try {
      await action();
    } catch (err) {
      console.error("carlinko-overview action failed", err);
    } finally {
      this._busy = false;
    }
  }

  private _metric(
    label: string,
    entityId: string | undefined,
    opts?: { suffix?: string; numeric?: boolean },
  ) {
    if (!entityId || !this.hass?.states[entityId]) {
      return nothing;
    }
    let value = formatState(this.hass, entityId);
    if (opts?.numeric) {
      const n = getNumericState(this.hass, entityId);
      if (n === undefined) {
        return nothing;
      }
      value = opts.suffix ? `${n}${opts.suffix}` : String(n);
    }
    return html`
      <button
        type="button"
        class="metric"
        @click=${() => fireMoreInfo(this, entityId)}
      >
        <span class="metric-label">${label}</span>
        <span class="metric-value">${value}</span>
      </button>
    `;
  }

  private _batteryBar(entityId: string | undefined) {
    const n = getNumericState(this.hass, entityId);
    if (n === undefined) {
      return nothing;
    }
    const clamped = Math.max(0, Math.min(100, n));
    return html`
      <div class="bar-wrap" title="Battery ${clamped}%">
        <div class="bar" style="width:${clamped}%"></div>
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
    const moving = isOn(this.hass, s.moving);
    const img = imageEntityUrl(this.hass, s.image);
    const lockState = getStateValue(this.hass, s.lock);
    const locked = lockState === "locked";
    const engineOn = isOn(this.hass, s.engine);
    const defogOn = isOn(this.hass, s.defog);
    const trunkOpen = getStateValue(this.hass, s.trunk) === "open";

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
            ${this._metric("Battery", s.battery, { numeric: true, suffix: "%" })}
            ${s.battery ? this._batteryBar(s.battery) : nothing}
            ${this._metric("EV range", s.range)}
            ${this._metric("Fuel", s.fuel, { numeric: true, suffix: "%" })}
            ${this._metric("Fuel range", s.fuel_range)}
            ${this._metric("Total range", s.total_range)}
            <div class="chips">
              ${s.hv_state && this.hass.states[s.hv_state]
                ? html`<span class="chip"
                    >HV ${formatState(this.hass, s.hv_state)}</span
                  >`
                : nothing}
              ${s.odometer && this.hass.states[s.odometer]
                ? html`<span class="chip"
                    >${formatState(this.hass, s.odometer)}</span
                  >`
                : nothing}
              ${s.consumption && this.hass.states[s.consumption]
                ? html`<span class="chip"
                    >${formatState(this.hass, s.consumption)}</span
                  >`
                : nothing}
              ${s.fuel_consumption && this.hass.states[s.fuel_consumption]
                ? html`<span class="chip"
                    >${formatState(this.hass, s.fuel_consumption)}</span
                  >`
                : nothing}
              ${s.online && this.hass.states[s.online]
                ? html`<span class="chip ${isOn(this.hass, s.online) ? "ok" : ""}"
                    >${isOn(this.hass, s.online) ? "Online" : "Offline"}</span
                  >`
                : nothing}
              ${moving && s.speed && this.hass.states[s.speed]
                ? html`<span class="chip"
                    >${formatState(this.hass, s.speed)}</span
                  >`
                : nothing}
            </div>
          </div>
        </div>
        <div class="actions">
          ${s.lock
            ? html`
                <button
                  type="button"
                  class="action ${locked ? "danger" : "ok"}"
                  ?disabled=${this._busy}
                  @click=${() =>
                    this._run(() =>
                      locked
                        ? unlockLock(this.hass!, s.lock!)
                        : lockLock(this.hass!, s.lock!),
                    )}
                >
                  ${locked ? "Unlock" : "Lock"}
                </button>
              `
            : nothing}
          ${s.engine
            ? html`
                <button
                  type="button"
                  class="action ${engineOn ? "ok" : ""}"
                  ?disabled=${this._busy}
                  @click=${() =>
                    this._run(() =>
                      engineOn
                        ? turnOff(this.hass!, s.engine!)
                        : turnOn(this.hass!, s.engine!),
                    )}
                >
                  Engine ${engineOn ? "Off" : "On"}
                </button>
              `
            : nothing}
          ${s.defog
            ? html`
                <button
                  type="button"
                  class="action ${defogOn ? "ok" : ""}"
                  ?disabled=${this._busy ||
                  s.defog.startsWith("binary_sensor.")}
                  @click=${() =>
                    this._run(() => toggleSwitch(this.hass!, s.defog!))}
                >
                  Defog ${defogOn ? "On" : "Off"}
                </button>
              `
            : nothing}
          ${s.charge_stop
            ? html`
                <button
                  type="button"
                  class="action"
                  ?disabled=${this._busy}
                  @click=${() =>
                    this._run(() => pressButton(this.hass!, s.charge_stop!))}
                >
                  Stop charge
                </button>
              `
            : nothing}
          ${s.trunk
            ? html`
                <button
                  type="button"
                  class="action ${trunkOpen ? "ok" : ""}"
                  ?disabled=${this._busy}
                  @click=${() =>
                    this._run(() =>
                      trunkOpen
                        ? closeCover(this.hass!, s.trunk!)
                        : openCover(this.hass!, s.trunk!),
                    )}
                >
                  Trunk ${trunkOpen ? "Close" : "Open"}
                </button>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      --ck-accent: #0d9488;
      --ck-bg: var(--card-background-color, #fff);
      --ck-text: var(--primary-text-color, #1a1a1a);
      --ck-muted: var(--secondary-text-color, #667);
      --ck-border: var(--divider-color, #e2e8f0);
    }
    ha-card {
      background: var(--ck-bg);
      color: var(--ck-text);
      overflow: hidden;
    }
    .header {
      font-size: 1.1rem;
      font-weight: 600;
      padding: 12px 16px 0;
    }
    .pad {
      padding: 16px;
    }
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
    .metric {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      border: none;
      background: transparent;
      color: inherit;
      padding: 4px 0;
      cursor: pointer;
      font: inherit;
      text-align: left;
    }
    .metric-label {
      color: var(--ck-muted);
      font-size: 0.85rem;
    }
    .metric-value {
      font-weight: 600;
    }
    .bar-wrap {
      height: 6px;
      background: var(--ck-border);
      border-radius: 999px;
      overflow: hidden;
      margin: 2px 0 8px;
    }
    .bar {
      height: 100%;
      background: var(--ck-accent);
      border-radius: 999px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .chip {
      font-size: 0.75rem;
      padding: 4px 8px;
      border-radius: 6px;
      background: color-mix(in srgb, var(--ck-accent) 12%, transparent);
      border: 1px solid var(--ck-border);
    }
    .chip.ok {
      border-color: var(--ck-accent);
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0 16px 16px;
      border-top: 1px solid var(--ck-border);
      padding-top: 12px;
      margin-top: 0;
    }
    .action {
      border: 1px solid var(--ck-border);
      background: var(--ck-bg);
      color: var(--ck-text);
      border-radius: 8px;
      padding: 8px 12px;
      font: inherit;
      font-size: 0.85rem;
      cursor: pointer;
    }
    .action:hover:not(:disabled) {
      border-color: var(--ck-accent);
    }
    .action:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .action.ok {
      border-color: var(--ck-accent);
      color: var(--ck-accent);
    }
    .action.danger {
      border-color: #b91c1c;
      color: #b91c1c;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-overview": CarlinkoOverview;
  }
}
