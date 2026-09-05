import { CarlinkoOverview } from "./cards/overview";
import { CarlinkoOverviewEditor } from "./cards/overview-editor";

// Ensure custom elements are registered via decorator side effects.
void CarlinkoOverview;
void CarlinkoOverviewEditor;

window.customCards = window.customCards || [];
window.customCards.push({
  type: "carlinko-overview",
  name: "CarLinko Overview",
  description:
    "Vehicle overview: image, ranges, vitals, and quick controls for ha-carlinko.",
  preview: true,
});

console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700",
);
