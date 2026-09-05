import { customElement } from "lit/decorators.js";
import type { OverviewConfig } from "./overview";
import {
  CarlinkoDeviceEditor,
  IMAGE_ENTITY_SCHEMA,
  type HaFormSchema,
} from "./shared-editor";

@customElement("carlinko-overview-editor")
export class CarlinkoOverviewEditor extends CarlinkoDeviceEditor<OverviewConfig> {
  protected override extraSchema(): HaFormSchema {
    return [IMAGE_ENTITY_SCHEMA];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-overview-editor": CarlinkoOverviewEditor;
  }
}
