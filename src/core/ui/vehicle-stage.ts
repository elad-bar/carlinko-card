import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * Front/hero vehicle image with named absolute hotspot regions.
 * Prefer a vehicle image (`src`); fall back to a placeholder slot.
 */
@customElement("carlinko-vehicle-stage")
export class CarlinkoVehicleStage extends LitElement {
  /** Optional vehicle image URL (e.g. vehicle_front entity). */
  @property({ type: String }) public src?: string;

  @state() private _imageReady = false;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("src")) {
      this._imageReady = false;
    }
  }

  private _onImageLoad(): void {
    this._imageReady = true;
  }

  private _onImageError(): void {
    this._imageReady = true;
  }

  protected updated(changed: PropertyValues): void {
    if (!changed.has("src")) {
      return;
    }
    const img = this.renderRoot.querySelector(
      "img.car-img",
    ) as HTMLImageElement | null;
    if (img?.complete && img.naturalWidth > 0) {
      this._imageReady = true;
    }
  }

  protected render() {
    const hasImg = Boolean(this.src);
    const ready = !hasImg || this._imageReady;
    const wrapClass = [
      hasImg ? "has-img" : "",
      ready ? "ready" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div class="wrap ${wrapClass}">
        ${hasImg
          ? html`<img
              class="car-img"
              src=${this.src!}
              alt="Vehicle"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />`
          : html`<div class="placeholder">
              <slot name="placeholder">No image</slot>
            </div>`}
        <div class="region headline"><slot name="headline"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      container-type: inline-size;
      container-name: ck-stage;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(
        --ha-card-background,
        var(--ck-bg, var(--card-background-color, #fff))
      );
    }
    /* Leave room above the vehicle so odometer / range / speed do not sit on the roof */
    .wrap.has-img {
      padding-top: 4.5rem;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: var(--ha-card-border-radius, 12px);
    }
    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 160px;
      color: var(--ck-muted, var(--secondary-text-color, #667));
      font-size: 0.9rem;
      padding: 24px;
    }
    .region {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: auto;
    }
    /* Mileage text: top-left in the padding band (no centered transform) */
    .headline {
      left: 3%;
      top: 0.35rem;
      transform: none;
      max-width: calc(100% - 6%);
    }
    /* Spread status hotspots so they do not overlap on narrow cards */
    .online {
      left: 94%;
      top: 1.4rem;
      transform: translate(-50%, 0);
    }
    .hv {
      left: 8%;
      top: 88%;
    }
    .tyres {
      left: 94%;
      top: 88%;
    }
    @container ck-stage (max-width: 360px) {
      .wrap.has-img {
        padding-top: 4rem;
      }
      .online {
        left: 92%;
        top: 1.15rem;
      }
      .hv {
        left: 10%;
      }
      .tyres {
        left: 92%;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-vehicle-stage": CarlinkoVehicleStage;
  }
}
