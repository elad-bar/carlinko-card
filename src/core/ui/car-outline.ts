import { LitElement, css, html, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

/**
 * Top-down car map with named seat/wheel slots.
 * Prefer a vehicle image (`src`); fall back to a simple SVG outline.
 */
@customElement("carlinko-car-outline")
export class CarlinkoCarOutline extends LitElement {
  /** Optional top-down vehicle image URL (e.g. vehicle_top entity). */
  @property({ type: String }) public src?: string;

  @state() private _imageReady = false;
  @state() private _imageFailed = false;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("src")) {
      this._imageReady = false;
      this._imageFailed = false;
    }
  }

  private _onImageLoad(): void {
    this._imageReady = true;
  }

  private _onImageError(): void {
    this._imageFailed = true;
    this._imageReady = true;
  }

  protected updated(changed: PropertyValues): void {
    if (!changed.has("src") && !changed.has("_imageFailed")) {
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
    const showImg = Boolean(this.src) && !this._imageFailed;
    const ready = !showImg || this._imageReady;
    const wrapClass = [
      showImg ? "has-img" : "",
      ready ? "ready" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return html`
      <div class="wrap ${wrapClass}">
        ${showImg
          ? html`<img
              class="car-img"
              src=${this.src!}
              alt="Vehicle top"
              @load=${this._onImageLoad}
              @error=${this._onImageError}
            />`
          : html`
              <svg viewBox="0 0 120 200" class="outline" aria-hidden="true">
                <rect
                  x="25"
                  y="20"
                  width="70"
                  height="160"
                  rx="18"
                  class="body"
                />
                <rect
                  x="35"
                  y="35"
                  width="50"
                  height="28"
                  rx="4"
                  class="glass"
                />
                <rect
                  x="35"
                  y="140"
                  width="50"
                  height="22"
                  rx="4"
                  class="glass"
                />
              </svg>
            `}
        <div class="region seat-fl"><slot name="seat-fl"></slot></div>
        <div class="region seat-fr"><slot name="seat-fr"></slot></div>
        <div class="region seat-rl"><slot name="seat-rl"></slot></div>
        <div class="region seat-rr"><slot name="seat-rr"></slot></div>
        <div class="region wheel-fl"><slot name="wheel-fl"></slot></div>
        <div class="region wheel-fr"><slot name="wheel-fr"></slot></div>
        <div class="region wheel-rl"><slot name="wheel-rl"></slot></div>
        <div class="region wheel-rr"><slot name="wheel-rr"></slot></div>
        <div class="region door-fl"><slot name="door-fl"></slot></div>
        <div class="region door-fr"><slot name="door-fr"></slot></div>
        <div class="region door-rl"><slot name="door-rl"></slot></div>
        <div class="region door-rr"><slot name="door-rr"></slot></div>
        <div class="region windows"><slot name="windows"></slot></div>
        <div class="region sunroof"><slot name="sunroof"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region engine"><slot name="engine"></slot></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
      container-type: inline-size;
      container-name: ck-outline;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
    }
    .wrap.has-img.ready {
      aspect-ratio: auto;
    }
    .wrap.has-img:not(.ready) .region {
      visibility: hidden;
      pointer-events: none;
    }
    .car-img {
      width: 100%;
      height: auto;
      display: block;
      border-radius: 8px;
    }
    .outline {
      width: 100%;
      height: 100%;
      display: block;
    }
    .body {
      fill: color-mix(
        in srgb,
        var(--ck-accent, var(--primary-color, #0d9488)) 12%,
        var(--ck-bg, var(--card-background-color, #fff))
      );
      stroke: var(--ck-border, var(--divider-color, #e2e8f0));
      stroke-width: 2;
    }
    .glass {
      fill: var(
        --ck-surface-muted,
        color-mix(
          in srgb,
          var(--ck-accent, var(--primary-color, #0d9488)) 8%,
          var(--ck-bg, var(--card-background-color, #fff))
        )
      );
      stroke: none;
    }
    .region {
      position: absolute;
      min-width: 4px;
      min-height: 4px;
      pointer-events: auto;
    }
    /*
     * Regions paint in DOM order, so a popover in an earlier region (seat level
     * menu) would sit under later regions. Raise the active region instead.
     */
    .region:hover,
    .region:focus-within {
      z-index: 20;
    }
    /* Cabin seats: inset, clear of wheel TPMS */
    .seat-fl {
      left: 18%;
      top: 40%;
    }
    .seat-fr {
      right: 18%;
      top: 40%;
    }
    .seat-rl {
      left: 18%;
      top: 65%;
    }
    .seat-rr {
      right: 18%;
      top: 65%;
    }
    /* TPMS: front near mirrors/wheels; rear aligned with rear wheels */
    .wheel-fl {
      left: 0;
      top: 18%;
    }
    .wheel-fr {
      right: 0;
      top: 18%;
    }
    .wheel-rl {
      left: 0;
      top: 78%;
    }
    .wheel-rr {
      right: 0;
      top: 78%;
    }
    /* Door status dots: body sides, clear of the windows stack at left 3% */
    .door-fl {
      left: 11%;
      top: 47%;
      transform: translate(-50%, -50%);
    }
    .door-fr {
      right: 11%;
      top: 47%;
      transform: translate(50%, -50%);
    }
    .door-rl {
      left: 11%;
      top: 70%;
      transform: translate(-50%, -50%);
    }
    .door-rr {
      right: 11%;
      top: 70%;
      transform: translate(50%, -50%);
    }
    /* Stack under lock, same left edge — vertical window then vent */
    .windows {
      left: 3%;
      top: 60%;
      transform: translate(-50%, -50%);
    }
    .sunroof {
      left: 50%;
      top: 54%;
      transform: translateX(-50%);
    }
    /* Body / access: trunk rear, charge rear-left, lock mid-side, defog windshield, engine/find hood */
    .trunk {
      left: 50%;
      top: 93%;
      transform: translate(-50%, -50%);
    }
    .charge {
      left: 14%;
      top: 94%;
      transform: translate(-50%, -50%);
    }
    .lock {
      left: 3%;
      top: 45%;
      transform: translate(-50%, -50%);
    }
    .defog {
      left: 50%;
      top: 29%;
      transform: translate(-50%, -50%);
    }
    .engine {
      left: 50%;
      top: 12%;
      transform: translate(-50%, -50%);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-car-outline": CarlinkoCarOutline;
  }
}
