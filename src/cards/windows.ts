import { customElement } from "lit/decorators.js";
import { t } from "../core/i18n";
import { CarlinkoCabin, type CabinConfig } from "./cabin";

/** @deprecated Prefer `custom:carlinko-cabin`. Alias for existing dashboards. */
export type WindowsConfig = CabinConfig;

@customElement("carlinko-windows")
export class CarlinkoWindows extends CarlinkoCabin {
  public static override getConfigElement(): HTMLElement {
    return document.createElement("carlinko-windows-editor");
  }

  static override getStubConfig(): CabinConfig {
    return {
      device_id: "",
      title: t(undefined, "stub.windows"),
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-windows": CarlinkoWindows;
  }
}
