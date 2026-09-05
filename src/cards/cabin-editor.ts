import { customElement } from "lit/decorators.js";
import type { CabinConfig } from "./cabin";
import {
  CarlinkoDeviceEditor,
  TOP_IMAGE_ENTITY_SCHEMA,
  type HaFormSchema,
} from "./shared-editor";

@customElement("carlinko-cabin-editor")
export class CarlinkoCabinEditor extends CarlinkoDeviceEditor<CabinConfig> {
  protected override extraSchema(): HaFormSchema {
    return [TOP_IMAGE_ENTITY_SCHEMA];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "carlinko-cabin-editor": CarlinkoCabinEditor;
  }
}
