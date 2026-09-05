# Entity slot map

Maps UI slots to [ha-carlinko](https://github.com/elad-bar/ha-carlinko/) `EntitySpec.key` values.

**Resolution order** (see `src/core/resolve.ts`):

1. `config.entities[slot]` override
2. Entities on `config.device_id` whose `unique_id` matches `carlinko_{vehicle_id}_{key}`
3. Missing → hide slot

`device_id` is the Home Assistant device id for the CarLinko vehicle device (one device holds all entities for that car).

---

## Overview (`carlinko-overview`)

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| image | `vehicle_front` | image | optional | Override via `image_entity`; also `vehicle_side` / `vehicle_top` available |
| battery | `battery` | sensor | optional | % |
| range | `range` | sensor | optional | EV range km |
| fuel | `fuel` | sensor | optional | PHEV % |
| fuel_range | `fuel_range` | sensor | optional | PHEV km |
| total_range | `total_range` | sensor | optional | PHEV blended km |
| hv_state | `hv_state` | sensor | optional | Enum: `off` / `lv` / `ready` / `unknown`; Overview shows as status hotspot |
| odometer | `odometer` | sensor | optional | |
| consumption | `consumption` | sensor | optional | kWh/100km |
| fuel_consumption | `fuel_consumption` | sensor | optional | PHEV L/100km |
| speed | `speed` | sensor | optional | Headline; show only when engine is on |
| moving | `moving` | binary_sensor | optional | Resolved but unused in Overview UI today |
| online | `online` | binary_sensor | optional | Status chip |
| lock | `lock` | lock | optional | Lock / unlock |
| engine | `engine` | switch | optional | Capability-gated |
| defog | `defrost_cmd` | switch | optional | Fallback key `defrost` (binary, read-only) |
| charge_stop | `charge_stop` | button | optional | Stop / release charging |
| trunk | `liftgate` | cover | optional | Open / close |

---

## Charging (`carlinko-charging`)

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| charging | `charging` | binary_sensor | optional | Status chip |
| charge_state | `charge_state` | sensor | optional | |
| charge_mode | `charge_mode` | sensor | optional | |
| charge_remaining | `charge_remaining` | sensor | optional | minutes |
| charge_power | `charge_power` | sensor | optional | kW |
| charge_stop | `charge_stop` | button | optional | Stop charging action |

---

## Cabin (`carlinko-cabin`)

Climate, TPMS, and windows/sunroof controls on one top-down map. Deprecated aliases `carlinko-climate` / `carlinko-tpms` resolve the same slots and UI.

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| image | `vehicle_top` | image | optional | Top-down map background; SVG outline fallback; override via `image_entity` |
| climate | `climate` | climate | optional | Setpoint +/−, on/off (HVAC cool/off) |
| quick_cool | `quick_cool` | button | optional | |
| quick_heat | `quick_heat` | button | optional | |
| seat_heat_l | `seat_heat_l` | select | optional | Fallback binary `seat_heat_left` |
| seat_vent_l | `seat_vent_l` | select | optional | Fallback binary `seat_vent_left` |
| seat_heat_r | `seat_heat_r` | select | optional | Fallback binary `seat_heat_right` |
| seat_vent_r | `seat_vent_r` | select | optional | Fallback binary `seat_vent_right` |
| seat_heat_lr | `seat_heat_lr` | select | optional | |
| seat_vent_lr | `seat_vent_lr` | select | optional | |
| seat_heat_rr | `seat_heat_rr` | select | optional | |
| seat_vent_rr | `seat_vent_rr` | select | optional | |
| tyre_fl | `tyre_fl` | sensor | optional | Direct TPMS pressure |
| tyre_fl_temp | `tyre_fl_temp` | sensor | optional | |
| tyre_fr | `tyre_fr` | sensor | optional | |
| tyre_fr_temp | `tyre_fr_temp` | sensor | optional | |
| tyre_rl | `tyre_rl` | sensor | optional | |
| tyre_rl_temp | `tyre_rl_temp` | sensor | optional | |
| tyre_rr | `tyre_rr` | sensor | optional | |
| tyre_rr_temp | `tyre_rr_temp` | sensor | optional | |
| tyre_status | `tyre_status` | sensor | optional | Overall status |
| tyres_ok | `tyres_ok` | binary_sensor | optional | OK / problem chip |
| windows | `windows` | cover | optional | Open / close icon buttons on windshield |
| windows_vent | `windows_vent` | button | optional | Vent icon on windshield |
| sunroof | `sunroof` | cover | optional | Open / close icon buttons on sunroof |
| sunroof_tilt | `sunroof_tilt` | button | optional | Tilt icon on sunroof |

**Map:** Seat heat/vent in cabin; tyre pressure/temp at wheels when direct TPMS; windows icons on windshield; sunroof icons on glass roof. Indirect TPMS shows status chips only (no wheel labels). Hide the map when neither seats, direct wheels, nor windows/sunroof exist.

**INT-01:** ha-carlinko climate does **not** set `current_temperature` today (target only when `ac.temp` is supported). The card shows a Current row only if `attributes.current_temperature` is present at runtime.

**Purify:** `purify` switch is not in the Cabin UI (deferred).

---

## Windows (`carlinko-windows`)

Also available as icon overlays on Cabin. This card remains a focused text-button layout.

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| windows | `windows` | cover | optional | Open / close |
| windows_vent | `windows_vent` | button | optional | Vent |
| sunroof | `sunroof` | cover | optional | Open / close |
| sunroof_tilt | `sunroof_tilt` | button | optional | Tilt |

Whole-car covers only (not per-pane). Hide each section when its entities are missing.
