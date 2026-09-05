import { html, nothing, type TemplateResult } from "lit";

export type VerticalGaugeTone = "ok" | "info";

export function renderVerticalGauge(opts: {
  percent: number | undefined;
  /** Bar title (e.g. SOC / Fuel) — shown at the top. */
  primary?: string;
  /** Remaining range — shown below the percent. */
  secondary?: string;
  /** Extra line (e.g. consumption). */
  meta?: string;
  tone?: VerticalGaugeTone;
}): TemplateResult | typeof nothing {
  const { percent, primary, secondary, meta } = opts;
  if (
    percent === undefined &&
    !primary &&
    !secondary &&
    !meta
  ) {
    return nothing;
  }

  const tone = opts.tone ?? "ok";
  const clamped =
    percent === undefined || Number.isNaN(percent)
      ? undefined
      : Math.max(0, Math.min(100, percent));

  return html`
    <div class="vgauge tone-${tone}">
      <div
        class="vgauge-bar-wrap"
        aria-hidden=${clamped === undefined ? "true" : "false"}
      >
        ${clamped !== undefined
          ? html`<div class="vgauge-bar" style="height:${clamped}%"></div>`
          : nothing}
      </div>
      <div class="vgauge-text">
        ${primary ? html`<div class="vgauge-primary">${primary}</div>` : nothing}
        ${clamped !== undefined
          ? html`<div class="vgauge-pct">${Math.round(clamped)}%</div>`
          : nothing}
        ${secondary
          ? html`<div class="vgauge-secondary">${secondary}</div>`
          : nothing}
        ${meta ? html`<div class="vgauge-meta">${meta}</div>` : nothing}
      </div>
    </div>
  `;
}
