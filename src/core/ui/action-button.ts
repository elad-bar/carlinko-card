import { html, type TemplateResult } from "lit";

export type ActionVariant = "" | "ok" | "danger";

export function renderActionButton(opts: {
  label: string;
  icon?: TemplateResult;
  disabled?: boolean;
  variant?: ActionVariant;
  onClick: () => void;
}): TemplateResult {
  const variant = opts.variant || "";
  const iconClass = opts.icon ? " icon" : "";
  return html`
    <button
      type="button"
      class="action ${variant}${iconClass}"
      aria-label=${opts.label}
      title=${opts.label}
      ?disabled=${opts.disabled}
      @click=${opts.onClick}
    >
      ${opts.icon ?? opts.label}
    </button>
  `;
}
