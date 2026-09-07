/**
 * Minimal ha-icon so cards render outside Lovelace.
 * Glyphs come from @mdi/js (devDependency); production uses HA's ha-icon.
 */
import {
  mdiAngleAcute,
  mdiCarBack,
  mdiCarDefrostFront,
  mdiCarDoorLock,
  mdiCarElectric,
  mdiCarSeatCooler,
  mdiCarSeatHeater,
  mdiCarWindshield,
  mdiCarWireless,
  mdiEngine,
  mdiEvStation,
  mdiFire,
  mdiLightningBolt,
  mdiLockOpenVariant,
  mdiMapMarker,
  mdiMinus,
  mdiPlus,
  mdiPower,
  mdiSnowflake,
  mdiSteering,
  mdiStop,
  mdiTire,
  mdiWindowClosed,
  mdiWindowOpen,
  mdiWindowOpenVariant,
} from "@mdi/js";

const PATHS: Record<string, string> = {
  "mdi:power": mdiPower,
  "mdi:plus": mdiPlus,
  "mdi:minus": mdiMinus,
  "mdi:snowflake": mdiSnowflake,
  "mdi:fire": mdiFire,
  "mdi:car-seat-heater": mdiCarSeatHeater,
  "mdi:car-seat-cooler": mdiCarSeatCooler,
  "mdi:window-open": mdiWindowOpen,
  "mdi:window-closed": mdiWindowClosed,
  "mdi:window-open-variant": mdiWindowOpenVariant,
  "mdi:angle-acute": mdiAngleAcute,
  "mdi:car-door-lock": mdiCarDoorLock,
  "mdi:lock-open-variant": mdiLockOpenVariant,
  "mdi:car-defrost-front": mdiCarDefrostFront,
  "mdi:car-windshield": mdiCarWindshield,
  "mdi:steering": mdiSteering,
  "mdi:ev-station": mdiEvStation,
  "mdi:car-back": mdiCarBack,
  "mdi:engine": mdiEngine,
  "mdi:map-marker": mdiMapMarker,
  "mdi:stop": mdiStop,
  "mdi:lightning-bolt": mdiLightningBolt,
  "mdi:car-wireless": mdiCarWireless,
  "mdi:car-electric": mdiCarElectric,
  "mdi:tire": mdiTire,
};

if (!customElements.get("ha-icon")) {
  class HaIcon extends HTMLElement {
    static get observedAttributes(): string[] {
      return ["icon"];
    }

    #icon = "";

    get icon(): string {
      return this.#icon;
    }

    set icon(value: string) {
      this.#icon = value ?? "";
      this.#paint();
    }

    attributeChangedCallback(
      name: string,
      _old: string | null,
      value: string | null,
    ): void {
      if (name === "icon") {
        this.icon = value ?? "";
      }
    }

    connectedCallback(): void {
      this.style.display = "inline-flex";
      this.style.alignItems = "center";
      this.style.justifyContent = "center";
      this.style.color = "inherit";
      this.style.lineHeight = "0";
      this.#paint();
    }

    #paint(): void {
      const path = PATHS[this.#icon];
      const size = getComputedStyle(this).getPropertyValue("--mdc-icon-size").trim() || "24px";
      if (!path) {
        this.innerHTML = "";
        return;
      }
      this.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" style="display:block;fill:currentColor"><path d="${path}"></path></svg>`;
    }
  }

  customElements.define("ha-icon", HaIcon);
}
