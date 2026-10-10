#!/usr/bin/env node
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');
const electronDir = path.join(repoRoot, 'packages/electron');
const bundledOpenCodeCliDir = path.join(electronDir, 'resources', 'opencode-cli');
const preferredHmrUiPort = Number(process.env.MAGIO_HMR_UI_PORT || '5173');
const preferredHmrApiPort = Number(process.env.MAGIO_HMR_API_PORT || '3901');

const quoteWindowsCommandArg = (value) => `"${String(value).replace(/"/g, '""')}"`;

function resolveWindowsCommand(command) {
  if (process.platform !== 'win32' || path.isAbsolute(command)) {
    return command;
  }

  const result = spawnSync('where.exe', [command], { encoding: 'utf8', windowsHide: true });
  if (result.error || result.status !== 0) {
    return command;
  }

  const candidates = String(result.stdout || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return candidates.find((entry) => /\.(exe|cmd|bat)$/i.test(entry)) || candidates[0] || command;
}

function spawnProcess(command, args, options = {}) {
  const resolvedCommand = resolveWindowsCommand(command);
  const isWindowsCommandScript = process.platform === 'win32' && /\.(cmd|bat)$/i.test(resolvedCommand);
  const spawnCommand = isWindowsCommandScript ? (process.env.ComSpec || 'cmd.exe') : resolvedCommand;
  const spawnArgs = isWindowsCommandScript
    ? ['/d', '/s', '/c', ['call', quoteWindowsCommandArg(resolvedCommand), ...args.map(quoteWindowsCommandArg)].join(' ')]
    : args;

  return spawn(spawnCommand, spawnArgs, {
    cwd: repoRoot,
    env: { ...process.env, MAGIO_ELECTRON_DEV: '1' },
    stdio: 'inherit',
    detached: process.platform !== 'win32',
    windowsVerbatimArguments: isWindowsCommandScript,
    ...options,
  });
}

// Packaged builds resolve the staged OpenCode CLI through process.resourcesPath.
// In development that path points at Electron's own resources, so hand the
// staged directory to the backend explicitly: the dev app must run the same
// OpenCode the release ships, not whatever `opencode` sits on PATH.
function resolveBundledOpenCodeCliEnv() {
  const binary = path.join(bundledOpenCodeCliDir, process.platform === 'win32' ? 'opencode.exe' : 'opencode');
  if (!fs.existsSync(binary)) {
    console.warn(
      `[electron:dev] bundled OpenCode CLI missing at ${binary}; falling back to PATH. ` +
        'Run `bun run --cwd packages/electron prepare:opencode-cli` to stage it.',
    );
    return {};
  }
  return { MAGIO_BUNDLED_OPENCODE_CLI_DIR: bundledOpenCodeCliDir };
}

function ensureElectronInstalled() {
  // Electron's postinstall can silently fail to extract the binary under
  // Node 24 (see ensure-electron.mjs). Fail fast with a repair attempt
  // before wiring up the dev servers so the error is actionable.
  const result = spawnSync('node', [path.join(__dirname, 'ensure-electron.mjs')], {
    cwd: repoRoot,
    stdio: 'inherit',
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      '[electron:dev] electron binary is missing or incomplete and could not be repaired. ' +
        'Run `bun run --cwd packages/electron ensure:electron` (or `bun install`) with a network connection.',
    );
  }
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      env: { ...process.env, MAGIO_ELECTRON_DEV: '1' },
      stdio: 'inherit',
      ...options,
    });
    child.on('error', reject);
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'null'} signal ${signal ?? 'none'}`));
    });
  });
}

function waitForExit(child, timeoutMs) {
  return new Promise((resolve) => {
    if (!child || child.exitCode !== null || child.signalCode !== null) {
      resolve();
      return;
    }

    const onExit = () => {
      clearTimeout(timer);
      resolve();
    };

    const timer = setTimeout(() => {
      child.off('exit', onExit);
      resolve();
    }, timeoutMs);

    child.once('exit', onExit);
  });
}

function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, '127.0.0.1');
  });
}

async function findAvailablePort(preferredPort) {
  const start = Number.isFinite(preferredPort) && preferredPort > 0 ? preferredPort : 0;
  if (start === 0) {
    return new Promise((resolve, reject) => {
      const server = net.createServer();
      server.once('error', reject);
      server.once('listening', () => {
        const address = server.address();
        const port = typeof address === 'object' && address ? address.port : 0;
        server.close(() => resolve(port));
      });
      server.listen(0, '127.0.0.1');
    });
  }

  for (let port = start; port < start + 50; port += 1) {
    if (await isPortAvailable(port)) {
      if (port !== start) {
        console.warn(`[electron:dev] port ${start} is unavailable, using ${port} instead.`);
      }
      return port;
    }
  }

  throw new Error(`No available port found near ${start}`);
}

function killWindowsProcessTree(pid) {
  if (!pid) return;
  try {
    spawnSync('taskkill.exe', ['/PID', String(pid), '/T', '/F'], {
      stdio: 'ignore',
      windowsHide: true,
    });
  } catch {
  }
}

function signalChild(child, signal) {
  if (!child || child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  try {
    if (process.platform !== 'win32') {
      process.kill(-child.pid, signal);
      return;
    }
  } catch {
  }

  try {
    child.kill(signal);
  } catch {
  }
}

async function stopChildTree(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) {
    return;
  }

  signalChild(child, 'SIGINT');
  await waitForExit(child, 2500);

  if (process.platform === 'win32' && child.exitCode === null && child.signalCode === null) {
    killWindowsProcessTree(child.pid);
    await waitForExit(child, 1000);
  }

  if (child.exitCode === null && child.signalCode === null) {
    signalChild(child, 'SIGTERM');
    await waitForExit(child, 2500);
  }

  if (child.exitCode === null && child.signalCode === null) {
    signalChild(child, 'SIGKILL');
    await waitForExit(child, 1000);
  }
}

// Development runs Electron straight out of node_modules, so the bundle the
// window manager actually reads is Electron's own: CFBundleName stays
// "Electron", which is what the menu bar and the Dock's app label show.
// `app.setName()` only overrides the name Electron uses internally, not the one
// macOS takes from the bundle. Rewrite the two display keys before spawning.
// Idempotent, because bun install re-extracts Electron and restores them.
// The menu bar re-reads the plist when the app launches, but the Dock labels
// the tile from LaunchServices' snapshot of that plist instead, so the rewrite
// has to be pushed into that snapshot too or it keeps saying "Electron".
// The executable carries a name of its own — that is a separate, currently
// gated problem, explained in patchDevElectronBundleIdentity below. Every
// rewrite here is the exact inverse of what bun install extracts, so the bundle
// always lands in one of two consistent states rather than a mixture of the two.
function reregisterDevElectronBundle(plistPath) {
  const lsregister =
    '/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister';
  if (!fs.existsSync(lsregister)) return;

  // Info.plist -> Contents -> Electron.app
  const bundlePath = path.dirname(path.dirname(plistPath));
  const result = spawnSync(lsregister, ['-f', bundlePath], { stdio: 'ignore' });
  if (result.error || result.status !== 0) {
    console.warn(`[electron:dev] could not refresh the LaunchServices record for ${bundlePath}.`);
  }
}

/**
 * Make the extracted executable and path.txt both describe `binaryName`.
 * electron's own CLI spawns `dist/<path.txt>`, so the file and the record have
 * to move together: a path.txt pointing at a file that is not there makes the
 * next launch re-download Electron instead of starting. Runs in both
 * directions, so switching the target off puts an already-renamed bundle back
 * into the extracted state instead of leaving it stranded. Returns true when
 * something changed.
 */
function reconcileDevElectronExecutable(electronPkgDir, bundleContentsDir, binaryName) {
  const macosDir = path.join(bundleContentsDir, 'MacOS');
  const relativeFor = (name) => `Electron.app/Contents/MacOS/${name}`;
  const otherName = binaryName === 'Magio' ? 'Electron' : 'Magio';
  const target = path.join(macosDir, binaryName);
  const other = path.join(macosDir, otherName);
  const targetRelative = relativeFor(binaryName);
  const pathTxt = path.join(electronPkgDir, 'path.txt');

  let recorded;
  try {
    recorded = fs.readFileSync(pathTxt, 'utf8').trim();
  } catch {
    // Nothing installed yet; ensure-electron creates it in the extracted state.
    return false;
  }
  if (recorded !== relativeFor('Electron') && recorded !== relativeFor('Magio')) return false;
  if (recorded === targetRelative && fs.existsSync(target)) return false;

  // Move the file first, so path.txt is only ever pointed at something that
  // exists on disk.
  let renamedByUs = false;
  if (!fs.existsSync(target)) {
    if (!fs.existsSync(other)) return false;
    try {
      fs.renameSync(other, target);
    } catch (error) {
      console.warn(`[electron:dev] could not rename the dev Electron executable: ${error.message}`);
      return false;
    }
    renamedByUs = true;
  }

  try {
    fs.writeFileSync(pathTxt, targetRelative);
  } catch (error) {
    // Undo the rename so the recorded path and the file on disk agree again,
    // and the next launch starts rather than re-downloading.
    if (renamedByUs) {
      try {
        fs.renameSync(target, other);
      } catch {
        // The write failure is the one worth reporting.
      }
    }
    console.warn(`[electron:dev] could not update ${pathTxt}: ${error.message}`);
    return false;
  }

  if (renamedByUs) {
    console.log(`[electron:dev] renamed the dev Electron executable to ${binaryName}.`);
  }
  return true;
}

function patchDevElectronBundleIdentity() {
  if (process.platform !== 'darwin') return;

  let electronPkgDir;
  try {
    const require = createRequire(path.join(electronDir, 'package.json'));
    electronPkgDir = path.dirname(require.resolve('electron'));
  } catch {
    return;
  }

  const plistPath = path.join(electronPkgDir, 'dist', 'Electron.app', 'Contents', 'Info.plist');
  if (!fs.existsSync(plistPath)) return;

  // Renaming the executable flips app.isPackaged to true — Electron decides
  // dev vs packaged from that name — and shouldUsePackagedUi() then routes the
  // window to magio-ui:// instead of the HMR server, where the un-built
  // web-dist kills startup. Hold the rename behind its own switch until the
  // packaged flag can be forced back off without dragging the rest of the
  // packaged code paths (auto-updater, resource roots) into development.
  const renameExecutable = process.env.MAGIO_ELECTRON_RENAME_EXECUTABLE === '1';
  const binaryName = renameExecutable ? 'Magio' : 'Electron';

  let changed = false;
  try {
    const original = fs.readFileSync(plistPath, 'utf8');
    const displayPatched = original.replace(
      /(<key>(?:CFBundleDisplayName|CFBundleName)<\/key>\s*<string>)[^<]*(<\/string>)/g,
      '$1Magio$2',
    );
    const patched = displayPatched.replace(
      /(<key>CFBundleExecutable<\/key>\s*<string>)[^<]*(<\/string>)/g,
      `$1${binaryName}$2`,
    );
    if (patched !== original) {
      fs.writeFileSync(plistPath, patched);
      changed = true;
      if (displayPatched !== original) {
        console.log('[electron:dev] renamed dev Electron bundle display name to Magio.');
      }
      if (patched !== displayPatched) {
        console.log(`[electron:dev] set CFBundleExecutable to ${binaryName}.`);
      }
    }
  } catch (error) {
    console.warn(`[electron:dev] could not patch ${plistPath}: ${error.message}`);
    return;
  }

  // Only once the plist names it, so the bundle never advertises an executable
  // that is not on disk.
  if (reconcileDevElectronExecutable(electronPkgDir, path.dirname(plistPath), binaryName)) {
    changed = true;
  }

  if (changed) reregisterDevElectronBundle(plistPath);
}

async function main() {
  const useBundledUi = process.env.MAGIO_ELECTRON_USE_BUNDLED_UI === '1';
  let devServer = null;
  let hmrApiPort = '';
  let hmrUiPort = '';

  ensureElectronInstalled();
  patchDevElectronBundleIdentity();
  const bundledOpenCodeCliEnv = resolveBundledOpenCodeCliEnv();

  if (useBundledUi) {
    await runProcess('bun', ['run', '--cwd', 'packages/electron', 'build:web-assets']);
  } else {
    hmrApiPort = String(await findAvailablePort(preferredHmrApiPort));
    hmrUiPort = String(await findAvailablePort(preferredHmrUiPort));
    devServer = spawnProcess('node', ['./scripts/dev-web-hmr.mjs'], {
      env: {
        ...process.env,
        ...bundledOpenCodeCliEnv,
        MAGIO_ELECTRON_DEV: '1',
        MAGIO_HMR_UI_PORT: hmrUiPort,
        MAGIO_HMR_API_PORT: hmrApiPort,
        MAGIO_DISABLE_PWA_DEV: '1',
      },
    });
  }

  const electron = spawnProcess('bun', ['x', 'electron', './entry.mjs'], {
    cwd: electronDir,
    env: {
      ...process.env,
      ...bundledOpenCodeCliEnv,
      MAGIO_ELECTRON_DEV: '1',
      ...(useBundledUi ? { MAGIO_ELECTRON_USE_BUNDLED_UI: '1' } : {}),
      MAGIO_HMR_UI_PORT: hmrUiPort,
      MAGIO_HMR_API_PORT: hmrApiPort,
      MAGIO_DISABLE_PWA_DEV: '1',
    },
  });

  let cleaning = false;
  const teardown = async (code) => {
    if (cleaning) {
      return;
    }
    cleaning = true;

    await Promise.all([stopChildTree(electron), stopChildTree(devServer)]);
    process.exit(typeof code === 'number' ? code : 0);
  };

  const onChildExit = (label) => (code, signal) => {
    if (code !== 0 || signal) {
      console.warn(`[electron:dev] ${label} exited with code ${code ?? 'null'} signal ${signal ?? 'none'}.`);
    }
    void teardown(code ?? 1);
  };

  devServer?.on('exit', onChildExit('dev server'));
  electron.on('exit', onChildExit('electron'));
  devServer?.on('error', (error) => {
    console.error('[electron:dev] failed to start dev server:', error);
    void teardown(1);
  });
  electron.on('error', (error) => {
    console.error('[electron:dev] failed to start electron:', error);
    void teardown(1);
  });

  for (const [signal, exitCode] of Object.entries({ SIGINT: 130, SIGTERM: 143, SIGQUIT: 131, SIGHUP: 129 })) {
    process.on(signal, () => {
      void teardown(exitCode);
    });
  }
}

main().catch((error) => {
  console.error('[electron:dev] unexpected error:', error);
  process.exit(1);
});
