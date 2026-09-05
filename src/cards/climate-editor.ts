import { customElement } from "lit/decorators.js";
import type { ClimateConfig } from "./climate";
import {
  CarlinkoDeviceEditor,
  TOP_IMAGE_ENTITY_SCHEMA,
  type HaFormSchema,
} from "./shared-editor";

@customElement("carlinko-climate-editor")
export class CarlinkoClimateEditor extends CarlinkoDeviceEditor<ClimateConfig> {
  protected override extraSchema(): HaFormSchema {
    return [TOP_IMAGE_ENTITY_SCHEMA];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-climate-editor": CarlinkoClimateEditor;
  }
}
