import { html, nothing, type TemplateResult } from "lit";
import { renderMdiIcon } from "./mdi-icon";

/** Electricity / charging indicator (SOC ring already shows battery %). */
export function renderChargeBattery(opts: {
  percent: number | undefined;
  charging?: boolean;
  batteryLabel?: string;
  chargingLabel?: string;
}): TemplateResult | typeof nothing {
  const charging = opts.charging ?? false;
  const batteryLabel = opts.batteryLabel ?? "Battery";
  const chargingLabel = opts.chargingLabel ?? "charging";
  const clamped =
    opts.percent === undefined || Number.isNaN(opts.percent)
      ? undefined
      : Math.max(0, Math.min(100, opts.percent));

  return html`
    <div
      class="charge-power ${charging ? "is-charging" : "is-idle"}"
      role="img"
      aria-label=${charging
        ? `${chargingLabel}${clamped !== undefined ? `, ${batteryLabel} ${Math.round(clamped)}%` : ""}`
        : `${chargingLabel}: off`}
    >
      <span class="charge-power-bolt"
        >${renderMdiIcon("mdi:lightning-bolt")}</span
      >
    </div>
  `;
}
