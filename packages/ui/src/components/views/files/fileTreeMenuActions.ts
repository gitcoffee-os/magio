/**
 * The two file-tree menu actions that leave the browser: putting an entry into
 * the conversation, and opening a shell at it.
 *
 * `SidebarFilesTree` and `FilesView` render the same row menu, so the wiring
 * lives here instead of being written twice. Each tree keeps its own path
 * helpers and passes the token it would have used for a drag (root-relative
 * path) or the folder it would upload into — the terminal action is offered
 * for folders only, so files never reach it.
 */

import { useInputStore } from '@/sync/input-store';
import { useTerminalStore } from '@/stores/useTerminalStore';
import { normalizeContextPanelDirectoryKey, useUIStore } from '@/stores/useUIStore';

/**
 * Append `mentionPath` to the composer as a confirmed `@mention` — the same
 * reference a drag from the tree drops into the chat input.
 *
 * The path is queued with its confirmation, because the composer can only
 * resolve a reference it did not see typed when the sender vouches for it:
 * `@docs/my notes.md` stops at the first space and `@Makefile` does not look
 * like a path otherwise.
 *
 * Returns false when the path cannot be referenced — the tree root itself,
 * which a drag refuses as well.
 */
export const addTreeEntryToConversation = (mentionPath: string): boolean => {
  const mention = mentionPath.trim().replace(/^\.\//, '');
  if (!mention || mention === '.') return false;

  useInputStore.getState().setPendingInputText(`@${mention}`, 'append-inline', null, [mention]);
  return true;
};

/**
 * Open the integrated terminal at `targetDirectory` in the context panel that
 * owns `root`. The caller passes a folder as itself — files never reach this
 * action, the row menu offers it for directories only. The panel's terminal
 * tab is a singleton, so this re-points an open terminal the same way the
 * project actions menu does.
 *
 * The target directory's terminal state is seeded first: `TerminalView` never
 * creates state for an explicit target (an inherited target may be stale or
 * not owned by this panel), so a target it does not find would reveal a panel
 * with no shell in it. Project actions seed the same way before revealing.
 */
export const openTreeEntryInIntegratedTerminal = (root: string, targetDirectory: string): void => {
  const panelDirectory = normalizeContextPanelDirectoryKey(root);
  if (!panelDirectory || !targetDirectory) return;

  useTerminalStore.getState().ensureDirectory(targetDirectory);

  useUIStore.getState().openContextPanelTab(panelDirectory, {
    mode: 'terminal',
    targetDirectory,
  });
};
