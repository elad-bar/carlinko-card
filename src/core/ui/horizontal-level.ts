import { html, nothing, type TemplateResult } from "lit";

export type HorizontalLevelTone = "ok" | "info";

export function renderHorizontalLevel(opts: {
  percent: number | undefined;
  /** Bar title (e.g. SOC / Fuel) — shown at the top. */
  primary?: string;
  /** Remaining range — shown below the bar. */
  secondary?: string;
  /** Extra line (e.g. consumption). */
  meta?: string;
  tone?: HorizontalLevelTone;
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
    <div class="hlevel tone-${tone}">
      ${primary
        ? html`<div class="hlevel-primary">${primary}</div>`
        : nothing}
      ${clamped !== undefined
        ? html`<div class="hlevel-pct">${Math.round(clamped)}%</div>`
        : nothing}
      <div
        class="hlevel-bar-wrap"
        aria-hidden=${clamped === undefined ? "true" : "false"}
      >
        ${clamped !== undefined
          ? html`<div class="hlevel-bar" style="width:${clamped}%"></div>`
          : nothing}
      </div>
      ${secondary || meta
        ? html`<div class="hlevel-details">
            ${secondary
              ? html`<span class="hlevel-secondary">${secondary}</span>`
              : nothing}
            ${meta
              ? html`<span class="hlevel-meta">${meta}</span>`
              : nothing}
          </div>`
        : nothing}
    </div>
  `;
}
