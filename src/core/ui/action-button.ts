import { html, nothing, type TemplateResult } from "lit";

export type ActionVariant = "" | "ok" | "danger" | "cool" | "heat";

export function renderActionButton(opts: {
  label: string;
  icon?: TemplateResult;
  /** When true with an icon, show icon + label (not icon-only). */
  showLabel?: boolean;
  disabled?: boolean;
  variant?: ActionVariant;
  /**
   * For `cool` / `heat`: border is always tinted; icon/text tint only when active.
   * Ignored for other variants (those always tint border + icon).
   */
  active?: boolean;
  onClick: () => void;
}): TemplateResult {
  const variant = opts.variant || "";
  const withLabel = Boolean(opts.icon && opts.showLabel);
  const iconOnly = Boolean(opts.icon && !opts.showLabel);
  const active =
    variant === "cool" || variant === "heat" ? Boolean(opts.active) : false;
  const className = [
    "action",
    variant,
    active ? "active" : "",
    iconOnly ? "icon" : "",
    withLabel ? "with-icon" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return html`
    <button
      type="button"
      class=${className}
      aria-label=${opts.label}
      title=${opts.label}
      ?disabled=${opts.disabled}
      @click=${opts.onClick}
    >
      ${opts.icon ?? nothing}${withLabel || !opts.icon ? opts.label : nothing}
    </button>
  `;
}
