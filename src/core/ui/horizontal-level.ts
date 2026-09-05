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
  onPercentClick?: () => void;
  onSecondaryClick?: () => void;
  onMetaClick?: () => void;
}): TemplateResult | typeof nothing {
  const {
    percent,
    primary,
    secondary,
    meta,
    onPercentClick,
    onSecondaryClick,
    onMetaClick,
  } = opts;
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

  const pctLabel =
    clamped !== undefined ? `${Math.round(clamped)}%` : undefined;

  const barWrap = html`
    <div
      class="hlevel-bar-wrap"
      aria-hidden=${clamped === undefined ? "true" : "false"}
    >
      ${clamped !== undefined
        ? html`<div class="hlevel-bar" style="width:${clamped}%"></div>`
        : nothing}
    </div>
  `;

  const percentBlock =
    onPercentClick && (pctLabel !== undefined || clamped !== undefined)
      ? html`<button
          type="button"
          class="hlevel-percent"
          aria-label=${pctLabel ?? primary ?? "level"}
          @click=${onPercentClick}
        >
          ${pctLabel !== undefined
            ? html`<div class="hlevel-pct">${pctLabel}</div>`
            : nothing}
          ${barWrap}
        </button>`
      : html`
          ${pctLabel !== undefined
            ? html`<div class="hlevel-pct">${pctLabel}</div>`
            : nothing}
          ${barWrap}
        `;

  const secondaryEl = secondary
    ? onSecondaryClick
      ? html`<button
          type="button"
          class="hlevel-secondary"
          @click=${onSecondaryClick}
        >
          ${secondary}
        </button>`
      : html`<span class="hlevel-secondary">${secondary}</span>`
    : nothing;

  const metaEl = meta
    ? onMetaClick
      ? html`<button type="button" class="hlevel-meta" @click=${onMetaClick}>
          ${meta}
        </button>`
      : html`<span class="hlevel-meta">${meta}</span>`
    : nothing;

  return html`
    <div class="hlevel tone-${tone}">
      ${primary
        ? html`<div class="hlevel-primary">${primary}</div>`
        : nothing}
      ${percentBlock}
      ${secondary || meta
        ? html`<div class="hlevel-details">${secondaryEl}${metaEl}</div>`
        : nothing}
    </div>
  `;
}
