#!/usr/bin/env node
// Read-only detector for the two ways an upstream merge damages a rebranded fork.
//
// Usage:
//   bun run merge:detect --base <rev> --upstream <rev> [--ref <rev>]
//
//   --base      the fork's state before the merge; its deviations are what to protect
//   --upstream  the upstream release --base was derived from — the previous
//               merge's tag, NOT the one being merged. Upstream rows only define
//               "not ours" against the release our baseline came from. Pass the
//               incoming release instead and every row it newly adds falls
//               outside --base, so the whole merge reports as reverted.
//   --ref       what to compare against, default the working tree
//
// REVERT  a row upstream still carries came back over a value --base held.
//         These carry no brand string, so the four-stage rename pipeline walks
//         straight past them and file-loss detection cannot see them either:
//         the line is overwritten, not removed.
// LOSS    a row --base carried is gone from --ref.
//
// Both reports are read-only; nothing in the working tree is modified. Exits 1
// when either report has findings, 0 when clean.
//
// Cost: the pipeline is applied to staged trees in three batched passes and the
// revisions are read from two archives, so the whole run is a handful of
// processes rather than one per file — a per-file pipeline took over 40 minutes
// on 1137 changed files.
//
// The rename rules below are the same ones the pipeline scripts apply to the
// tree. scripts/merge-detect.test.mjs compares them against those scripts, so a
// rule added there without a matching rule here goes red.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Text replacement, in the pipeline's order: domain before the general rename,
// native Chamber before the ownership fix-ups.
export const SED_RULES = [
  's|openchamber\\.dev\\([^a-zA-Z]\\)|magio.exmay.com\\1|g',
  's|openchamber\\.dev$|magio.exmay.com|g',
  's|chamber\\.dev\\([^a-zA-Z]\\)|magio.exmay.com\\1|g',
  's|chamber\\.dev$|magio.exmay.com|g',
  's/OpenChamber/Magio/g',
  's/openchamber/magio/g',
  's/OPENCHAMBER/MAGIO/g',
  's/openChamber/magio/g',
  's/Openchamber/magio/g',
  's/Chamber/Magio/g',
  's/chamber/magio/g',
  's|github\\.com/magio/magio|github.com/gitcoffee-os/magio|g',
  's|api\\.github\\.com/repos/magio/magio|api.github.com/repos/gitcoffee-os/magio|g',
  's|raw\\.githubusercontent\\.com/magio/magio|raw.githubusercontent.com/gitcoffee-os/magio|g',
  's|img\\.shields\\.io/github/stars/magio/magio|img.shields.io/github/stars/gitcoffee-os/magio|g',
  's|img\\.shields\\.io/github/v/release/magio/magio|img.shields.io/github/v/release/gitcoffee-os/magio|g',
  's|raw\\.githubusercontent\\.com/btriapitsyn/magio|raw.githubusercontent.com/gitcoffee-os/magio|g',
  's|github\\.com/gitcoffee-os/magio/pull/\\([0-9][0-9]*\\)|github.com/openchamber/openchamber/pull/\\1|g',
  's|github\\.com/gitcoffee-os/magio/issues/\\([0-9][0-9]*\\)|github.com/openchamber/openchamber/issues/\\1|g',
];

// Bare oc-/OC- prefixes. The guard is what keeps doc-, loc- and roc- intact.
export const PREFIX_RULES = ['(^|[^a-zA-Z0-9])oc-', '(^|[^a-zA-Z0-9])OC-'];

// Remaining oc-prefixed identifiers. Perl, because the lookbehind has no BSD
// sed equivalent.
export const TOKEN_RULES = [
  's/(?<![A-Za-z0-9_])oc_/mg_/g;',
  's/(?<![A-Za-z0-9_])oc:/mg:/g;',
  's/(?<![A-Za-z0-9_])oc-/mg-/g;',
  's/\\bocPanel\\b/mgPanel/g;',
  's/\\bocSurface\\b/mgSurface/g;',
  's/\\bocTheme\\b/mgTheme/g;',
  's/\\bOCLogoSymbol\\b/MGLogoSymbol/g;',
  's/oclogo-symbol/mglogo-symbol/g;',
];

const BINARY_EXT =
  /\.(png|jpe?g|gif|icns|ico|webp|woff2?|ttf|otf|eot|zip|gz|tgz|jar|class|pdf|mp3|mp4|mov|wasm|node|bin)$/;

const EXCLUDED = new RegExp(
  '^(changelog/|CHANGELOG\\.md$|packages/vscode/CHANGELOG\\.md$|packages/vscode/LICENSE$|\\.gitcoffee/|bun\\.lock$)' +
    '|^packages/sdk/examples/.*\\.js$', // bundles built beside their sources, as oxlint.config.ts treats them
);

/** Rename a path the way the pipeline renames paths. */
export const mappath = (p) =>
  p
    .replace(/OpenChamber/g, 'Magio')
    .replace(/openchamber/g, 'magio')
    .replace(/openChamber/g, 'magio')
    .replace(/OPENCHAMBER/g, 'MAGIO')
    .replace(/Openchamber/g, 'magio')
    .replace(/chamber/g, 'magio')
    .replace(/OCLogo/g, 'MGLogo')
    .replace(/oclogo/g, 'mglogo');

/** Out of scope: binary payloads, read-only exemptions, and generated bundles. */
export const isOutOfScope = (p) => BINARY_EXT.test(p) || EXCLUDED.test(p);

/**
 * A run that flags most changed files is measuring the incoming release's new
 * rows against a --base that never had them, not finding regressions.
 */
export const misconfiguredUpstream = (flaggedFiles, candidateFiles) =>
  candidateFiles > 10 && flaggedFiles / candidateFiles > 0.5;

const rows = (text) => new Set(text.split('\n'));

/** Rows upstream carries that --base did not hold and --ref does now. */
export const detectReversion = (baseRows, refRows, upstreamRows) =>
  [...refRows].filter((row) => upstreamRows.has(row) && !baseRows.has(row)).sort();

/** Rows --base held that --ref dropped, split by whether upstream still wants them. */
export const detectLoss = (baseRows, refRows, upstreamRows) => {
  const lost = [...baseRows].filter((row) => !refRows.has(row) && row !== '').sort();
  return {
    wanted: lost.filter((row) => upstreamRows.has(row)),
    ours: lost.filter((row) => !upstreamRows.has(row)),
  };
};

export const parseArgs = (argv) => {
  const parsed = { ref: 'WORKTREE' };
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith('--')) throw new Error(`unexpected argument: ${key}`);
    const name = key.slice(2);
    if (!['base', 'upstream', 'ref'].includes(name)) throw new Error(`unknown option: ${key}`);
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`${key} needs a value`);
    parsed[name] = value;
    index += 1;
  }
  if (!parsed.base || !parsed.upstream) throw new Error('--base and --upstream are required');
  return parsed;
};

const git = (args) =>
  execFileSync('git', args, { cwd: REPO_ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

/** `<mode> <type> <hash>\t<path>` for every blob in a revision, minus symlinks. */
const tree = (rev) => {
  const entries = new Map();
  for (const line of git(['ls-tree', '-r', rev]).split('\n')) {
    const match = line.match(/^(\d+) \w+ \h+\t(.+)$/);
    if (!match) continue;
    if (match[1] === '120000') continue;
    entries.set(match[2], match[1]);
  }
  return entries;
};

const shellQuote = (value) => `'${value.replace(/'/g, `'\\''`)}'`;

/** Write one revision's blobs to disk so the loop can read them without git. */
const stage = (rev, paths, dir) => {
  mkdirSync(dir, {recursive: true});
  if (paths.length === 0) return;
  const tar = path.join(path.dirname(dir), `${path.basename(dir)}.tar`);
  execFileSync('git', ['archive', '--format=tar', '-o', tar, rev, '--', ...paths]);
  execFileSync('tar', ['-xf', tar, '-C', dir]);
  rmSync(tar, { force: true });
};

/** Apply every rename stage to a staged tree in one batched pass per stage. */
const transformTree = (dir, paths) => {
  if (paths.length === 0) return;
  const listFile = path.join(path.dirname(dir), `${path.basename(dir)}.list`);
  writeFileSync(listFile, paths.map((p) => `${p}\0`).join(''));
  const batch = (command) =>
    execFileSync('sh', ['-c', `xargs -0 -n 200 ${command} < ${shellQuote(listFile)}`], {
      cwd: dir,
      maxBuffer: 64 * 1024 * 1024,
    });
  batch(`sed -i '' ${SED_RULES.map(shellQuote).join(' ')}`);
  batch(
    `sed -i '' -E ${[
      `-e ${shellQuote(`s/${PREFIX_RULES[0]}/\\1mg-/g`)}`,
      `-e ${shellQuote(`s/${PREFIX_RULES[1]}/\\1MG-/g`)}`,
    ].join(' ')}`,
  );
  batch(`perl -i -pe ${shellQuote(TOKEN_RULES.join('\n'))}`);
  rmSync(listFile, { force: true });
};

const readOrNull = (file) => {
  try {
    return readFileSync(file, 'utf8');
  } catch {
    return null;
  }
};

const report = (title, count) => console.log(`  ${title}: ${count}`);

export const main = (argv) => {
  const { base, upstream, ref } = parseArgs(argv);
  const head = ref === 'WORKTREE' ? null : ref;

  const baseTree = tree(base);
  const upstreamTree = new Map(
    [...tree(upstream).keys()].map((p) => [mappath(p), p]),
  );
  const refTree = head ? tree(head) : null;

  const changed = head
    ? null
    : new Set(git(['diff', '--name-only', base]).split('\n').filter(Boolean));

  const candidates = [...baseTree.keys()].filter((p) => {
    if (isOutOfScope(p)) return false;
    if (!upstreamTree.has(p)) return false;
    if (changed) return changed.has(p);
    return baseTree.get(p) !== refTree.get(p);
  });
  const upstreamCandidates = candidates.map((p) => upstreamTree.get(p));

  console.log(`── merge-detect  base=${base}  upstream=${upstream}  ref=${head ?? 'working tree'}`);
  console.log(`  base files        : ${baseTree.size}`);
  console.log(`  changed candidates: ${candidates.length}`);

  const scratch = mkdtempSync(path.join(os.tmpdir(), 'merge-detect-'));
  const baseDir = path.join(scratch, 'base');
  const upstreamDir = path.join(scratch, 'upstream');
  const refDir = path.join(scratch, 'ref');

  try {
    stage(base, candidates, baseDir);
    stage(upstream, upstreamCandidates, upstreamDir);
    transformTree(upstreamDir, upstreamCandidates);
    if (head) stage(head, candidates, refDir);

    const reverts = [];
    const wantedLoss = [];
    const ourLoss = [];
    const missing = [];

    for (const p of candidates) {
      const baseContent = readOrNull(path.join(baseDir, p));
      if (baseContent === null) continue;

      const refFile = head ? path.join(refDir, p) : path.join(REPO_ROOT, p);
      const refContent = readOrNull(refFile);
      if (refContent === null && head) missing.push(p);
      // A file absent at --ref contributes no rows, so its whole --base content
      // reads as loss — which is what a deletion is.
      const refRows = refContent === null ? new Set() : rows(refContent);

      const upstreamContent = readOrNull(path.join(upstreamDir, upstreamTree.get(p)));
      const upstreamRows = upstreamContent === null ? new Set() : rows(upstreamContent);
      const baseRows = rows(baseContent);

      const revertsHere = detectReversion(baseRows, refRows, upstreamRows);
      if (revertsHere.length > 0) reverts.push([p, revertsHere]);

      const loss = detectLoss(baseRows, refRows, upstreamRows);
      if (loss.wanted.length > 0) wantedLoss.push([p, loss.wanted]);
      if (loss.ours.length > 0) ourLoss.push([p, loss.ours]);
    }

    const flatten = (groups) => groups.flatMap(([p, list]) => list.map((row) => `${p}  |  ${row}`));

    console.log("\n── REVERT: upstream rows came back over this fork's values ──");
    report('files', reverts.length);
    const revertLines = flatten(reverts);
    for (const line of revertLines.slice(0, 60)) console.log(`    ${line}`);
    if (revertLines.length > 60) console.log(`    … and ${revertLines.length - 60} more`);

    console.log('\n── LOSS: rows --base held, gone from --ref ──');
    report('files, still wanted by upstream', wantedLoss.length);
    for (const line of flatten(wantedLoss).slice(0, 40)) console.log(`    ${line}`);
    report('files, not carried by upstream (ours, or upstream dropped it)', ourLoss.length);

    if (missing.length > 0) {
      console.log(`\n  deleted since --base: ${missing.length}`);
      for (const p of missing.slice(0, 20)) console.log(`    ${p}`);
    }

    const findings = reverts.length + wantedLoss.length;
    if (misconfiguredUpstream(reverts.length, candidates.length)) {
      const flagRate = Math.round((reverts.length / candidates.length) * 100);
      console.log(`\n  warning: ${flagRate}% of changed files report REVERT.`);
      console.log('  That pattern means --upstream names the release being merged rather than');
      console.log('  the one --base derives from; every row the incoming release added is then');
      console.log('  absent from --base and reads as a reversion. Re-run with the previous tag.');
    }
    console.log(findings === 0 ? '\n  clean' : `\n  ${findings} file(s) with findings`);
    return findings === 0 ? 0 : 1;
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
};

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = main(process.argv.slice(2));
  } catch (error) {
    console.error(`merge-detect: ${error.message}`);
    process.exitCode = 2;
  }
}
