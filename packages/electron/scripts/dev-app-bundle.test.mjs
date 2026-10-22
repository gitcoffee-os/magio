import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';

import {
  DEV_APP_BUNDLE_NAME,
  devAppBundlePath,
  prepareDevAppBundle,
  rebrandInfoPlist,
} from './dev-app-bundle.mjs';

const ELECTRON_PLIST = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key>
  <string>Electron</string>
  <key>CFBundleDisplayName</key>
  <string>Electron</string>
  <key>CFBundleIdentifier</key>
  <string>com.github.Electron</string>
  <key>CFBundleIconFile</key>
  <string>electron.icns</string>
  <key>CFBundleShortVersionString</key>
  <string>43.7.0</string>
  <key>CFBundleExecutable</key>
  <string>Electron</string>
</dict>
</plist>
`;

test('rebrandInfoPlist gives the bundle Magio identity', () => {
  const rebranded = rebrandInfoPlist(ELECTRON_PLIST);

  assert.match(rebranded, /<key>CFBundleName<\/key>\s*<string>Magio<\/string>/);
  assert.match(rebranded, /<key>CFBundleDisplayName<\/key>\s*<string>Magio<\/string>/);
  assert.match(rebranded, /<key>CFBundleIdentifier<\/key>\s*<string>com\.magio\.dev<\/string>/);
  assert.match(rebranded, /<key>CFBundleIconFile<\/key>\s*<string>magio\.icns<\/string>/);
  // Untouched keys survive the rewrite.
  assert.match(rebranded, /<key>CFBundleShortVersionString<\/key>\s*<string>43\.7\.0<\/string>/);
  assert.match(rebranded, /<key>CFBundleExecutable<\/key>\s*<string>Electron<\/string>/);
});

test('rebrandInfoPlist rejects a plist without the expected keys', () => {
  assert.throws(() => rebrandInfoPlist('<plist><dict></dict></plist>'), /Info\.plist is missing CFBundleName/);
});

test('devAppBundlePath lives inside the electron package', () => {
  assert.equal(
    devAppBundlePath('/repo/packages/electron'),
    path.join('/repo/packages/electron', '.dev', DEV_APP_BUNDLE_NAME),
  );
});

test('prepareDevAppBundle clones, rebrands and reuses the bundle', { skip: process.platform !== 'darwin' }, () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'magio-dev-bundle-'));
  const electronDir = path.join(root, 'electron');
  const packageDir = path.join(root, 'electron-package');
  const sourceApp = path.join(packageDir, 'dist', 'Electron.app');
  const sourceResources = path.join(sourceApp, 'Contents', 'Resources');
  const sourceMacOS = path.join(sourceApp, 'Contents', 'MacOS');
  fs.mkdirSync(sourceResources, { recursive: true });
  fs.mkdirSync(sourceMacOS, { recursive: true });
  fs.writeFileSync(path.join(sourceApp, 'Contents', 'Info.plist'), ELECTRON_PLIST);
  fs.writeFileSync(path.join(sourceMacOS, 'Electron'), 'fake executable');

  const iconPath = path.join(root, 'icon.icns');
  fs.writeFileSync(iconPath, 'magio icon');

  try {
    const first = prepareDevAppBundle({ electronDir, electronPackageDir: packageDir, iconPath });
    assert.equal(first.bundlePath, devAppBundlePath(electronDir));
    assert.equal(first.executablePath, path.join(first.bundlePath, 'Contents', 'MacOS', 'Electron'));
    assert.ok(fs.existsSync(first.executablePath));

    const plist = fs.readFileSync(path.join(first.bundlePath, 'Contents', 'Info.plist'), 'utf8');
    assert.match(plist, /<string>Magio<\/string>/);
    assert.equal(
      fs.readFileSync(path.join(first.bundlePath, 'Contents', 'Resources', 'magio.icns'), 'utf8'),
      'magio icon',
    );

    // A second run reuses the bundle instead of cloning again.
    const second = prepareDevAppBundle({ electronDir, electronPackageDir: packageDir, iconPath });
    assert.equal(second.executablePath, first.executablePath);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
