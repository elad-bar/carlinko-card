import { css } from "lit";

/** Shared CSS variables and card chrome for CarLinko cards. */
export const sharedHostStyles = css`
  :host {
    display: block;
    --ck-accent: #0d9488;
    --ck-ok: #16a34a;
    --ck-warn: #d97706;
    --ck-info: #2563eb;
    --ck-bg: var(--card-background-color, #fff);
    --ck-text: var(--primary-text-color, #1a1a1a);
    --ck-muted: var(--secondary-text-color, #667);
    --ck-border: var(--divider-color, #e2e8f0);
    --ck-danger: #b91c1c;
  }
  ha-card {
    background: var(--ck-bg);
    color: var(--ck-text);
    overflow: hidden;
  }
  .header {
    font-size: 1.1rem;
    font-weight: 600;
    padding: 12px 16px 0;
  }
  .pad {
    padding: 16px;
  }
  .body-pad {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;
  }
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--ck-border);
  }
`;

export const metricStyles = css`
  .metric {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    border: none;
    background: transparent;
    color: inherit;
    padding: 4px 0;
    cursor: pointer;
    font: inherit;
    text-align: left;
    width: 100%;
  }
  .metric-label {
    color: var(--ck-muted);
    font-size: 0.85rem;
  }
  .metric-value {
    font-weight: 600;
  }
`;

export const chipStyles = css`
  .chip {
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 6px;
    background: color-mix(in srgb, var(--ck-accent) 12%, transparent);
    border: 1px solid var(--ck-border);
  }
  .chip.ok {
    border-color: var(--ck-accent);
  }
`;

export const actionStyles = css`
  .action {
    border: 1px solid var(--ck-border);
    background: var(--ck-bg);
    color: var(--ck-text);
    border-radius: 8px;
    padding: 8px 12px;
    font: inherit;
    font-size: 0.85rem;
    cursor: pointer;
  }
  .action.icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    min-width: 2.5rem;
    padding: 0;
  }
  .action.icon svg {
    width: 1.25rem;
    height: 1.25rem;
    display: block;
  }
  .action:hover:not(:disabled) {
    border-color: var(--ck-accent);
  }
  .action:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .action.ok {
    border-color: var(--ck-accent);
    color: var(--ck-accent);
  }
  .action.danger {
    border-color: var(--ck-danger);
    color: var(--ck-danger);
  }
`;
export const progressStyles = css`
  .bar-wrap {
    height: 6px;
    background: var(--ck-border);
    border-radius: 999px;
    overflow: hidden;
    margin: 2px 0 8px;
  }
  .bar {
    height: 100%;
    background: var(--ck-accent);
    border-radius: 999px;
  }
`;

export const hotspotStyles = css`
  .hotspot {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--ck-border);
    background: color-mix(in srgb, var(--ck-bg) 88%, transparent);
    color: var(--ck-muted);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    cursor: pointer;
    box-shadow: 0 0 0 0 transparent;
    backdrop-filter: blur(2px);
  }
  .hotspot svg {
    width: 22px;
    height: 22px;
    display: block;
  }
  .hotspot:hover:not(:disabled) {
    border-color: currentColor;
  }
  .hotspot:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .hotspot.tone-muted {
    color: var(--ck-muted);
    border-color: var(--ck-border);
  }
  .hotspot.tone-ok {
    color: var(--ck-ok);
    border-color: var(--ck-ok);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-ok) 45%, transparent);
  }
  .hotspot.tone-danger {
    color: var(--ck-danger);
    border-color: var(--ck-danger);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-danger) 45%, transparent);
  }
  .hotspot.tone-warn {
    color: var(--ck-warn);
    border-color: var(--ck-warn);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-warn) 45%, transparent);
  }
  .hotspot.tone-info {
    color: var(--ck-info);
    border-color: var(--ck-info);
    box-shadow: 0 0 12px color-mix(in srgb, var(--ck-info) 45%, transparent);
  }
`;

export const verticalGaugeStyles = css`
  .vgauge {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    min-height: 120px;
  }
  .vgauge-bar-wrap {
    width: 14px;
    height: 120px;
    border-radius: 8px;
    background: var(--ck-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex-shrink: 0;
  }
  .vgauge-bar {
    width: 100%;
    border-radius: 8px 8px 0 0;
    background: var(--ck-ok);
    transition: height 0.2s ease;
  }
  .vgauge.tone-info .vgauge-bar {
    background: var(--ck-info);
  }
  .vgauge.tone-info .vgauge-pct {
    color: var(--ck-info);
  }
  .vgauge.tone-ok .vgauge-pct {
    color: var(--ck-ok);
  }
  .vgauge-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
    padding-top: 0;
  }
  .vgauge-primary {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--ck-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.2;
  }
  .vgauge-pct {
    font-size: 1.35rem;
    font-weight: 700;
    line-height: 1.15;
  }
  .vgauge-secondary {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--ck-text);
  }
  .vgauge-meta {
    font-size: 0.75rem;
    color: var(--ck-muted);
    margin-top: 2px;
  }
`;
