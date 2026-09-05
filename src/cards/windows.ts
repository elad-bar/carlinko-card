import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { runBusy } from "../core/busy";
import { resolveAllSlots } from "../core/resolve";
import { WINDOWS_SLOTS } from "../core/slots";
import type { CardConfigBase, HomeAssistant } from "../core/types";
import {
  closeCover,
  formatState,
  openCover,
  pressButton,
} from "../core/hass";
import {
  actionStyles,
  renderActionButton,
  sharedHostStyles,
} from "../core/ui";

export type WindowsConfig = CardConfigBase;

@customElement("carlinko-windows")
export class CarlinkoWindows extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: WindowsConfig;
  @state() private _busy = false;

  public setConfig(config: WindowsConfig): void {
    if (!config || typeof config.device_id !== "string") {
      throw new Error("device_id is required");
    }
    this._config = { ...config };
  }

  public getCardSize(): number {
    return 4;
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("carlinko-windows-editor");
  }

  static getStubConfig(): WindowsConfig {
    return {
      device_id: "",
      title: "Windows",
    };
  }

  private _slots(): Record<string, string | undefined> {
    if (!this._config) {
      return {};
    }
    return resolveAllSlots(this.hass, this._config, WINDOWS_SLOTS);
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
      (err) => console.error("carlinko-windows action failed", err),
    );
  }

  private _entityExists(entityId: string | undefined): boolean {
    return Boolean(entityId && this.hass?.states[entityId]);
  }

  private _section(
    title: string,
    coverId: string | undefined,
    extraId: string | undefined,
    extraLabel: string,
  ): TemplateResult | typeof nothing {
    const hasCover = this._entityExists(coverId);
    const hasExtra = this._entityExists(extraId);
    if (!hasCover && !hasExtra) {
      return nothing;
    }

    return html`
      <div class="section">
        <div class="section-head">
          <span class="section-title">${title}</span>
          ${hasCover
            ? html`<span class="section-state"
                >${formatState(this.hass, coverId)}</span
              >`
            : nothing}
        </div>
        <div class="section-actions">
          ${hasCover
            ? html`
                ${renderActionButton({
                  label: "Open",
                  disabled: this._busy,
                  onClick: () =>
                    this._run(() => openCover(this.hass!, coverId!)),
                })}
                ${renderActionButton({
                  label: "Close",
                  disabled: this._busy,
                  onClick: () =>
                    this._run(() => closeCover(this.hass!, coverId!)),
                })}
              `
            : nothing}
          ${hasExtra
            ? renderActionButton({
                label: extraLabel,
                disabled: this._busy,
                onClick: () =>
                  this._run(() => pressButton(this.hass!, extraId!)),
              })
            : nothing}
        </div>
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
    const windowsSection = this._section(
      "Windows",
      s.windows,
      s.windows_vent,
      "Vent",
    );
    const sunroofSection = this._section(
      "Sunroof",
      s.sunroof,
      s.sunroof_tilt,
      "Tilt",
    );

    if (windowsSection === nothing && sunroofSection === nothing) {
      return html`<ha-card
        ><div class="pad">No window or sunroof entities for this vehicle</div></ha-card
      >`;
    }

    return html`
      <ha-card>
        ${this._config.title
          ? html`<div class="header">${this._config.title}</div>`
          : nothing}
        <div class="body-pad">
          ${windowsSection} ${sunroofSection}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    sharedHostStyles,
    actionStyles,
    css`
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section + .section {
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid var(--ck-border);
      }
      .section-head {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .section-title {
        font-weight: 600;
      }
      .section-state {
        color: var(--ck-muted);
        font-size: 0.85rem;
      }
      .section-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-windows": CarlinkoWindows;
  }
}
