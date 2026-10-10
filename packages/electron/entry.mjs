/**
 * Desktop entry module. Electron holds the `ready` event until this module's
 * whole import graph has evaluated, so it stays small on purpose: the
 * configuration that must precede `ready`, the single-instance lock, and the
 * first window. The rest of the main process (`main.mjs`, the server, the
 * updater, IPC) is imported only after `ready`, so the window is on screen
 * while that loads. Starting the import earlier would delay `ready` itself:
 * module evaluation runs on the thread Chromium needs to finish initialising.
 */

import { app, protocol } from 'electron';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shouldIgnoreLoopbackConnectionLimit } from './startup-url-selection.mjs';
import {
  APP_USER_MODEL_ID,
  UI_PROTOCOL,
  createEarlyWindow,
  deferAppEventsUntilMainLoads,
  isDev,
  recordEarlyStartupMark,
  shellEnvironmentProbeBlocksMainThread,
  shouldStartInBackground,
  startShellEnvironmentProbe,
} from './early-startup.mjs';

recordEarlyStartupMark('electron.entry');

// Set the product name early so electron-log derives its log directory as
// ~/Library/Logs/Magio/ (not ~/Library/Logs/@magio/electron/).
app.setName('Magio');
if (process.platform === 'linux') {
  app.setDesktopName('magio.desktop');
}
if (isDev) {
  app.setPath('userData', path.join(app.getPath('appData'), 'Magio Dev'));
}
// Test hook for scripts/profile-startup.mjs: a packaged launch that must not
// share the single-instance lock or the Chromium profile with the installed
// app. macOS resolves the home directory from the user record, not $HOME, so
// an environment-only isolation cannot move these.
const userDataOverride = String(process.env.MAGIO_DESKTOP_USER_DATA_DIR || '').trim();
if (userDataOverride) {
  app.setPath('userData', userDataOverride);
}
app.setAppUserModelId(APP_USER_MODEL_ID);
// Resolve preview names in Chromium, not through the configured proxy.
app.commandLine.appendSwitch('proxy-bypass-list', '<-loopback>;magio-preview.localhost');
// Lift Chromium's per-host cap only for bundled UI. Applying this to Vite HMR
// lets the renderer request most of the module graph at once, overwhelming the
// dev server's transform pipeline and leaving the HTML splash visible for up
// to a minute before React mounts.
// Keep localhost out: Electron also matches its subdomains, including the
// browser panel's forwarded previews.
if (shouldIgnoreLoopbackConnectionLimit({
  development: isDev,
  packagedUi: process.env.MAGIO_ELECTRON_USE_BUNDLED_UI === '1',
})) {
  app.commandLine.appendSwitch('ignore-connections-limit', '127.0.0.1');
}
protocol.registerSchemesAsPrivileged([
  {
    scheme: UI_PROTOCOL,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
      // Keep V8 bytecode for the packaged renderer bundle between launches.
      codeCache: true,
    },
  },
]);

if (!app.requestSingleInstanceLock()) {
  app.exit(0);
  process.exit(0);
}

// Deep links and second launches can arrive before main.mjs has its handlers.
deferAppEventsUntilMainLoads();

app.whenReady().then(async () => {
  recordEarlyStartupMark('electron.app.ready');
  // Electron's own bundle ships electron.icns, so a development launch — bare
  // `electron ./entry.mjs` out of node_modules — inherits the stock icon.
  // Packaged builds take theirs from the bundle and never run this.
  //
  // Load from PNG, not the .icns sitting next to it: nativeImage's decoder does
  // not handle the icns container and throws "Failed to load image from path".
  if (isDev && process.platform === 'darwin') {
    try {
      const devIcon = fileURLToPath(new URL('./resources/icons/dev-icon.png', import.meta.url));
      if (fs.existsSync(devIcon)) app.dock.setIcon(devIcon);
    } catch (error) {
      console.warn('[electron] could not set the dev dock icon:', error);
    }
  }
  // The login shell runs in its own process; only its spawn touches this thread.
  if (!shellEnvironmentProbeBlocksMainThread) void startShellEnvironmentProbe().catch(() => {});
  // A login-item or --background launch has no window to show. Otherwise the
  // splash gets the main thread to itself until it is on screen: loading the
  // main module and the server behind it would starve its first paint.
  if (!shouldStartInBackground()) {
    await createEarlyWindow().whenShown;
  }
  if (shellEnvironmentProbeBlocksMainThread) void startShellEnvironmentProbe().catch(() => {});
  return import('./main.mjs');
}).catch((error) => {
  console.error('[electron] startup failed before the main module loaded:', error);
  app.exit(1);
});
