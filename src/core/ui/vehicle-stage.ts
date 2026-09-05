import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Front/hero vehicle image with named absolute hotspot regions.
 * Prefer a vehicle image (`src`); fall back to a placeholder slot.
 */
@customElement("carlinko-vehicle-stage")
export class CarlinkoVehicleStage extends LitElement {
  /** Optional vehicle image URL (e.g. vehicle_front entity). */
  @property({ type: String }) public src?: string;

  protected render() {
    const hasImg = Boolean(this.src);
    return html`
      <div class="wrap ${hasImg ? "has-img" : ""}">
        ${hasImg
          ? html`<img class="car-img" src=${this.src!} alt="Vehicle" />`
          : html`<div class="placeholder"><slot name="placeholder">No image</slot></div>`}
        <div class="region engine"><slot name="engine"></slot></div>
        <div class="region lock"><slot name="lock"></slot></div>
        <div class="region online"><slot name="online"></slot></div>
        <div class="region hv"><slot name="hv"></slot></div>
        <div class="region tyres"><slot name="tyres"></slot></div>
        <div class="region defog"><slot name="defog"></slot></div>
        <div class="region charge"><slot name="charge"></slot></div>
        <div class="region trunk"><slot name="trunk"></slot></div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    .wrap {
      position: relative;
      width: 100%;
      min-height: 120px;
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: visible;
      background: var(--ha-card-background, linear-gradient(145deg, #e8eef2, #f7fafc));
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
      color: var(--ck-muted, #667);
      font-size: 0.9rem;
      padding: 24px;
    }
    .region {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 1;
      pointer-events: auto;
    }
    /* Status row: online, HV, tyres */
    .online {
      left: 5%;
      top: 11%;
    }
    .hv {
      left: 16%;
      top: 11%;
    }
    .tyres {
      left: 27%;
      top: 11%;
    }
    .engine {
      left: 34%;
      top: 47%;
    }
    .defog {
      left: 45%;
      top: 32%;
    }
    .lock {
      left: 69%;
      top: 52%;
    }
    .charge {
      left: 84%;
      top: 41%;
    }
    .trunk {
      left: 80%;
      top: 18%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-vehicle-stage": CarlinkoVehicleStage;
  }
}
