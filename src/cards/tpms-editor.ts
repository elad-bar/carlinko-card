import { customElement } from "lit/decorators.js";
import { CarlinkoCabinEditor } from "./cabin-editor";

/** @deprecated Prefer `carlinko-cabin-editor`. */
@customElement("carlinko-tpms-editor")
export class CarlinkoTpmsEditor extends CarlinkoCabinEditor {}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-tpms-editor": CarlinkoTpmsEditor;
  }
}
