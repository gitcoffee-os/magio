/**
 * Build a throwaway macOS app bundle for development.
 *
 * `bun x electron` launches Electron.app, whose Info.plist names the app
 * "Electron". macOS draws the menu bar's application title from the bundle,
 * so `app.setName()` cannot change it: the dev app would still be labelled
 * Electron even though the window and dock icon are Magio's. Copy the
 * installed bundle once, rename it, and launch its executable instead.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

import { resolveElectronPackageDir } from './ensure-electron.mjs';

export const DEV_APP_NAME = 'Magio';
export const DEV_APP_BUNDLE_NAME = `${DEV_APP_NAME}.app`;
export const DEV_APP_IDENTIFIER = 'com.magio.dev';
export const DEV_APP_ICON_FILE = 'magio.icns';

export function devAppBundlePath(electronDir) {
  return path.join(electronDir, '.dev', DEV_APP_BUNDLE_NAME);
}

function replacePlistString(plist, key, value) {
  const pattern = new RegExp(`(<key>${key}</key>\\s*<string>)[^<]*(</string>)`);
  if (!pattern.test(plist)) {
    throw new Error(`Info.plist is missing ${key}`);
  }
  return plist.replace(pattern, `$1${value}$2`);
}

/**
 * Return the bundle's Info.plist with Magio's identity. Pure so the rewrite
 * can be checked without copying Electron.app.
 */
export function rebrandInfoPlist(plist, options = {}) {
  const name = options.name ?? DEV_APP_NAME;
  const identifier = options.identifier ?? DEV_APP_IDENTIFIER;
  const iconFile = options.iconFile ?? DEV_APP_ICON_FILE;

  let result = replacePlistString(plist, 'CFBundleName', name);
  result = replacePlistString(result, 'CFBundleDisplayName', name);
  result = replacePlistString(result, 'CFBundleIdentifier', identifier);
  result = replacePlistString(result, 'CFBundleIconFile', iconFile);
  return result;
}

function readIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function cloneBundle(source, destination) {
  fs.rmSync(destination, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  // `cp -c` clones files on APFS, so a first-time copy costs no data blocks.
  // Fall back to a regular recursive copy on filesystems without clones.
  try {
    execFileSync('cp', ['-cR', source, destination], { stdio: 'ignore' });
    return;
  } catch {
    // Fall through to fs.cpSync.
  }
  fs.cpSync(source, destination, { recursive: true });
}

function bundleVersion(bundlePath) {
  const plist = readIfExists(path.join(bundlePath, 'Contents', 'Info.plist'));
  return plist?.match(/<key>CFBundleShortVersionString<\/key>\s*<string>([^<]*)<\/string>/)?.[1] ?? null;
}

function signBundle(bundlePath) {
  try {
    execFileSync('codesign', ['--force', '--deep', '--sign', '-', bundlePath], { stdio: 'ignore' });
  } catch {
    // Ad-hoc signing is best-effort; an unsigned Intel build still launches.
  }
}

/**
 * Create or refresh the dev bundle and return the executable to spawn.
 * The bundle is reused between runs and rebuilt when Electron is upgraded.
 */
export function prepareDevAppBundle({ electronDir, electronPackageDir, iconPath, log = () => {} } = {}) {
  if (process.platform !== 'darwin') {
    throw new Error('prepareDevAppBundle is only supported on macOS');
  }

  const packageDir = electronPackageDir ?? resolveElectronPackageDir(electronDir);
  if (!packageDir) {
    throw new Error('Could not locate the installed electron package');
  }

  const sourceAppPath = path.join(packageDir, 'dist', 'Electron.app');
  if (!fs.existsSync(sourceAppPath)) {
    throw new Error(`Electron.app is missing at ${sourceAppPath}`);
  }

  const bundlePath = devAppBundlePath(electronDir);
  const infoPlistPath = path.join(bundlePath, 'Contents', 'Info.plist');
  const sourcePlist = fs.readFileSync(path.join(sourceAppPath, 'Contents', 'Info.plist'), 'utf8');
  const desiredPlist = rebrandInfoPlist(sourcePlist);

  const needsClone =
    !fs.existsSync(infoPlistPath) ||
    bundleVersion(bundlePath) !== bundleVersion(sourceAppPath);

  if (needsClone) {
    log(`[electron:dev] creating ${DEV_APP_BUNDLE_NAME} from Electron.app`);
    cloneBundle(sourceAppPath, bundlePath);
  }

  const currentPlist = readIfExists(infoPlistPath);
  const plistChanged = currentPlist !== desiredPlist;
  if (plistChanged) {
    fs.writeFileSync(infoPlistPath, desiredPlist);
  }

  const iconSource = iconPath ?? path.join(electronDir, 'resources', 'icons', 'icon.icns');
  const iconDestination = path.join(bundlePath, 'Contents', 'Resources', DEV_APP_ICON_FILE);
  let iconChanged = false;
  if (fs.existsSync(iconSource)) {
    const sourceIcon = fs.readFileSync(iconSource);
    const currentIcon = (() => {
      try {
        return fs.readFileSync(iconDestination);
      } catch {
        return null;
      }
    })();
    if (!currentIcon || !sourceIcon.equals(currentIcon)) {
      fs.copyFileSync(iconSource, iconDestination);
      iconChanged = true;
    }
  }

  if (needsClone || plistChanged || iconChanged) {
    signBundle(bundlePath);
  }

  const executablePath = path.join(bundlePath, 'Contents', 'MacOS', 'Electron');
  if (!fs.existsSync(executablePath)) {
    throw new Error(`Dev app executable is missing at ${executablePath}`);
  }

  return { bundlePath, executablePath };
}
