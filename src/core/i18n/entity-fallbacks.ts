/**
 * English fallbacks aligned with ha-carlinko translations/en.json.
 * Used when hass.localize is missing or returns an unresolved key.
 */
export const ENTITY_NAME_FALLBACKS: Readonly<
  Record<string, Record<string, string>>
> = {
  sensor: {
    battery: "Battery",
    range: "Range",
    odometer: "Odometer",
    speed: "Speed",
    charge_power: "Charge Power",
    consumption: "Consumption",
    charge_remaining: "Charge remaining",
    charge_mode: "Charge mode",
    charge_state: "Charge state",
    hv_state: "HV state",
    tyre_status: "Tyre status",
    fuel: "Fuel",
    fuel_range: "Fuel range",
    total_range: "Total range",
    fuel_consumption: "Fuel consumption",
  },
  binary_sensor: {
    charging: "Charging",
    online: "Online",
    tyres_ok: "Tyre problem",
    door_driver: "Driver door",
    door_passenger: "Passenger door",
    door_rear_left: "Rear left door",
    door_rear_right: "Rear right door",
  },
  button: {
    charge_stop: "Stop charging",
    windows_vent: "Windows vent",
    sunroof_tilt: "Sunroof tilt",
    quick_cool: "Quick cool",
    quick_heat: "Quick heat",
    find: "Find car",
  },
  switch: {
    engine: "Engine",
    defrost_cmd: "Defog",
    windshield_heat: "Windshield heat",
    steer_heat: "Steering wheel heat",
  },
  lock: {
    lock: "Lock",
  },
  climate: {
    climate: "Climate",
  },
  cover: {
    windows: "Windows",
    sunroof: "Sunroof",
    liftgate: "Liftgate",
  },
};

const SEAT_LEVEL_STATES: Readonly<Record<string, string>> = {
  off: "Off",
  l1: "Low",
  l2: "Medium",
  l3: "High",
};

export const ENTITY_STATE_FALLBACKS: Readonly<
  Record<string, Record<string, Record<string, string>>>
> = {
  sensor: {
    hv_state: {
      off: "Off",
      lv: "LV",
      ready: "Ready",
      unknown: "Unknown",
    },
    tyre_status: {
      normal: "Normal",
      check_tyres: "Check tyres",
    },
    charge_state: {
      idle: "Idle",
      charging: "Charging",
      complete: "Complete",
      canceled: "Canceled",
      hot: "Hot",
      stop: "Stop",
    },
    charge_mode: {
      none: "None",
      ac: "AC",
      dc: "DC",
    },
  },
  select: {
    seat_heat_l: SEAT_LEVEL_STATES,
    seat_heat_r: SEAT_LEVEL_STATES,
    seat_heat_lr: SEAT_LEVEL_STATES,
    seat_heat_rr: SEAT_LEVEL_STATES,
    seat_vent_l: SEAT_LEVEL_STATES,
    seat_vent_r: SEAT_LEVEL_STATES,
    seat_vent_lr: SEAT_LEVEL_STATES,
    seat_vent_rr: SEAT_LEVEL_STATES,
  },
};
