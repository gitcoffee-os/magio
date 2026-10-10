import { GUEST_SCROLLBAR_CSS } from '../scrollbar-style.ts';

/** Host CSS variable → `--mg-*` alias written by `theme.ts`. */
const OC_ALIAS = {
  'surface-background': 'bg',
  'surface-elevated': 'elevated',
  'surface-elevated-foreground': 'elevated-fg',
  'surface-foreground': 'fg',
  'surface-muted-foreground': 'muted',
  'surface-muted': 'muted-surface',
  'surface-subtle': 'subtle',
  'interactive-border': 'border',
  'interactive-hover': 'hover',
  'interactive-active': 'active',
  'interactive-selection': 'selection',
  'interactive-selection-foreground': 'selection-fg',
  'interactive-focus-ring': 'focus',
  'primary': 'primary',
  'primary-foreground': 'primary-fg',
  'primary-text': 'primary-text',
  'success-text': 'success-text',
  'warning-text': 'warning-text',
  'error-text': 'error-text',
  'info-text': 'info-text',
  'status-success': 'success',
  'status-warning': 'warning',
  'status-error': 'error',
  'status-info': 'info',
  'font-sans': 'font',
  'font-mono': 'mono',
  'radius': 'radius',
} as const;

const v = (name: keyof typeof OC_ALIAS, fallback: string): string => (
  `var(--${name}, var(--mg-${OC_ALIAS[name]}, ${fallback}))`
);

const bg = v('surface-background', 'transparent');
const elevated = v('surface-elevated', 'transparent');
const elevatedFg = v('surface-elevated-foreground', 'inherit');
const fg = v('surface-foreground', 'inherit');
const muted = v('surface-muted-foreground', 'gray');
const secondary = v('surface-muted', 'transparent');
const border = v('interactive-border', 'currentColor');
const hover = v('interactive-hover', 'transparent');
const active = v('interactive-active', 'transparent');
const selection = v('interactive-selection', 'transparent');
const selectionFg = v('interactive-selection-foreground', 'inherit');
const focus = v('interactive-focus-ring', 'currentColor');
const primary = v('primary', 'currentColor');
const primaryText = v('primary-text', 'inherit');
const errorText = v('error-text', 'inherit');
const font = v('font-sans', 'inherit');
const mono = v('font-mono', 'monospace');
const radius = v('radius', '9px');

const mix = (color: string, pct: number, base = 'transparent'): string => (
  `color-mix(in srgb, ${color} ${pct}%, ${base})`
);

const focusRing = `box-shadow: 0 0 0 2px ${focus};`;

const tone = (name: 'success' | 'warning' | 'error' | 'info'): string => {
  const color = v(`status-${name}`, 'currentColor');
  return `
.mg-sdk[data-tone="${name}"], .mg-sdk [data-tone="${name}"] { --mg-sdk-tone: ${color}; --mg-sdk-tone-text: ${v(`${name}-text`, 'inherit')}; }`;
};

export const UI_CSS = `
${GUEST_SCROLLBAR_CSS}
.mg-sdk { box-sizing: border-box; color: ${fg}; font-family: ${font}; font-size: 0.875rem; line-height: 1.45; }
.mg-sdk *, .mg-sdk *::before, .mg-sdk *::after { box-sizing: border-box; }
/* :where() keeps the reset at zero specificity so every primitive class below overrides it. */
:where(.mg-sdk) :where(button, input, textarea), :where(button.mg-sdk, input.mg-sdk, textarea.mg-sdk) { font: inherit; color: inherit; margin: 0; }
:where(.mg-sdk) :where(button), :where(button.mg-sdk) { cursor: pointer; background: none; border: 0; padding: 0; }
.mg-sdk button:disabled, button.mg-sdk:disabled, .mg-sdk[aria-disabled="true"], .mg-sdk [aria-disabled="true"] { opacity: .5; pointer-events: none; }
.mg-sdk :focus-visible { outline: none; ${focusRing} }
.mg-sdk-mono { font-family: ${mono}; }
.mg-sdk-muted { color: ${muted}; }
${tone('success')}${tone('warning')}${tone('error')}${tone('info')}
.mg-sdk[data-tone="primary"], .mg-sdk [data-tone="primary"] { --mg-sdk-tone: ${primary}; --mg-sdk-tone-text: ${primaryText}; }

.mg-sdk-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 36px; padding: 0 14px; border: 1px solid transparent; border-radius: ${radius}; font-size: 0.875rem; font-weight: 500; line-height: 1; white-space: nowrap; transition: background 150ms ease-out, color 150ms ease-out; }
.mg-sdk-btn[data-size="sm"] { height: 32px; padding: 0 10px; font-size: 0.8125rem; }
.mg-sdk-btn[data-size="xs"] { height: 24px; padding: 0 8px; font-size: 0.75rem; border-radius: 6px; }
.mg-sdk-btn[data-variant="default"] { color: ${primaryText}; background: ${mix(primary, 10, bg)}; border-color: ${mix(primary, 12)}; }
.mg-sdk-btn[data-variant="default"]:hover { background: ${mix(primary, 16, bg)}; }
.mg-sdk-btn[data-variant="default"]:active { background: ${mix(primary, 22, bg)}; }
.mg-sdk-btn[data-variant="secondary"] { background: ${secondary}; color: var(--mg-fg); }
.mg-sdk-btn[data-variant="secondary"]:hover { background-image: linear-gradient(${hover}, ${hover}); }
.mg-sdk-btn[data-variant="secondary"]:active { background-image: linear-gradient(${active}, ${active}); }
.mg-sdk-btn[data-variant="outline"] { background: ${elevated}; color: ${elevatedFg}; border-color: ${border}; }
.mg-sdk-btn[data-variant="outline"]:hover { background-image: linear-gradient(${hover}, ${hover}); }
.mg-sdk-btn[data-variant="outline"]:active { background-image: linear-gradient(${active}, ${active}); }
.mg-sdk-btn[data-variant="ghost"] { background: transparent; }
.mg-sdk-btn[data-variant="ghost"]:hover { background: ${hover}; }
.mg-sdk-btn[data-variant="ghost"]:active { background: ${active}; }
.mg-sdk-btn[data-variant="destructive"] { --mg-sdk-tone: ${v('status-error', 'red')}; color: ${errorText}; background: ${mix('var(--mg-sdk-tone)', 7, bg)}; border-color: ${mix('var(--mg-sdk-tone)', 12)}; }
.mg-sdk-btn[data-variant="destructive"]:hover { background: ${mix('var(--mg-sdk-tone)', 9, bg)}; }
.mg-sdk-btn[data-variant="destructive"]:active { background: ${mix('var(--mg-sdk-tone)', 11, bg)}; }
.mg-sdk-btn[data-loading="true"] { opacity: .5; pointer-events: none; }
.mg-sdk-btn > .mg-sdk-spinner-ring { width: 14px; height: 14px; }

.mg-sdk-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-field-label { font-size: 0.8125rem; font-weight: 500; }
.mg-sdk-field-note { font-size: 0.75rem; color: ${muted}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-field-note { color: ${errorText}; }
.mg-sdk-input { display: block; width: 100%; min-width: 0; height: 36px; padding: 0 12px; border: 0; border-radius: ${radius}; background: ${elevated}; color: ${elevatedFg}; font-size: 0.875rem; line-height: 1.45; appearance: none; box-shadow: inset 0 0 0 1px ${mix(border, 60)}; transition: background 150ms ease-out, box-shadow 150ms ease-out; }
textarea.mg-sdk-input { height: auto; padding: 8px 12px; resize: vertical; }
.mg-sdk-input::placeholder { color: ${muted}; }
.mg-sdk-input:hover:not(:focus) { background-image: linear-gradient(${hover}, ${hover}); }
.mg-sdk-input:focus, .mg-sdk-input:focus-visible { box-shadow: inset 0 0 0 2px ${focus}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input { box-shadow: inset 0 0 0 1px ${v('status-error', 'red')}; }
.mg-sdk-field[data-invalid="true"] .mg-sdk-input:focus { box-shadow: inset 0 0 0 2px ${v('status-error', 'red')}; }
.mg-sdk-input[data-mono="true"] { font-family: ${mono}; }

.mg-sdk-search { position: relative; min-width: 0; }
.mg-sdk-search .mg-sdk-input { padding-left: 34px; padding-right: 34px; }
.mg-sdk-search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: ${muted}; pointer-events: none; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-icon { color: ${primary}; }
.mg-sdk-search-clear { position: absolute; right: 6px; top: 50%; transform: translateY(-50%); display: none; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; color: ${muted}; }
.mg-sdk-search[data-active="true"] .mg-sdk-search-clear { display: inline-flex; }
.mg-sdk-search-clear:hover { background: ${hover}; color: ${fg}; }

.mg-sdk-select { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-trigger { display: inline-flex; align-items: center; gap: 6px; width: 100%; min-width: 0; height: 32px; padding: 0 8px 0 10px; border: 1px solid ${border}; border-radius: 6px; background: ${elevated}; color: ${elevatedFg}; font-size: 0.8125rem; text-align: left; transition: background 150ms ease-out; }
.mg-sdk-trigger:hover { background-image: linear-gradient(${hover}, ${hover}); }
.mg-sdk-trigger[aria-expanded="true"] { background-image: linear-gradient(${active}, ${active}); }
.mg-sdk-trigger-value { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-trigger-value[data-empty="true"] { color: ${muted}; }
.mg-sdk-trigger-chevron { flex: 0 0 auto; color: ${muted}; }
.mg-sdk-popup { --surface-foreground: ${elevatedFg}; position: fixed; z-index: 50; display: flex; flex-direction: column; gap: 2px; min-width: 160px; max-width: calc(100vw - 16px); max-height: min(320px, calc(100vh - 16px)); overflow: auto; padding: 4px; border: 1px solid ${mix(border, 60)}; border-radius: 12px; background: ${elevated}; color: ${elevatedFg}; box-shadow: 0 8px 24px ${mix(fg, 12)}; }
.mg-sdk-popup-search { flex: 0 0 auto; padding: 2px 2px 4px; }
.mg-sdk-popup-search .mg-sdk-input { height: 32px; font-size: 0.8125rem; }
.mg-sdk-option { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 8px; font-size: 0.8125rem; text-align: left; }
.mg-sdk-option[data-active="true"] { background: ${hover}; }
.mg-sdk-option[aria-selected="true"] { background: ${selection}; color: ${selectionFg}; }
.mg-sdk-option[data-destructive="true"] { color: ${errorText}; }
.mg-sdk-option[data-destructive="true"][data-active="true"] { background: ${mix(v('status-error', 'red'), 10)}; }
.mg-sdk-option-label { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-option-hint { flex: 0 0 auto; font-size: 0.75rem; color: ${muted}; }
.mg-sdk-option-check { flex: 0 0 auto; width: 12px; }
.mg-sdk-popup-empty { padding: 8px; font-size: 0.8125rem; color: ${muted}; }

.mg-sdk-check { display: inline-flex; align-items: flex-start; gap: 8px; width: 100%; text-align: left; }
.mg-sdk-check-box { flex: 0 0 auto; display: inline-flex; align-items: center; justify-content: center; width: 14px; height: 14px; margin-top: 3px; border: 1px solid ${border}; border-radius: 4px; color: ${primary}; transition: border-color 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box { border-color: ${mix(primary, 65, border)}; }
.mg-sdk-check-box > svg { display: none; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-box > svg { display: block; }
.mg-sdk-check-thumb { flex: 0 0 auto; position: relative; width: 36px; height: 20px; border-radius: 9999px; background: ${border}; transition: background 150ms ease-out; }
.mg-sdk-check-thumb::after { content: ""; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; border-radius: 9999px; background: ${bg}; transition: transform 150ms ease-out; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb { background: ${primary}; }
.mg-sdk-check[aria-checked="true"] .mg-sdk-check-thumb::after { transform: translateX(16px); }
.mg-sdk-check:focus-visible { box-shadow: none; }
.mg-sdk-check:focus-visible .mg-sdk-check-box, .mg-sdk-check:focus-visible .mg-sdk-check-thumb { ${focusRing} }
.mg-sdk-check-text { display: flex; flex-direction: column; min-width: 0; }
.mg-sdk-check-label { font-size: 0.875rem; }
.mg-sdk-check-desc { font-size: 0.75rem; color: ${muted}; }

.mg-sdk-tabs { display: inline-flex; gap: 2px; padding: 2px; border-radius: 10px; max-width: 100%; overflow: auto; }
.mg-sdk-tabs[data-track="true"] { background: ${mix(fg, 4)}; }
.mg-sdk-tab { display: inline-flex; align-items: center; gap: 6px; height: 28px; padding: 0 10px; border: 1px solid transparent; border-radius: 8px; font-size: 0.8125rem; font-weight: 500; color: ${muted}; white-space: nowrap; transition: color 150ms ease-out, background 150ms ease-out; }
.mg-sdk-tab:hover { color: ${fg}; }
.mg-sdk-tab[aria-selected="true"] { color: ${selectionFg}; background: ${selection}; border-color: ${border}; }
.mg-sdk-tab-count { font-size: 0.75rem; font-variant-numeric: tabular-nums; color: ${muted}; }

.mg-sdk-badge { display: inline-flex; align-items: center; padding: 1px 6px; border-radius: 9999px; font-size: 11px; font-weight: 500; line-height: 16px; white-space: nowrap; background: ${hover}; color: ${muted}; }
.mg-sdk-badge[data-tone] { color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); background: ${mix('var(--mg-sdk-tone)', 15)}; }

.mg-sdk-list { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.mg-sdk-row { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border-radius: 6px; text-align: left; transition: background 120ms ease-out; }
.mg-sdk-row:hover, .mg-sdk-row[data-active="true"] { background: ${hover}; }
.mg-sdk-row[aria-selected="true"] { background: ${selection}; color: ${selectionFg}; }
.mg-sdk-row-lead { flex: 0 0 auto; width: 64px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: ${mono}; font-size: 0.75rem; color: ${muted}; }
.mg-sdk-row-main { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; }
.mg-sdk-row-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mg-sdk-row-sub { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.75rem; color: ${muted}; }
.mg-sdk-row-meta { flex: 0 0 auto; font-size: 0.75rem; font-variant-numeric: tabular-nums; color: ${muted}; }
.mg-sdk-row[aria-selected="true"] .mg-sdk-row-lead, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-sub, .mg-sdk-row[aria-selected="true"] .mg-sdk-row-meta { color: inherit; opacity: .75; }
.mg-sdk-list-empty { padding: 16px 8px; text-align: center; font-size: 0.8125rem; color: ${muted}; }

.mg-sdk-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 40px 16px; text-align: center; }
.mg-sdk-empty-title { margin: 0; font-size: 0.8125rem; font-weight: 600; }
.mg-sdk-empty-body { margin: 0; max-width: 32rem; font-size: 0.8125rem; color: ${muted}; }
.mg-sdk-empty-action { margin-top: 12px; }

@keyframes mg-sdk-spin { to { transform: rotate(360deg); } }
.mg-sdk-spinner { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; color: ${muted}; }
.mg-sdk-spinner-ring { width: 16px; height: 16px; border: 2px solid ${border}; border-top-color: ${primary}; border-radius: 9999px; animation: mg-sdk-spin .8s linear infinite; }
.mg-sdk-spinner[data-size="sm"] .mg-sdk-spinner-ring { width: 12px; height: 12px; }

.mg-sdk-banner { display: flex; align-items: flex-start; gap: 12px; padding: 8px 12px; border: 1px solid ${mix('var(--mg-sdk-tone)', 40)}; border-radius: 8px; background: ${mix('var(--mg-sdk-tone)', 10)}; }
.mg-sdk-banner-text { flex: 1 1 auto; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.mg-sdk-banner-title { font-size: 0.8125rem; font-weight: 500; color: var(--mg-sdk-tone-text, var(--mg-sdk-tone)); }
.mg-sdk-banner-body { font-size: 0.8125rem; color: ${muted}; }
.mg-sdk-banner-action { flex: 0 0 auto; }

.mg-sdk-separator { display: flex; align-items: center; gap: 8px; width: 100%; margin: 8px 0; font-size: 0.75rem; color: ${muted}; }
.mg-sdk-separator::before, .mg-sdk-separator::after { content: ""; flex: 1 1 auto; height: 1px; background: ${mix(border, 40)}; }
.mg-sdk-separator[data-labeled="false"]::after { display: none; }
.mg-sdk-popup > .mg-sdk-separator { margin: 4px 0; }

.mg-sdk-progress { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.mg-sdk-progress-label { display: flex; justify-content: space-between; font-size: 0.75rem; color: ${muted}; font-variant-numeric: tabular-nums; }
.mg-sdk-progress-track { height: 6px; border-radius: 9999px; background: ${border}; overflow: hidden; }
.mg-sdk-progress-fill { height: 100%; border-radius: 9999px; background: var(--mg-sdk-tone, ${primary}); transform-origin: left; transition: transform 200ms ease-out; }

.mg-sdk-menu { position: relative; display: inline-flex; }

.mg-sdk-text { white-space: pre-wrap; overflow-wrap: anywhere; }
.mg-sdk-text a { color: ${primaryText}; text-decoration: underline; text-underline-offset: 2px; }
.mg-sdk-text img { display: block; max-width: 100%; margin: 8px 0; border-radius: 8px; border: 1px solid ${mix(border, 60)}; }
`;
