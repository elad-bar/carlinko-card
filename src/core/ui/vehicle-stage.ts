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
    /* Mileage text: top-left (no centered transform) */
    .headline {
      left: 3%;
      top: 6%;
      transform: none;
      max-width: calc(100% - 6%);
    }
    /* Status row: online, HV, tyres — bottom-right */
    .online {
      left: 73%;
      top: 88%;
    }
    .hv {
      left: 84%;
      top: 88%;
    }
    .tyres {
      left: 95%;
      top: 88%;
    }
    @container ck-stage (max-width: 360px) {
      .online {
        left: 68%;
      }
      .hv {
        left: 80%;
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
