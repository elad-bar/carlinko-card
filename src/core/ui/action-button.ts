import { html, type TemplateResult } from "lit";

export type ActionVariant = "" | "ok" | "danger";

export function renderActionButton(opts: {
  label: string;
  disabled?: boolean;
  variant?: ActionVariant;
  onClick: () => void;
}): TemplateResult {
  const variant = opts.variant || "";
  return html`
    <button
      type="button"
      class="action ${variant}"
      ?disabled=${opts.disabled}
      @click=${opts.onClick}
    >
      ${opts.label}
    </button>
  `;
}
