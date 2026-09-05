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
  },
  button: {
    charge_stop: "Stop charging",
    windows_vent: "Windows vent",
    sunroof_tilt: "Sunroof tilt",
    quick_cool: "Quick cool",
    quick_heat: "Quick heat",
  },
  switch: {
    engine: "Engine",
    defrost_cmd: "Defog",
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
};
