import { html, type TemplateResult } from "lit";
import { renderMdiIcon } from "./mdi-icon";

export type HotspotTone = "muted" | "ok" | "danger" | "warn" | "info";

export type HotspotIcon = "signal" | "hv" | "tyre";

const HOTSPOT_MDI: Record<HotspotIcon, string> = {
  signal: "mdi:car-wireless",
  hv: "mdi:car-electric",
  tyre: "mdi:tire",
};

export function renderHotspotButton(opts: {
  icon: HotspotIcon;
  label: string;
  tone?: HotspotTone;
  disabled?: boolean;
  onClick: () => void;
}): TemplateResult {
  const tone = opts.tone ?? "muted";
  return html`
    <button
      type="button"
      class="hotspot tone-${tone}"
      aria-label=${opts.label}
      title=${opts.label}
      ?disabled=${opts.disabled}
      @click=${opts.onClick}
    >
      ${renderMdiIcon(HOTSPOT_MDI[opts.icon])}
    </button>
  `;
}
