import { afterEach, beforeEach, expect, jest, test } from 'bun:test';
import { Window } from 'happy-dom';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { I18nProvider } from '@/lib/i18n';
import { MagioLogo } from './MagioLogo';

const browser = new Window({ url: 'http://localhost/' });
Object.assign(globalThis, {
  window: browser, document: browser.document, navigator: browser.navigator,
  HTMLElement: browser.HTMLElement, getComputedStyle: browser.getComputedStyle.bind(browser),
  IS_REACT_ACT_ENVIRONMENT: true,
});

let root: Root;
let host: HTMLDivElement;

const render = (element: React.ReactElement) => act(async () => {
  root.render(<I18nProvider>{element}</I18nProvider>);
});
const advance = (ms: number) => act(async () => {
  jest.advanceTimersByTime(ms);
});
const logo = () => host.querySelector('svg');

beforeEach(() => {
  jest.useFakeTimers();
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
});

afterEach(async () => {
  await act(async () => root.unmount());
  host.remove();
  jest.useRealTimers();
});

test('the logo draws the Magio mark rather than the upstream cube', async () => {
  await render(<MagioLogo />);
  const svg = logo();
  expect(svg?.getAttribute('viewBox')).toBe('0 0 100 100');
  expect(svg?.querySelector('path[d^="M50 8.432"]')).not.toBeNull();
  expect(svg?.querySelector('path[d^="M82.144 11.427"]')).not.toBeNull();
  expect(svg?.querySelector('[data-tier]')).toBeNull();
});

test('a still logo does not glow', async () => {
  await render(<MagioLogo />);
  expect(logo()?.querySelector('.mg-logo-glow-on')).toBeNull();

  await advance(3000);
  expect(logo()?.querySelector('.mg-logo-glow-on')).toBeNull();
});

test('a loading logo glows on a one-second phase', async () => {
  await render(<MagioLogo isAnimated />);

  const states = new Set<boolean>();
  for (let step = 0; step < 4; step += 1) {
    states.add(Boolean(logo()?.querySelector('.mg-logo-glow-on')));
    await advance(1000);
  }

  expect([...states].sort()).toEqual([false, true]);
});
