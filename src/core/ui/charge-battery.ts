import { html, nothing, type TemplateResult } from "lit";

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
      <svg class="charge-power-bolt" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
        />
      </svg>
    </div>
  `;
}
