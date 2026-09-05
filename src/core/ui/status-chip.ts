import { html, nothing, type TemplateResult } from "lit";

export function renderStatusChip(
  text: string | undefined,
  opts?: { ok?: boolean },
): TemplateResult | typeof nothing {
  if (!text) {
    return nothing;
  }
  return html`<span class="chip ${opts?.ok ? "ok" : ""}">${text}</span>`;
}
