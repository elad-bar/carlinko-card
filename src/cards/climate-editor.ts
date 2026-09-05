import { customElement } from "lit/decorators.js";
import { CarlinkoCabinEditor } from "./cabin-editor";

/** @deprecated Prefer `carlinko-cabin-editor`. */
@customElement("carlinko-climate-editor")
export class CarlinkoClimateEditor extends CarlinkoCabinEditor {}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-climate-editor": CarlinkoClimateEditor;
  }
}
