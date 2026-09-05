import { html, type TemplateResult } from "lit";

/** Home Assistant MDI icon (`mdi:…`) via `ha-icon`. */
export function renderMdiIcon(icon: string): TemplateResult {
  return html`<ha-icon .icon=${icon}></ha-icon>`;
}
