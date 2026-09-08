import { html, nothing, type TemplateResult } from "lit";
import {
  fireMoreInfo,
  formatState,
  getNumericState,
  getStateValue,
} from "../hass";
import { entityState } from "../i18n";
import type { EntityDomain, HomeAssistant } from "../types";

export function renderMetricRow(
  host: HTMLElement,
  hass: HomeAssistant | undefined,
  label: string,
  entityId: string | undefined,
  opts?: {
    suffix?: string;
    numeric?: boolean;
    /** Enum sensor: render the translated state label instead of the raw state. */
    stateKey?: { domain: EntityDomain | string; key: string };
  },
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
  } else if (opts?.stateKey) {
    const raw = getStateValue(hass, entityId);
    if (raw && raw !== "unknown" && raw !== "unavailable") {
      value = entityState(hass, opts.stateKey.domain, opts.stateKey.key, raw);
    }
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
