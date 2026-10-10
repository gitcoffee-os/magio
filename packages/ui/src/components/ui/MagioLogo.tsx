import React, { useMemo } from 'react';
import { useOptionalThemeSystem } from '@/contexts/useThemeSystem';
import { useI18n } from '@/lib/i18n';

interface MagioLogoProps {
  className?: string;
  width?: number;
  height?: number;
  isAnimated?: boolean;
  variant?: 'default' | 'splash';
}

// The Magio mark: a four-point spark with a smaller companion spark.
// Both paths are already resolved into the 0..100 logo viewBox, and the main
// spark spans 8.432..91.568 on both axes — the same bounding box the previous
// mark filled — so layouts sized against the old artwork keep their weight.
// The companion sits just outside that box, as it does in the app icon.
const SPARK_PATH =
  'M50 8.432 C51.934 34.048, 65.952 48.067, 91.568 50 ' +
  'C65.952 51.934, 51.934 65.952, 50 91.568 ' +
  'C48.067 65.952, 34.048 51.934, 8.432 50 ' +
  'C34.048 48.067, 48.067 34.048, 50 8.432 Z';

const COMPANION_SPARK_PATH =
  'M82.144 11.427 C82.723 19.113, 86.928 23.319, 94.614 23.898 ' +
  'C86.928 24.478, 82.723 28.682, 82.144 36.369 ' +
  'C81.563 28.682, 77.358 24.478, 69.672 23.898 ' +
  'C77.358 23.319, 81.563 19.113, 82.144 11.427 Z';

export const MagioLogo: React.FC<MagioLogoProps> = ({
  className = '',
  width = 70,
  height = 70,
  isAnimated = false,
  variant = 'default',
}) => {
  const { t } = useI18n();
  const themeContext = useOptionalThemeSystem();

  let isDark = true;
  if (themeContext) {
    isDark = themeContext.currentTheme.metadata.variant !== 'light';
  } else if (typeof window !== 'undefined') {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const strokeColor = useMemo(() => {
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
    }
    return isDark ? 'white' : 'black';
  }, [themeContext, isDark, variant]);

  const supportsColorMix = useMemo(() => {
    if (typeof window === 'undefined' || typeof CSS === 'undefined' || typeof CSS.supports !== 'function') {
      return false;
    }
    return CSS.supports('color', 'color-mix(in srgb, white 50%, transparent)');
  }, []);

  const fillColor = useMemo(() => {
    if (variant === 'splash') {
      return `var(--splash-face-fill, color-mix(in srgb, ${strokeColor} 15%, transparent))`;
    }
    if (themeContext) {
      if (supportsColorMix) {
        return `color-mix(in srgb, ${strokeColor} 15%, transparent)`;
      }
      return isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
    }
    if (typeof window !== 'undefined') {
      const fromVars = getComputedStyle(document.documentElement).getPropertyValue('--splash-face-fill').trim();
      if (fromVars) {
        return fromVars;
      }
    }
    return isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
  }, [themeContext, supportsColorMix, strokeColor, isDark, variant]);

  const cellHighlightColor = useMemo(() => {
    if (variant === 'splash') {
      return `var(--splash-cell-fill, color-mix(in srgb, ${strokeColor} 35%, transparent))`;
    }
    if (themeContext) {
      if (supportsColorMix) {
        return `color-mix(in srgb, ${strokeColor} 35%, transparent)`;
      }
      return isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
    }
    if (typeof window !== 'undefined') {
      const fromVars = getComputedStyle(document.documentElement).getPropertyValue('--splash-cell-fill').trim();
      if (fromVars) {
        return fromVars;
      }
    }
    return isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.4)';
  }, [themeContext, supportsColorMix, strokeColor, isDark, variant]);

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
        <style>{`@keyframes mg-logo-glow{0%,100%{filter:drop-shadow(0 0 0 transparent)}50%{filter:drop-shadow(0 0 4px var(--mg-glow-color))}}.mg-logo-glow{animation:mg-logo-glow 1.8s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.mg-logo-glow{animation:none}}`}</style>
      ) : null}

      {/* Main spark: tinted body with a theme-coloured edge, matching the
          weight the previous mark had on this surface. */}
      <g
        className={isAnimated ? 'mg-logo-glow' : undefined}
        style={isAnimated ? ({ '--mg-glow-color': strokeColor } as React.CSSProperties) : undefined}
      >
        <path
          d={SPARK_PATH}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* Companion spark, carried over from the app icon. */}
      <path d={COMPANION_SPARK_PATH} fill={cellHighlightColor} />
    </svg>
  );
};
