import { CarlinkoOverview } from "./cards/overview";
import { CarlinkoOverviewEditor } from "./cards/overview-editor";
import { CarlinkoCharging } from "./cards/charging";
import { CarlinkoChargingEditor } from "./cards/charging-editor";
import { CarlinkoCabin } from "./cards/cabin";
import { CarlinkoCabinEditor } from "./cards/cabin-editor";
import { CarlinkoCarOutline } from "./core/ui/car-outline";
import { CarlinkoVehicleStage } from "./core/ui/vehicle-stage";

void CarlinkoOverview;
void CarlinkoOverviewEditor;
void CarlinkoCharging;
void CarlinkoChargingEditor;
void CarlinkoCabin;
void CarlinkoCabinEditor;
void CarlinkoCarOutline;
void CarlinkoVehicleStage;

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description:
      "Vehicle overview: status hotspots on the car image, visual ranges/vitals for ha-carlinko.",
    preview: true,
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description:
      "SoC ring, charging status, remaining time, power, and stop charging.",
    preview: true,
  },
  {
    type: "carlinko-cabin",
    name: "CarLinko Cabin",
    description:
      "Climate, seats, TPMS, windows/sunroof, and body/access controls on a top-down vehicle map.",
    preview: true,
  },
);

console.info(
  `%c CARLINKO-CARD %c ${__CARD_VERSION__} `,
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700",
);
