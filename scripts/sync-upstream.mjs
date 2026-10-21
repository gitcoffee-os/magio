#!/usr/bin/env node
// Build a rebranded projection of an upstream release on top of the fork's
// previous sync point, then print the commit to merge.
//
// The projection commit has two parents: the fork's previous sync point and the
// upstream tag. Merging it back into the fork is a normal three-way merge whose
// base is the fork's tree, so upstream commits stay in history and the fork's
// own changes are preserved.
//
// Usage:
//   node scripts/sync-upstream.mjs --base <rev> --from <tag> --to <tag> [--dry-run]

import { execFileSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readlinkSync,
  renameSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isOutOfScope, mappath, PREFIX_RULES, SED_RULES, TOKEN_RULES } from './merge-detect.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSET_EXT = /\.(png|jpe?g|gif|icns|ico|webp|woff2?|ttf|otf|eot|svg|pdf|mp3|mp4|mov|wasm)$/i;
const ALWAYS_EXCLUDED = new Set(['bun.lock']);

const git = (args, cwd = REPO_ROOT) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const parseArgs = (argv) => {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith('--')) throw new Error(`unexpected argument: ${key}`);
    const name = key.slice(2);
    if (name === 'dry-run') {
      out.dryRun = true;
      continue;
    }
    if (!['base', 'from', 'to', 'message'].includes(name)) throw new Error(`unknown option: ${key}`);
    const value = argv[i + 1];
    if (!value || value.startsWith('--')) throw new Error(`${key} needs a value`);
    out[name] = value;
    i += 1;
  }
  for (const required of ['base', 'from', 'to']) {
    if (!out[required]) throw new Error(`--${required} is required`);
  }
  return out;
};

/** Tracked paths in a revision. */
const tracked = (rev, cwd = REPO_ROOT) => git(['ls-tree', '-r', '--name-only', '-z', rev], cwd).split('\0').filter(Boolean);
const staged = (cwd = REPO_ROOT) => git(['ls-files', '-z'], cwd).split('\0').filter(Boolean);

const shellQuote = (value) => `'${value.replace(/'/g, `'\\''`)}'`;

const renamePaths = (root) => {
  const files = tracked('HEAD', root);
  const pairs = files
    .map((old) => [old, mappath(old)])
    .filter(([old, next]) => old !== next)
    .sort((a, b) => b[0].split('/').length - a[0].split('/').length || b[0].length - a[0].length);

  let collisions = 0;
  for (const [old, next] of pairs) {
    const source = path.join(root, old);
    if (!existsSync(source) && !lstatSync(source, { throwIfNoEntry: false })) continue;
    const target = path.join(root, next);
    if (existsSync(target)) {
      console.log(`  collision: ${old} -> ${next}`);
      collisions += 1;
      continue;
    }
    mkdirSync(path.dirname(target), { recursive: true });
    renameSync(source, target);
    if (lstatSync(target).isSymbolicLink()) {
      const link = mappath(readlinkSync(target));
      rmSync(target);
      symlinkSync(link, target);
    }
  }
  // The rename has to reach the index before later passes can see the new
  // paths; `git ls-tree HEAD` still names the old ones.
  git(['add', '-A'], root);
  return { renamed: pairs.length - collisions, collisions };
};

const transformText = (root) => {
  const files = staged(root).filter((file) => {
    if (isOutOfScope(file) || ALWAYS_EXCLUDED.has(file)) return false;
    const stat = lstatSync(path.join(root, file), { throwIfNoEntry: false });
    return Boolean(stat?.isFile());
  });
  if (files.length === 0) return 0;

  const listFile = path.join(root, '..', `${path.basename(root)}.list`);
  writeFileSync(listFile, files.map((file) => `${file}\0`).join(''));
  const batch = (command) =>
    execFileSync('sh', ['-c', `xargs -0 -n 200 ${command} < ${shellQuote(listFile)}`], {
      cwd: root,
      maxBuffer: 64 * 1024 * 1024,
    });

  batch(`sed -i '' ${SED_RULES.map((rule) => `-e ${shellQuote(rule)}`).join(' ')}`);
  batch(
    `sed -i '' -E ${[
      `-e ${shellQuote(`s/${PREFIX_RULES[0]}/\\1mg-/g`)}`,
      `-e ${shellQuote(`s/${PREFIX_RULES[1]}/\\1MG-/g`)}`,
    ].join(' ')}`,
  );
  batch(`perl -i -pe ${shellQuote(TOKEN_RULES.join('\n'))}`);
  rmSync(listFile, { force: true });
  git(['add', '-A'], root);
  return files.length;
};

const copyEntries = (sourceRoot, targetRoot, skip) => {
  let copied = 0;
  for (const file of staged(sourceRoot)) {
    if (skip.has(file) || ALWAYS_EXCLUDED.has(file)) continue;
    const source = path.join(sourceRoot, file);
    const stat = lstatSync(source, { throwIfNoEntry: false });
    if (!stat) continue;
    const target = path.join(targetRoot, file);
    mkdirSync(path.dirname(target), { recursive: true });
    rmSync(target, { force: true, recursive: false });
    if (stat.isSymbolicLink()) {
      symlinkSync(readlinkSync(source), target);
    } else {
      cpSync(source, target);
    }
    copied += 1;
  }
  return copied;
};

const removeUpstreamDeletions = (baseRoot, fromRoot, toRoot, skip) => {
  const from = new Set(staged(fromRoot).map(mappath));
  const to = new Set(staged(toRoot).map(mappath));
  let removed = 0;
  for (const file of from) {
    if (to.has(file) || skip.has(file)) continue;
    const target = path.join(baseRoot, file);
    if (!existsSync(target)) continue;
    rmSync(target, { force: true });
    removed += 1;
  }
  return removed;
};

const forkOwnedAssets = (base, from) => {
  const changed = git(['diff', '--name-only', from, base]).split('\n').filter(Boolean);
  const assets = changed.filter((file) => ASSET_EXT.test(file));
  return new Set(assets);
};

const main = (argv) => {
  const { base, from, to, message, dryRun } = parseArgs(argv);
  const scratch = mkdtempSync(path.join(os.tmpdir(), 'magio-sync-'));
  const baseRoot = path.join(scratch, 'base');
  const fromRoot = path.join(scratch, 'from');
  const toRoot = path.join(scratch, 'to');
  let baseWorktree = false;
  let fromWorktree = false;
  let toWorktree = false;

  try {
    git(['worktree', 'add', '--detach', baseRoot, base]);
    baseWorktree = true;
    git(['worktree', 'add', '--detach', fromRoot, from]);
    fromWorktree = true;
    git(['worktree', 'add', '--detach', toRoot, to]);
    toWorktree = true;

    console.log(`── sync-upstream  base=${base}  ${from} -> ${to}`);
    console.log(`  fork-owned assets: ${forkOwnedAssets(base, from).size}`);

    const renamed = renamePaths(toRoot);
    console.log(`  renamed paths: ${renamed.renamed}, collisions: ${renamed.collisions}`);
    if (renamed.collisions > 0) throw new Error('path mapping collided; resolve before syncing');

    const textFiles = transformText(toRoot);
    console.log(`  transformed text files: ${textFiles}`);

    const skip = forkOwnedAssets(base, from);
    const copied = copyEntries(toRoot, baseRoot, skip);
    const removed = removeUpstreamDeletions(baseRoot, fromRoot, toRoot, skip);
    console.log(`  copied: ${copied}, removed: ${removed}`);

    if (dryRun) {
      console.log('  dry run: no commit created');
      return;
    }

    git(['add', '-A'], baseRoot);
    const tree = git(['write-tree'], baseRoot).trim();
    const commit = git([
      'commit-tree',
      tree,
      '-p',
      base,
      '-p',
      to,
      '-m',
      message ?? `sync: rebranded upstream ${to}`,
    ]).trim();
    console.log(`  projection commit: ${commit}`);
    console.log(`  merge with: git merge --no-commit ${commit}`);
  } finally {
    for (const [dir, added] of [
      [baseRoot, baseWorktree],
      [fromRoot, fromWorktree],
      [toRoot, toWorktree],
    ]) {
      if (added) {
        try {
          git(['worktree', 'remove', '--force', dir]);
        } catch {
          // The temporary worktree may already be gone after a failed setup.
        }
      }
    }
    rmSync(scratch, { recursive: true, force: true });
    try {
      git(['worktree', 'prune']);
    } catch {
      // Pruning is cleanup only.
    }
  }
};

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(`sync-upstream: ${error.message}`);
  process.exitCode = 1;
}
