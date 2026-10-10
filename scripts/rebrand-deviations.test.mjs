// Values this fork deliberately holds against upstream.
//
// Every entry below is a place where an upstream merge reverts our work by
// taking upstream's content wholesale, and none of them carry a brand string,
// so the four-stage rename pipeline walks straight past them. That already
// happened twice: fixed at 7ad78e3d7, then reverted again by the v2.2.0 merge.
// File-loss detection cannot see the damage either — the line is overwritten,
// not removed — so these are asserted here instead of checked by hand.
//
// The reference for what each value means and why upstream differs lives in
// .gitcoffee/openchamber-to-magio-rebrand-checklist.md §9.

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => readFileSync(path.join(ROOT, relative), 'utf8');
const readJson = (relative) => JSON.parse(read(relative));

test('the desktop app takes its icon from mac.icon, not from the asset catalog', () => {
  const mac = readJson('packages/electron/package.json').build.mac;
  assert.equal(mac.icon, 'resources/icons/icon.icns');

  // CFBundleIconName would point macOS at Assets.car, a compile of upstream's
  // cube artwork that was never rebuilt after our .icon sources changed. The
  // plist must declare exactly one extendInfo entry: the local-network purpose
  // string. Any other key means a merge reintroduced something unreviewed.
  assert.deepEqual(Object.keys(mac.extendInfo ?? {}), ['NSLocalNetworkUsageDescription']);
});

test('the startup splash draws the C-spark rather than the isometric cube', () => {
  const source = read('packages/electron/early-startup.mjs');

  // Upstream's cube is built from rotation matrices opening 0.866/0.5; our mark
  // is two flat bezier curves with no transform at all.
  assert.doesNotMatch(source, /matrix\(0\.866,0\.5/);
});

test('every manifest ships the GitCoffee license rather than upstream MIT', () => {
  // "SEE LICENSE IN LICENSE", not a bare "Apache-2.0": LICENSE carries the
  // GitCoffee Open Source License — Apache-2.0 plus additional conditions —
  // so a plain SPDX id would misdescribe what ships. npm resolves the
  // SEE form against the package's LICENSE file.
  for (const manifest of ['package.json', 'packages/sdk/package.json', 'packages/vscode/package.json']) {
    assert.equal(
      readJson(manifest).license,
      'SEE LICENSE IN LICENSE',
      `${manifest} must not fall back to MIT or claim plain Apache-2.0`,
    );
  }
  assert.ok(
    readJson('packages/sdk/package.json').files.includes('NOTICE'),
    'NOTICE must stay in the published files list',
  );
});

test('the root manifest credits this fork, with upstream credited in NOTICE', () => {
  // Upstream's root manifest says "Bohdan Triapitsyn"; a merge taking
  // upstream's manifest content restores it. Upstream attribution lives in
  // NOTICE, which the MIT terms require and this repository keeps.
  assert.equal(readJson('package.json').author, 'GitCoffee Team');
});

test('the Windows path fixture pads for this fork’s shorter suffix', () => {
  const source = read('packages/web/bin/cli.test.js');

  // Upstream repeats 139 because their config-and-binary suffix is 36 chars;
  // ours is 28, so 139 leaves longPath at 176 and the 180 floor fails.
  assert.match(source, /repeat\(143\)/, 'worst-case path must still reach the 180-char floor');
});

test('the install wordmark spells Magio', () => {
  const source = read('scripts/install.sh');
  const blocks = [...source.matchAll(/cat <<'EOF'\n([\s\S]*?)\nEOF/g)].map((match) => match[1]);
  const wordmark = blocks.find((block) => block.includes('█'));
  assert.ok(wordmark, 'install.sh must print a block-art wordmark');

  const lines = wordmark.trimEnd().split('\n');
  assert.equal(lines.length, 3, 'upstream prints a six-line OpenChamber mark');
  assert.match(lines[0], /░█▄█░█▀█░█▀▀░▀█▀░█▀█/, 'first line must be the Magio mark');
});
