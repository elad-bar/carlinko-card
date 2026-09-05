import { CarlinkoOverview } from "./cards/overview";
import { CarlinkoOverviewEditor } from "./cards/overview-editor";
import { CarlinkoCharging } from "./cards/charging";
import { CarlinkoChargingEditor } from "./cards/charging-editor";
import { CarlinkoCarOutline } from "./core/ui/car-outline";

void CarlinkoOverview;
void CarlinkoOverviewEditor;
void CarlinkoCharging;
void CarlinkoChargingEditor;
void CarlinkoCarOutline;

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description:
      "Vehicle overview: image, ranges, vitals, and quick controls for ha-carlinko.",
    preview: true,
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description:
      "Charging status, mode, remaining time, power, and stop charging.",
    preview: true,
  },
);

console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700",
);
