import { html, nothing, type TemplateResult } from "lit";
import {
  fireMoreInfo,
  formatState,
  getNumericState,
} from "../hass";
import type { HomeAssistant } from "../types";

export function renderMetricRow(
  host: HTMLElement,
  hass: HomeAssistant | undefined,
  label: string,
  entityId: string | undefined,
  opts?: { suffix?: string; numeric?: boolean },
): TemplateResult | typeof nothing {
  if (!hass || !entityId || !hass.states[entityId]) {
    return nothing;
  }
  let value = formatState(hass, entityId);
  if (opts?.numeric) {
    const n = getNumericState(hass, entityId);
    if (n === undefined) {
      return nothing;
    }
    value = opts.suffix ? `${n}${opts.suffix}` : String(n);
  }
  return html`
    <button
      type="button"
      class="metric"
      @click=${() => fireMoreInfo(host, entityId)}
    >
      <span class="metric-label">${label}</span>
      <span class="metric-value">${value}</span>
    </button>
  `;
}
