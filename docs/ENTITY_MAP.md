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
| hv_state | `hv_state` | sensor | optional | |
| odometer | `odometer` | sensor | optional | |
| consumption | `consumption` | sensor | optional | kWh/100km |
| fuel_consumption | `fuel_consumption` | sensor | optional | PHEV L/100km |
| speed | `speed` | sensor | optional | Show only when moving |
| moving | `moving` | binary_sensor | optional | Gates speed display |
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

## Climate (`carlinko-climate`) — stub

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| climate | `climate` | climate | optional | Setpoint, current, on/off |
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
| purify | `purify` | switch | optional | Later / optional row |

---

## TPMS (`carlinko-tpms`) — stub

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| tyre_fl | `tyre_fl` | sensor | optional | Direct TPMS only |
| tyre_fl_temp | `tyre_fl_temp` | sensor | optional | |
| tyre_fr | `tyre_fr` | sensor | optional | |
| tyre_fr_temp | `tyre_fr_temp` | sensor | optional | |
| tyre_rl | `tyre_rl` | sensor | optional | |
| tyre_rl_temp | `tyre_rl_temp` | sensor | optional | |
| tyre_rr | `tyre_rr` | sensor | optional | |
| tyre_rr_temp | `tyre_rr_temp` | sensor | optional | |
| tyre_status | `tyre_status` | sensor | optional | |
| tyres_ok | `tyres_ok` | binary_sensor | optional | Problem flag |

If no direct TPMS pressure entities exist, show status only.

---

## Windows (`carlinko-windows`) — stub

| Slot | Key | Domain | Required | Notes |
| --- | --- | --- | --- | --- |
| windows | `windows` | cover | optional | Open / close |
| windows_vent | `windows_vent` | button | optional | Vent |
| sunroof | `sunroof` | cover | optional | Open / close |
| sunroof_tilt | `sunroof_tilt` | button | optional | Tilt |
