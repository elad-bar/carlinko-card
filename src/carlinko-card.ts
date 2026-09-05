import { CarlinkoOverview } from "./cards/overview";
import { CarlinkoOverviewEditor } from "./cards/overview-editor";
import { CarlinkoCharging } from "./cards/charging";
import { CarlinkoChargingEditor } from "./cards/charging-editor";
import { CarlinkoCabin } from "./cards/cabin";
import { CarlinkoCabinEditor } from "./cards/cabin-editor";
import { CarlinkoClimate } from "./cards/climate";
import { CarlinkoClimateEditor } from "./cards/climate-editor";
import { CarlinkoTpms } from "./cards/tpms";
import { CarlinkoTpmsEditor } from "./cards/tpms-editor";
import { CarlinkoWindows } from "./cards/windows";
import { CarlinkoWindowsEditor } from "./cards/windows-editor";
import { CarlinkoCarOutline } from "./core/ui/car-outline";
import { CarlinkoVehicleStage } from "./core/ui/vehicle-stage";

void CarlinkoOverview;
void CarlinkoOverviewEditor;
void CarlinkoCharging;
void CarlinkoChargingEditor;
void CarlinkoCabin;
void CarlinkoCabinEditor;
void CarlinkoClimate;
void CarlinkoClimateEditor;
void CarlinkoTpms;
void CarlinkoTpmsEditor;
void CarlinkoWindows;
void CarlinkoWindowsEditor;
void CarlinkoCarOutline;
void CarlinkoVehicleStage;

window.customCards = window.customCards || [];
window.customCards.push(
  {
    type: "carlinko-overview",
    name: "CarLinko Overview",
    description:
      "Vehicle overview: hotspot controls on the car image, visual ranges/vitals for ha-carlinko.",
    preview: true,
  },
  {
    type: "carlinko-charging",
    name: "CarLinko Charging",
    description:
      "Charging status, mode, remaining time, power, and stop charging.",
    preview: true,
  },
  {
    type: "carlinko-cabin",
    name: "CarLinko Cabin",
    description:
      "Climate, seats, TPMS, and windows/sunroof controls on a top-down vehicle map.",
    preview: true,
  },
);

console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700",
);
