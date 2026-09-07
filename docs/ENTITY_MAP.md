# Entity slot map

Maps UI slots to [ha-carlinko](https://github.com/elad-bar/ha-carlinko/) `EntitySpec.key` values.

**Resolution order** (see `src/core/resolve.ts`):

1. `config.entities[slot]` override
2. Entities on `config.device_id` matching `translation_key` / `unique_id` / object_id suffix to the EntitySpec key (`hass.entities` display registry has `translation_key`, not `unique_id`)
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
| online | `online` | binary_sensor | optional | Status hotspot |
| tyres_ok | `tyres_ok` | binary_sensor | optional | Tyre problem binary; with `tyre_status`: problem → red, `check_tyres` → orange, else green |
| tyre_status | `tyre_status` | sensor | optional | Enum: `normal` / `check_tyres`; weaker than `tyres_ok` problem |
| engine | `engine` | switch | optional | Resolved for speed headline gating only; control is on Cabin |

---

## Charging (`carlinko-charging`)

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| battery | `battery` | sensor | optional | SoC ring % + battery fill |
| charging | `charging` | binary_sensor | optional | Plugged status + bolt / active tone |
| charge_state | `charge_state` | sensor | optional | Secondary metric |
| charge_mode | `charge_mode` | sensor | optional | Secondary metric; Enum `none` / `ac` / `dc`; gates Stop charging |
| charge_remaining | `charge_remaining` | sensor | optional | minutes → `Xh Ym` |
| charge_power | `charge_power` | sensor | optional | kW |
| charge_stop | `charge_stop` | button | optional | Stop charging; hidden when `charge_mode` is not `ac`/`dc` |

---

## Cabin (`carlinko-cabin`)

Climate, TPMS, windows/sunroof, and body/access controls on one top-down map.

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
| tyres_ok | `tyres_ok` | binary_sensor | optional | Problem binary for wheel readout color (shared with Overview) |
| tyre_status | `tyre_status` | sensor | optional | Enum `normal` / `check_tyres` for orange “check” tone |
| tyre_fl | `tyre_fl` | sensor | optional | Direct TPMS pressure |
| tyre_fl_temp | `tyre_fl_temp` | sensor | optional | |
| tyre_fr | `tyre_fr` | sensor | optional | |
| tyre_fr_temp | `tyre_fr_temp` | sensor | optional | |
| tyre_rl | `tyre_rl` | sensor | optional | |
| tyre_rl_temp | `tyre_rl_temp` | sensor | optional | |
| tyre_rr | `tyre_rr` | sensor | optional | |
| tyre_rr_temp | `tyre_rr_temp` | sensor | optional | |
| door_fl | `door_driver` | binary_sensor | optional | Status dot on driver door; green closed / red open |
| door_fr | `door_passenger` | binary_sensor | optional | Status dot on passenger door; green closed / red open |
| door_rl | `door_rear_left` | binary_sensor | optional | Status dot on rear left door; green closed / red open |
| door_rr | `door_rear_right` | binary_sensor | optional | Status dot on rear right door; green closed / red open |
| windows | `windows` | cover | optional | Open or Close icon on windshield (state-based) |
| windows_vent | `windows_vent` | button | optional | Vent icon on windshield |
| sunroof | `sunroof` | cover | optional | Open or Close icon on sunroof (state-based) |
| sunroof_tilt | `sunroof_tilt` | button | optional | Tilt icon on sunroof |
| lock | `lock` | lock | optional | Lock / unlock map button (door side) |
| engine | `engine` | switch | optional | Engine on/off map button (hood); shares hood cluster with Find |
| find | `find` | button | optional | Find car (Search) map button next to engine on hood |
| defog | `defrost_cmd` | switch | optional | Fallback key `defrost` (binary, read-only); windshield map button |
| steer_heat | `steer_heat` | switch | optional | Windshield map button, left of defog; cap-gated in ha-carlinko (`steerHeat`) |
| windshield_heat | `windshield_heat` | switch | optional | Windshield map button, right of defog; cap-gated in ha-carlinko (`windshieldHeat`) |
| charge_mode | `charge_mode` | sensor | optional | Enum `none` / `ac` / `dc`; gates Stop charge visibility (show only when plugged in) |
| charge_stop | `charge_stop` | button | optional | Stop / release charging map button (rear-left); hidden when `charge_mode` is not `ac`/`dc`; Charging card remains detail |
| trunk | `liftgate` | cover | optional | Open / close map button (rear) |

**Map:** Seat heat/vent in cabin; tyre pressure/temp at wheels when direct TPMS (borders colored from `tyres_ok` / `tyre_status`); green/red door-open dots on each door side; windows open/vent stacked vertically under lock (same left edge); sunroof icons on glass roof; steering wheel heat / defog / windshield heat share one row on the windshield (in that order); engine / find / lock / charge / trunk map buttons on the body. Overall tyre status also on Overview as a hotspot. Hide the map when neither seats, direct wheels, door sensors, windows/sunroof, nor body controls exist.

**INT-01:** ha-carlinko climate does **not** set `current_temperature` today (target only when `ac.temp` is supported). The card shows a Current row only if `attributes.current_temperature` is present at runtime.

**Purify:** `purify` switch is not in the Cabin UI (deferred).
