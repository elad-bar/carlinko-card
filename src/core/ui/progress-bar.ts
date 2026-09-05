import { html, nothing, type TemplateResult } from "lit";

export function renderProgressBar(
  percent: number | undefined,
  title?: string,
): TemplateResult | typeof nothing {
  if (percent === undefined || Number.isNaN(percent)) {
    return nothing;
  }
  const clamped = Math.max(0, Math.min(100, percent));
  return html`
    <div class="bar-wrap" title=${title ?? `${clamped}%`}>
      <div class="bar" style="width:${clamped}%"></div>
    </div>
  `;
}
