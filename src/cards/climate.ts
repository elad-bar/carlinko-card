import { customElement } from "lit/decorators.js";
import { t } from "../core/i18n";
import { CarlinkoCabin, type CabinConfig } from "./cabin";

/** @deprecated Prefer `custom:carlinko-cabin`. Alias for existing dashboards. */
export type ClimateConfig = CabinConfig;

@customElement("carlinko-climate")
export class CarlinkoClimate extends CarlinkoCabin {
  public static override getConfigElement(): HTMLElement {
    return document.createElement("carlinko-climate-editor");
  }

  static override getStubConfig(): CabinConfig {
    return {
      device_id: "",
      title: t(undefined, "stub.climate"),
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-climate": CarlinkoClimate;
  }
}
