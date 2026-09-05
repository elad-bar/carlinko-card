import { customElement } from "lit/decorators.js";
import type { ChargingConfig } from "./charging";
import { CarlinkoDeviceEditor } from "./shared-editor";

@customElement("carlinko-charging-editor")
export class CarlinkoChargingEditor extends CarlinkoDeviceEditor<ChargingConfig> {}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-charging-editor": CarlinkoChargingEditor;
  }
}
