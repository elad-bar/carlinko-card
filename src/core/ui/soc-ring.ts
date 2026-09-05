import { html, nothing, type TemplateResult } from "lit";
import { styleMap } from "lit/directives/style-map.js";

export function renderSocRing(opts: {
  percent: number | undefined;
  onClick?: () => void;
}): TemplateResult | typeof nothing {
  const { percent, onClick } = opts;
  if (percent === undefined && !onClick) {
    return nothing;
  }

  const clamped =
    percent === undefined || Number.isNaN(percent)
      ? undefined
      : Math.max(0, Math.min(100, percent));
  const pct = clamped === undefined ? 0 : Math.round(clamped);
  const label = clamped !== undefined ? `${pct}% SoC` : "SoC";

  const meterStyle =
    clamped !== undefined
      ? styleMap({ "--ck-soc-pct": `${pct}%` })
      : nothing;

  const ring = html`
    <div
      class="soc-ring-meter ${clamped === undefined ? "empty" : ""}"
      style=${meterStyle}
      aria-hidden="true"
    ></div>
    <div class="soc-ring-center">
      ${clamped !== undefined
        ? html`<span class="soc-ring-pct">${pct}%</span>`
        : html`<span class="soc-ring-pct muted">—</span>`}
      <span class="soc-ring-label">SoC</span>
    </div>
  `;

  if (onClick) {
    return html`
      <button
        type="button"
        class="soc-ring"
        aria-label=${label}
        @click=${onClick}
      >
        ${ring}
      </button>
    `;
  }

  return html`<div class="soc-ring">${ring}</div>`;
}
