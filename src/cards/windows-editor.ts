import { customElement } from "lit/decorators.js";
import { CarlinkoCabinEditor } from "./cabin-editor";

/** @deprecated Prefer `carlinko-cabin-editor`. */
@customElement("carlinko-windows-editor")
export class CarlinkoWindowsEditor extends CarlinkoCabinEditor {}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-windows-editor": CarlinkoWindowsEditor;
  }
}
