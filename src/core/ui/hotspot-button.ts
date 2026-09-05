import { html, type TemplateResult } from "lit";

export type HotspotTone = "muted" | "ok" | "danger" | "warn" | "info";

export type HotspotIcon =
  | "lock"
  | "unlock"
  | "engine"
  | "defog"
  | "trunk"
  | "charge"
  | "signal"
  | "hv";

const ICONS: Record<HotspotIcon, TemplateResult> = {
  lock: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 1 1 6 0v3Z"
      />
    </svg>
  `,
  unlock: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a5 5 0 0 0-5 5h2a3 3 0 0 1 6 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Z"
      />
    </svg>
  `,
  engine: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 9V7h4v2h1.5l1-2H17v2h1a2 2 0 0 1 2 2v1h1v2h-1v1a2 2 0 0 1-2 2h-1.5l-1 2H11v-2H8.5L7 17H5v-2H3v-2h2v-1a2 2 0 0 1 2-2h0Zm2 2H7v4h2v-4Zm4 0h-2v4h2v-4Zm4 0h-2v4h2v-4Z"
      />
    </svg>
  `,
  defog: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 18h16v2H4v-2Zm2.5-3.5 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4Zm9 0 1.4-1.4 2.1 2.1 1.4-1.4-2.1-2.1 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4ZM4 4h16v2H4V4Z"
      />
    </svg>
  `,
  trunk: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 14h14l-1.5-5H6.5L5 14Zm-1 2v3h2v-1h12v1h2v-3H4Zm3.5-8h9l.8 2.5H6.7L8.5 8Z"
      />
    </svg>
  `,
  charge: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M11 2h2v5h3l-4 7h3l-5 8v-7H7l4-8V2Z"
      />
    </svg>
  `,
  signal: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-4.2-3.2 1.4 1.4a4 4 0 0 1 5.6 0l1.4-1.4a6 6 0 0 0-8.4 0Zm-2.8-2.8 1.4 1.4a8 8 0 0 1 11.2 0l1.4-1.4a10 10 0 0 0-14 0Z"
      />
    </svg>
  `,
  hv: html`
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.92 2.01C18.72 1.42 18.16 1 17.5 1h-11c-.66 0-1.21.42-1.42 1.01L3 8v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V8l-2.08-5.99ZM6.5 15c-.83 0-1.5-.67-1.5-1.5S5.67 12 6.5 12s1.5.67 1.5 1.5S7.33 15 6.5 15Zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5ZM5 7l1.5-4.5h11L19 7H5Zm8.5 1.5-4 6h2V18l4-6h-2V8.5Z"
      />
    </svg>
  `,
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
      ${ICONS[opts.icon]}
    </button>
  `;
}
