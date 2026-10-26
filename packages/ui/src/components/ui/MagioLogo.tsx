import React from 'react';
import { useOptionalThemeSystem } from '@/contexts/useThemeSystem';
import { useI18n } from '@/lib/i18n';
import { useWaitingPhase } from '@/hooks/useDurationTicker';

interface MagioLogoProps {
  className?: string;
  width?: number;
  height?: number;
  isAnimated?: boolean;
  variant?: 'default' | 'splash';
}

// The Magio mark: the C-spark with its companion spark, the artwork of
// docs/references/badges/magio-logo-light.svg and -dark.svg. One drawing
// serves light and dark; the surrounding theme supplies the colour. The
// startup splash in packages/web/index.html and early-startup.mjs draws the
// same paths, so the logo does not change as startup hands over to React.
const MAGIO_MARK_PATH =
  'M50 8.432 C51.934 34.048 65.952 48.067 91.568 50 C65.952 51.934 51.934 65.952 50 91.568 C48.067 65.952 34.048 51.934 8.432 50 C34.048 48.067 48.067 34.048 50 8.432 Z';
const MAGIO_SPARK_PATH =
  'M82.144 11.427 C82.723 19.113 86.928 23.319 94.614 23.898 C86.928 24.478 82.723 28.682 82.144 36.369 C81.563 28.682 77.358 24.478 69.672 23.898 C77.358 23.319 81.563 19.113 82.144 11.427 Z';

export const MagioLogo: React.FC<MagioLogoProps> = ({
  className = '',
  width = 70,
  height = 70,
  isAnimated = false,
  variant = 'default',
}) => {
  const { t } = useI18n();
  const themeContext = useOptionalThemeSystem();
  // While loading, the glow switches on and off each second on the shared
  // clock. A smooth drop-shadow pulse repainted the logo on every frame.
  const glowing = useWaitingPhase(isAnimated, 2) === 1;

  let isDark = true;
  if (themeContext) {
    isDark = themeContext.currentTheme.metadata.variant !== 'light';
  } else if (typeof window !== 'undefined') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const strokeColor = (() => {
    // Startup stages share the pre-paint palette while the app theme hydrates.
    if (variant === 'splash') {
      return 'var(--splash-stroke, var(--surface-foreground))';
    }
    if (themeContext) {
      return themeContext.currentTheme.colors.surface.foreground;
    }
    if (typeof window !== 'undefined') {
      const fromVars = getComputedStyle(document.documentElement).getPropertyValue('--splash-stroke').trim();
      if (fromVars) {
        return fromVars;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black';
    }
    return isDark ? 'white' : 'black';
  })();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={t('magioLogo.aria.logo')}
    >
      {isAnimated ? (
        <style>{`.mg-logo-glow-on{filter:drop-shadow(0 0 4px var(--mg-glow-color))}@media (prefers-reduced-motion:reduce){.mg-logo-glow-on{filter:none}}`}</style>
      ) : null}
      <g
        className={glowing ? 'mg-logo-glow-on' : undefined}
        style={isAnimated ? ({ '--mg-glow-color': strokeColor } as React.CSSProperties) : undefined}
      >
        <path d={MAGIO_MARK_PATH} fill={strokeColor} />
        <path d={MAGIO_SPARK_PATH} fill={strokeColor} fillOpacity="0.55" />
      </g>
    </svg>
  );
};
