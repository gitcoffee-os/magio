import { getReadableThemeColors } from '@/lib/theme/readableColors';
import type { Theme } from '@/types/theme';

/**
 * What an HTML page an agent draws (`message/parts/htmlRender.ts`) and a UI
 * block (`uiBlocks/UiBlock.tsx`) show alike: chart series colours, badges and
 * their tones, legend dots, bars on their track, and boxes. Both read this one
 * module, so a chart or a badge looks the same drawn either way and a change
 * lands in both at once. A page gets the variables in its bootstrap and the CSS
 * in its kit; a block sets the variables on its root and the CSS is added to
 * the document once.
 */

/**
 * Chart series after the accent, the same in every theme. A theme's syntax
 * colors were used here first, but they are picked for reading code: in the
 * default theme they made near-twins (the accent orange beside the string
 * salmon, two teals, two greens), and the first two series of almost every
 * chart blurred together. These hues stay apart from each other and from any
 * accent; the light set is darker so it holds on a light background.
 */
const CHART_SERIES = {
    dark: ['#60a5fa', '#2dd4bf', '#a78bfa', '#f472b6', '#a3e635'],
    light: ['#2563eb', '#0d9488', '#7c3aed', '#db2777', '#65a30d'],
} as const;

/** How many series colours there are before they repeat. */
const SERIES_COUNT = 6;

/** A chart's series colours: the theme's accent first, so the main series reads as the app's own. */
export const chartSeriesColors = (theme: Theme): string[] => [theme.colors.primary.base, ...CHART_SERIES[theme.metadata.variant]];

/** The colour of series `index`, from the variables `kitVariables` sets. */
export const seriesColor = (index: number) => `var(--mg-series-${(index % SERIES_COUNT) + 1})`;

const TONES = ['success', 'warning', 'error', 'info'] as const;

/**
 * The tone steps of the app's flat tiles (`--mg-tile-*` in
 * styles/design-system.css), for a page, which has no app stylesheet. Dark
 * steps are smaller: near black the same mix reads stronger.
 */
export const TILE_TONES = {
    dark: { '--mg-tile-tone': '3%', '--mg-tile-inset-tone': '4.5%', '--mg-tile-hover-tone': '5.5%' },
    light: { '--mg-tile-tone': '4%', '--mg-tile-inset-tone': '6%', '--mg-tile-hover-tone': '7%' },
} as const;

/** The variables the shared CSS reads: series colours, and each tone with text that stays readable on its own tint. */
export function kitVariables(theme: Theme) {
    const readable = getReadableThemeColors(theme);
    const { status } = theme.colors;
    return {
        ...Object.fromEntries(chartSeriesColors(theme).map((color, index) => [`--mg-series-${index + 1}`, color])),
        '--mg-tone-success': status.success,
        '--mg-tone-warning': status.warning,
        '--mg-tone-error': status.error,
        '--mg-tone-info': status.info,
        '--mg-success-text': readable.tinted.success,
        '--mg-warning-text': readable.tinted.warning,
        '--mg-error-text': readable.tinted.error,
        '--mg-info-text': readable.tinted.info,
        ...TILE_TONES[theme.metadata.variant],
    };
}

// Sizes follow the interface size: a page sets --mg-rem to the app's rem, in
// the app it falls back to rem itself.
const rem = (amount: number) => `calc(var(--mg-rem,1rem) * ${amount})`;

/**
 * A box is the app's flat tile (`.mg-tile`): no border, a tone step on what it
 * sits on, the next step inside another box. A track is the groove a bar runs
 * in; `.mg-bar` is a whole bar on its track, as long as --value, coloured by
 * --color.
 */
export const KIT_SHARED_CSS = `.mg-box{box-sizing:border-box;padding:${rem(0.625)} ${rem(0.75)};border-radius:${rem(0.75)};background-color:color-mix(in srgb,var(--foreground) var(--mg-tile-tone),transparent)}`
    + '.mg-box .mg-box{background-color:color-mix(in srgb,var(--foreground) var(--mg-tile-inset-tone),transparent)}'
    + '.mg-badge{display:inline-flex;align-items:center;padding:.0625em .5em;border-radius:999px;background-color:color-mix(in srgb,var(--foreground) 6%,transparent);color:var(--muted-foreground);font-size:.8125em;font-weight:500;line-height:1.45;white-space:nowrap}'
    + '.mg-badge[data-tone]{background-color:color-mix(in srgb,var(--mg-tone) 15%,transparent);color:var(--mg-tone-text)}'
    + TONES.map((tone) => `.mg-badge[data-tone=${tone}]{--mg-tone:var(--mg-tone-${tone});--mg-tone-text:var(--mg-${tone}-text)}`).join('')
    + '.mg-dot{display:inline-block;width:.5em;height:.5em;border-radius:50%;background-color:var(--color,var(--mg-series-1));vertical-align:.1em}'
    + '.mg-track,.mg-bar{background-color:color-mix(in srgb,var(--foreground) 6%,transparent)}'
    + `.mg-bar{display:block;height:${rem(0.375)};border-radius:999px;overflow:hidden}`
    + '.mg-bar::before{content:"";display:block;width:var(--value,0%);max-width:100%;height:100%;border-radius:inherit;background-color:var(--color,var(--mg-series-1))}';
