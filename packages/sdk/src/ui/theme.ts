import type { GuestHostSurface, HostTheme } from '../contract.ts';

export type ThemeRoot = {
  style: {
    colorScheme: string;
    setProperty: (name: string, value: string) => void;
  };
  dataset?: {
    mgSurface?: string;
    mgTheme?: string;
  };
};

const TOKEN_VARS = [
  ['--mg-bg', 'background'],
  ['--mg-elevated', 'elevated'],
  ['--mg-fg', 'foreground'],
  ['--mg-muted', 'muted'],
  ['--mg-subtle', 'subtle'],
  ['--mg-border', 'border'],
  ['--mg-hover', 'hover'],
  ['--mg-selection', 'selection'],
  ['--mg-focus', 'focus'],
  ['--mg-primary', 'primary'],
  ['--mg-muted-surface', 'mutedSurface'],
  ['--mg-elevated-fg', 'elevatedForeground'],
  ['--mg-active', 'active'],
  ['--mg-selection-fg', 'selectionForeground'],
  ['--mg-primary-fg', 'primaryForeground'],
  ['--mg-primary-text', 'primaryText'],
  ['--mg-success-text', 'successText'],
  ['--mg-warning-text', 'warningText'],
  ['--mg-error-text', 'errorText'],
  ['--mg-info-text', 'infoText'],
  ['--mg-success', 'success'],
  ['--mg-warning', 'warning'],
  ['--mg-error', 'error'],
  ['--mg-info', 'info'],
  ['--mg-font', 'font'],
  ['--mg-mono', 'mono'],
  ['--mg-radius', 'radius'],
  ['--surface-background', 'background'],
  ['--surface-elevated', 'elevated'],
  ['--surface-foreground', 'foreground'],
  ['--surface-muted-foreground', 'muted'],
  ['--surface-subtle', 'subtle'],
  ['--interactive-border', 'border'],
  ['--interactive-hover', 'hover'],
  ['--interactive-selection', 'selection'],
  ['--interactive-focus-ring', 'focus'],
  ['--primary', 'primary'],
  ['--surface-muted', 'mutedSurface'],
  ['--surface-elevated-foreground', 'elevatedForeground'],
  ['--interactive-active', 'active'],
  ['--interactive-selection-foreground', 'selectionForeground'],
  ['--primary-foreground', 'primaryForeground'],
  ['--primary-text', 'primaryText'],
  ['--success-text', 'successText'],
  ['--warning-text', 'warningText'],
  ['--error-text', 'errorText'],
  ['--info-text', 'infoText'],
  ['--status-success', 'success'],
  ['--status-warning', 'warning'],
  ['--status-error', 'error'],
  ['--status-info', 'info'],
  ['--font-sans', 'font'],
  ['--font-mono', 'mono'],
  ['--radius', 'radius'],
] as const;

const SYNTAX_TOKEN_VARS = [
  ['--mg-syntax-keyword', '--syntax-keyword', 'syntaxKeyword'],
  ['--mg-syntax-string', '--syntax-string', 'syntaxString'],
  ['--mg-syntax-number', '--syntax-number', 'syntaxNumber'],
  ['--mg-syntax-function', '--syntax-function', 'syntaxFunction'],
  ['--mg-syntax-type', '--syntax-type', 'syntaxType'],
  ['--mg-syntax-comment', '--syntax-comment', 'syntaxComment'],
  ['--mg-syntax-variable', '--syntax-variable', 'syntaxVariable'],
  ['--mg-syntax-operator', '--syntax-operator', 'syntaxOperator'],
] as const;

/**
 * Paint the host theme onto the iframe root. Guest chrome reads these
 * variables, and the root itself gets the host font and text colour so plain
 * DOM the guest draws outside the kit (a `<pre>`, a `<p>`) inherits them
 * instead of the browser's serif default.
 */
export const applyHostTheme = (theme: HostTheme, root: ThemeRoot): void => {
  root.style.colorScheme = theme.mode;
  for (const [name, key] of TOKEN_VARS) {
    root.style.setProperty(name, theme.tokens[key]);
  }
  for (const [alias, hostName, key] of SYNTAX_TOKEN_VARS) {
    const value = theme.tokens[key] ?? '';
    root.style.setProperty(alias, value);
    root.style.setProperty(hostName, value);
  }
  root.style.setProperty('font-family', theme.tokens.font);
  root.style.setProperty('font-size', '0.875rem');
  root.style.setProperty('line-height', '1.45');
  root.style.setProperty('color', theme.tokens.foreground);
};

export const applyHostReady = (
  ctx: { theme: HostTheme; surface: GuestHostSurface },
  root: ThemeRoot,
): void => {
  applyHostTheme(ctx.theme, root);
  if (root.dataset) {
    root.dataset.mgSurface = ctx.surface;
    root.dataset.mgTheme = ctx.theme.mode;
  }
};
