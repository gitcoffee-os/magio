// The rename rules merge-detect applies must stay identical to the ones the
// pipeline scripts apply to the tree. They are written down twice on purpose:
// the pipeline has to rewrite files in place, the detector has to rewrite a
// string in memory, and neither can import the other's form. These tests are
// what keep the two copies from drifting apart — a rule added to the pipeline
// without a matching rule here goes red.
//
// The pipeline scripts live in .gitcoffee/tmp, which is untracked. A missing
// script is reported as a failure rather than skipped: with no source of truth
// to compare against, the detector would be guessing.

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  PREFIX_RULES,
  SED_RULES,
  TOKEN_RULES,
  detectLoss,
  detectReversion,
  isOutOfScope,
  mappath,
  misconfiguredUpstream,
  parseArgs,
} from './merge-detect.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PIPELINE = {
  text: '.gitcoffee/tmp/magio-sed-stage.sh',
  prefix: '.gitcoffee/tmp/mg-prefix-rename.sh',
  tokens: '.gitcoffee/tmp/mg-rename-oc.sh',
  paths: '.gitcoffee/tmp/magio-path-rename.sh',
};

const readPipeline = (relative) => {
  const full = path.join(ROOT, relative);
  if (!existsSync(full)) {
    throw new Error(
      `${relative} is missing. It is the source of truth for the rename rules ` +
        'merge-detect applies; promote it out of .gitcoffee/tmp rather than deleting it.',
    );
  }
  return readFileSync(full, 'utf8');
};

const sedRulesFrom = (source, arrayNames) => {
  const rules = [];
  for (const name of arrayNames) {
    const match = source.match(new RegExp(`^${name}=\\((.*?)^\\)`, 'ms'));
    assert.ok(match, `${name} array not found in the pipeline script`);
    rules.push(...[...match[1].matchAll(/-e\s+'([^']+)'/g)].map((found) => found[1]));
  }
  return rules;
};

const set = (text) => new Set(text.split('\n'));

test('text-replacement rules match the pipeline exactly, in order', () => {
  const source = readPipeline(PIPELINE.text);
  const expected = sedRulesFrom(source, ['E5_RULES', 'SED_RULES', 'E6_RULES', 'E4_RULES']);
  assert.deepEqual(SED_RULES, expected, 'a rule was added, removed, or reordered upstream of the detector');
});

test('prefix guards match the pipeline', () => {
  const source = readPipeline(PIPELINE.prefix);
  const lower = source.match(/^RULE_OC='([^']+)'/m);
  const upper = source.match(/^RULE_OCUP='([^']+)'/m);
  assert.ok(lower && upper, 'RULE_OC / RULE_OCUP not found in the pipeline script');
  assert.deepEqual(PREFIX_RULES, [lower[1], upper[1]]);
});

test('identifier renames match the pipeline', () => {
  const source = readPipeline(PIPELINE.tokens);
  const block = source.match(/perl -i -pe '([\s\S]*?)'/);
  assert.ok(block, 'perl rename block not found in the pipeline script');
  const expected = [...block[1].matchAll(/(s\/.*?\/g;)/g)].map((found) => found[1]);
  assert.ok(expected.length > 0, 'the pipeline perl block declares no substitutions');
  assert.deepEqual(TOKEN_RULES, expected);
});

test('path renaming matches the pipeline', () => {
  // magio-path-rename.sh only rewrites brand text in paths; oc- prefixes are
  // handled by mg-prefix-rename.sh's file list, not by path renaming.
  const source = readPipeline(PIPELINE.paths);
  assert.match(source, /-e 's\/OpenChamber\/Magio\/g'/);
  assert.match(source, /-e 's\/openchamber\/magio\/g'/);
});

test('mappath renames brand text the way path renaming does', () => {
  assert.equal(
    mappath('packages/electron/OpenChamberWebView.java'),
    'packages/electron/MagioWebView.java',
  );
  assert.equal(mappath('docs/openchamber/README.md'), 'docs/magio/README.md');
  assert.equal(mappath('packages/electron/resources/icons/icon.icns'), 'packages/electron/resources/icons/icon.icns');
});

test('REVERT flags an upstream value coming back over this fork’s', () => {
  const base = set('"license": "Apache-2.0",');
  const ref = set('"license": "MIT",');
  const upstream = set('"license": "MIT",');
  assert.deepEqual(detectReversion(base, ref, upstream), ['"license": "MIT",']);
});

test('REVERT flags a key this fork removed and upstream reintroduced', () => {
  const base = set('  "extendInfo": {\n    "NSLocalNetworkUsageDescription": "x"\n  }');
  const ref = set('  "CFBundleIconName": "AppIcon",\n  "extendInfo": {\n    "NSLocalNetworkUsageDescription": "x"\n  }');
  const upstream = set('  "CFBundleIconName": "AppIcon",\n  "extendInfo": {\n    "NSLocalNetworkUsageDescription": "x"\n  }');
  assert.deepEqual(detectReversion(base, ref, upstream), ['  "CFBundleIconName": "AppIcon",']);
});

test('REVERT stays quiet when the fork kept its value', () => {
  const base = set('"license": "Apache-2.0",');
  assert.deepEqual(detectReversion(base, set('"license": "Apache-2.0",'), set('"license": "MIT",')), []);
});

test('LOSS separates rows upstream still wants from rows only we had', () => {
  const base = set('ours\ntheirs\ndropped-by-upstream');
  const ref = set('theirs');
  const upstream = set('theirs\nours');
  assert.deepEqual(detectLoss(base, ref, upstream), {
    wanted: ['ours'],
    ours: ['dropped-by-upstream'],
  });
});

test('scope skips binaries, read-only exemptions, and generated bundles', () => {
  assert.equal(isOutOfScope('resources/icons/icon.icns'), true);
  assert.equal(isOutOfScope('changelog/2.0.0.md'), true);
  assert.equal(isOutOfScope('packages/vscode/LICENSE'), true);
  assert.equal(isOutOfScope('.gitcoffee/openchamber-to-magio-rebrand-checklist.md'), true);
  // Built beside their sources; the source is what a regression would hit.
  assert.equal(isOutOfScope('packages/sdk/examples/hello-kit/panel/main.js'), true);
  assert.equal(isOutOfScope('packages/sdk/examples/hello-kit/panel/main.ts'), false);
  assert.equal(isOutOfScope('scripts/merge-detect.mjs'), false);
  assert.equal(isOutOfScope('packages/electron/package.json'), false);
});

test('a run that flags most changed files reports the wrong --upstream pairing', () => {
  // Measuring the incoming release's rows against a --base that never had them
  // flagged 1112 of 1129 changed files; that ratio has to raise a warning.
  assert.equal(misconfiguredUpstream(1112, 1129), true);
  assert.equal(misconfiguredUpstream(5, 100), false);
  // Too few files to read a ratio from.
  assert.equal(misconfiguredUpstream(6, 10), false);
  assert.equal(misconfiguredUpstream(0, 1129), false);
});

test('parseArgs requires both revisions and reads the working tree by default', () => {
  assert.deepEqual(parseArgs(['--base', 'a', '--upstream', 'b']), {
    ref: 'WORKTREE',
    base: 'a',
    upstream: 'b',
  });
  assert.equal(parseArgs(['--base', 'a', '--upstream', 'b', '--ref', 'c']).ref, 'c');
  assert.throws(() => parseArgs(['--base', 'a']), /--base and --upstream are required/);
  assert.throws(() => parseArgs(['--base', 'a', '--upstream', 'b', '--nope', 'c']), /unknown option/);
  assert.throws(() => parseArgs(['--base', '--upstream', 'b']), /--base needs a value/);
});
