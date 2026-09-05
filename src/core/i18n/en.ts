/** Card-only English strings (chrome, actions, editor). Entity labels come from ha-carlinko. */
export const CARD_EN = {
  chrome: {
    not_configured: "Not configured",
    select_device: "Select a CarLinko vehicle device",
    waiting_hass: "Waiting for Home Assistant…",
  },
  editor: {
    device: "Vehicle device",
    title: "Title",
    image_override: "Image override (optional)",
    top_image_override: "Top image override (optional)",
  },
  status: {
    offline: "Offline",
    tyres_ok: "Tyres OK",
    not_charging: "Not charging",
    plugged: "Plugged",
    soc: "SoC",
    power: "Power",
    time: "Time",
    mode: "Mode",
    hv_prefix: "HV",
    heat: "Heat",
    vent: "Vent",
  },
  climate: {
    on: "Climate on",
    off: "Climate off",
    increase_temp: "Increase temperature",
    decrease_temp: "Decrease temperature",
    setpoint: "Setpoint",
    current: "Current",
  },
  action: {
    engine_on: "Turn engine on",
    engine_off: "Turn engine off",
    unlock_doors: "Unlock doors",
    lock_doors: "Lock doors",
    defog_on: "Turn defog on",
    defog_off: "Turn defog off",
    open_trunk: "Open trunk",
    close_trunk: "Close trunk",
    open_windows: "Open windows",
    close_windows: "Close windows",
    vent_windows: "Vent windows",
    open_sunroof: "Open sunroof",
    close_sunroof: "Close sunroof",
    tilt_sunroof: "Tilt sunroof",
  },
  stub: {
    overview: "CarLinko",
    charging: "Charging",
    cabin: "Cabin",
    climate: "Climate",
    tpms: "TPMS",
    windows: "Windows",
  },
} as const;

export type CardStringPath =
  | `chrome.${keyof typeof CARD_EN.chrome}`
  | `editor.${keyof typeof CARD_EN.editor}`
  | `status.${keyof typeof CARD_EN.status}`
  | `climate.${keyof typeof CARD_EN.climate}`
  | `action.${keyof typeof CARD_EN.action}`
  | `stub.${keyof typeof CARD_EN.stub}`;
