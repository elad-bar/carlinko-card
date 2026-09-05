import { html, nothing, type TemplateResult } from "lit";

export function renderChargeBattery(opts: {
  percent: number | undefined;
  charging?: boolean;
  batteryLabel?: string;
  chargingLabel?: string;
}): TemplateResult | typeof nothing {
  const { percent } = opts;
  const charging = opts.charging ?? false;
  const batteryLabel = opts.batteryLabel ?? "Battery";
  const chargingLabel = opts.chargingLabel ?? "charging";
  const clamped =
    percent === undefined || Number.isNaN(percent)
      ? undefined
      : Math.max(0, Math.min(100, percent));
  const fillWidth = clamped === undefined ? 0 : clamped;

  return html`
    <div
      class="charge-batt"
      role="img"
      aria-label=${clamped !== undefined
        ? `${batteryLabel} ${Math.round(clamped)}%${charging ? `, ${chargingLabel}` : ""}`
        : batteryLabel}
    >
      <div class="charge-batt-body">
        ${clamped !== undefined
          ? html`<div
              class="charge-batt-fill"
              style="width:${fillWidth}%"
            ></div>`
          : nothing}
        ${charging
          ? html`<svg
              class="charge-batt-bolt"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"
              />
            </svg>`
          : nothing}
      </div>
      <div class="charge-batt-cap" aria-hidden="true"></div>
    </div>
  `;
}
