import { CarlinkoOverview } from "./cards/overview";
import { CarlinkoOverviewEditor } from "./cards/overview-editor";
import { CarlinkoCharging } from "./cards/charging";
import { CarlinkoChargingEditor } from "./cards/charging-editor";
import { CarlinkoClimate } from "./cards/climate";
import { CarlinkoClimateEditor } from "./cards/climate-editor";
import { CarlinkoTpms } from "./cards/tpms";
import { CarlinkoTpmsEditor } from "./cards/tpms-editor";
import { CarlinkoWindows } from "./cards/windows";
import { CarlinkoWindowsEditor } from "./cards/windows-editor";
import { CarlinkoCarOutline } from "./core/ui/car-outline";

void CarlinkoOverview;
void CarlinkoOverviewEditor;
void CarlinkoCharging;
void CarlinkoChargingEditor;
void CarlinkoClimate;
void CarlinkoClimateEditor;
void CarlinkoTpms;
void CarlinkoTpmsEditor;
void CarlinkoWindows;
void CarlinkoWindowsEditor;
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
  {
    type: "carlinko-climate",
    name: "CarLinko Climate",
    description:
      "Cabin climate setpoint, on/off, quick cool/heat, and seat heat/vent.",
    preview: true,
  },
  {
    type: "carlinko-tpms",
    name: "CarLinko TPMS",
    description:
      "Tyre pressure and temperature per wheel, or overall status for indirect TPMS.",
    preview: true,
  },
  {
    type: "carlinko-windows",
    name: "CarLinko Windows",
    description:
      "Whole-car windows open/close/vent and sunroof open/close/tilt.",
    preview: true,
  },
);

console.info(
  "%c CARLINKO-CARD %c 0.1.0 ",
  "color:#fff;background:#0d9488;font-weight:700",
  "color:#0d9488;background:transparent;font-weight:700",
);
