import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Top-down car map with named seat/wheel slots.
 * Prefer a vehicle image (`src`); fall back to a simple SVG outline.
 */
@customElement("carlinko-car-outline")
export class CarlinkoCarOutline extends LitElement {
  /** Optional top-down vehicle image URL (e.g. vehicle_top entity). */
  @property({ type: String }) public src?: string;

  protected render() {
    const hasImg = Boolean(this.src);
    return html`
      <div class="wrap ${hasImg ? "has-img" : ""}">
        ${hasImg
          ? html`<img class="car-img" src=${this.src!} alt="Vehicle top" />`
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
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
    }
    .wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 120 / 200;
    }
    .wrap.has-img {
      aspect-ratio: auto;
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
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 12%, #fff);
      stroke: var(--ck-border, #e2e8f0);
      stroke-width: 2;
    }
    .glass {
      fill: color-mix(in srgb, var(--ck-accent, #0d9488) 8%, #e8eef2);
      stroke: none;
    }
    .region {
      position: absolute;
      min-width: 4px;
      min-height: 4px;
      pointer-events: auto;
    }
    .seat-fl {
      left: 10%;
      top: 30%;
    }
    .seat-fr {
      right: 10%;
      top: 30%;
    }
    .seat-rl {
      left: 10%;
      top: 52%;
    }
    .seat-rr {
      right: 10%;
      top: 52%;
    }
    .wheel-fl {
      left: 0;
      top: 22%;
    }
    .wheel-fr {
      right: 0;
      top: 22%;
    }
    .wheel-rl {
      left: 0;
      top: 68%;
    }
    .wheel-rr {
      right: 0;
      top: 68%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-car-outline": CarlinkoCarOutline;
  }
}
