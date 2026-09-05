import { customElement } from "lit/decorators.js";
import { CarlinkoCabin, type CabinConfig } from "./cabin";

/** @deprecated Prefer `custom:carlinko-cabin`. Alias for existing dashboards. */
export type TpmsConfig = CabinConfig;

@customElement("carlinko-tpms")
export class CarlinkoTpms extends CarlinkoCabin {
  public static override getConfigElement(): HTMLElement {
    return document.createElement("carlinko-tpms-editor");
  }

  static override getStubConfig(): CabinConfig {
    return {
      device_id: "",
      title: "TPMS",
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-tpms": CarlinkoTpms;
  }
}
