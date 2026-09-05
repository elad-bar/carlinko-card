import { customElement } from "lit/decorators.js";
import type { WindowsConfig } from "./windows";
import { CarlinkoDeviceEditor } from "./shared-editor";

@customElement("carlinko-windows-editor")
export class CarlinkoWindowsEditor extends CarlinkoDeviceEditor<WindowsConfig> {}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-windows-editor": CarlinkoWindowsEditor;
  }
}
