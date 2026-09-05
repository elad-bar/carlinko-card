import { customElement } from "lit/decorators.js";
import type { TpmsConfig } from "./tpms";
import {
  CarlinkoDeviceEditor,
  TOP_IMAGE_ENTITY_SCHEMA,
  type HaFormSchema,
} from "./shared-editor";

@customElement("carlinko-tpms-editor")
export class CarlinkoTpmsEditor extends CarlinkoDeviceEditor<TpmsConfig> {
  protected override extraSchema(): HaFormSchema {
    return [TOP_IMAGE_ENTITY_SCHEMA];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-tpms-editor": CarlinkoTpmsEditor;
  }
}
