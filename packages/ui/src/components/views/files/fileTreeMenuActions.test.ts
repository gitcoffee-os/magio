import { beforeEach, describe, expect, test } from 'bun:test';

import { useInputStore } from '@/sync/input-store';
import { useTerminalStore } from '@/stores/useTerminalStore';
import { useUIStore } from '@/stores/useUIStore';
import { addTreeEntryToConversation, openTreeEntryInIntegratedTerminal } from './fileTreeMenuActions';

const getTerminalTab = (directory: string) =>
  (useUIStore.getState().contextPanelByDirectory[directory]?.tabs ?? []).find((tab) => tab.mode === 'terminal');

describe('fileTreeMenuActions add to conversation', () => {
  beforeEach(() => {
    useInputStore.getState().consumePendingInputText();
  });

  test('queues the root-relative path as inline composer text', () => {
    expect(addTreeEntryToConversation('src/app.ts')).toBe(true);

    expect(useInputStore.getState().consumePendingInputText()).toEqual({
      text: '@src/app.ts',
      mode: 'append-inline',
    });
  });

  test('keeps a spaced path whole in the queued text', () => {
    expect(addTreeEntryToConversation('./docs/my notes.md')).toBe(true);

    expect(useInputStore.getState().consumePendingInputText()).toEqual({
      text: '@docs/my notes.md',
      mode: 'append-inline',
    });
  });

  test('refuses the tree root, which a drag refuses as well', () => {
    expect(addTreeEntryToConversation('.')).toBe(false);
    expect(addTreeEntryToConversation('   ')).toBe(false);
    expect(addTreeEntryToConversation('')).toBe(false);

    expect(useInputStore.getState().consumePendingInputText()).toBeNull();
  });

  test('queues a single-word path too', () => {
    addTreeEntryToConversation('Makefile');

    expect(useInputStore.getState().consumePendingInputText()).toEqual({
      text: '@Makefile',
      mode: 'append-inline',
    });
  });
});

describe('fileTreeMenuActions open in integrated terminal', () => {
  beforeEach(() => {
    useUIStore.setState({ contextPanelByDirectory: {} });
    useTerminalStore.getState().clearAll();
  });

  test('reveals the panel terminal pointed at the folder', () => {
    // Both trees offer this action for folders and pass the folder itself.
    openTreeEntryInIntegratedTerminal('/repo/', '/repo/src/deep');

    const panel = useUIStore.getState().contextPanelByDirectory['/repo'];
    const terminal = getTerminalTab('/repo');
    expect(panel?.isOpen).toBe(true);
    expect(terminal?.targetDirectory).toBe('/repo/src/deep');
    expect(panel?.activeTabId).toBe(terminal?.id);
  });

  test('seeds the folder terminal state the panel reveals', () => {
    // TerminalView never creates state for an explicit target, so an unseeded
    // target would open a panel with no shell in it.
    openTreeEntryInIntegratedTerminal('/repo', '/repo/packages/ui');

    expect(getTerminalTab('/repo')?.targetDirectory).toBe('/repo/packages/ui');
    const directoryState = useTerminalStore.getState().getDirectoryState('/repo/packages/ui');
    expect(directoryState?.tabs.length).toBeGreaterThan(0);
    expect(directoryState?.tabs[0]?.purpose).toEqual({ type: 'terminal' });
  });

  test('lets the store collapse a target that is the panel directory itself', () => {
    openTreeEntryInIntegratedTerminal('/repo', '/repo');

    expect(getTerminalTab('/repo')?.targetDirectory).toBeNull();
  });

  test('does nothing without a panel directory or a target', () => {
    openTreeEntryInIntegratedTerminal('', '/repo/src');
    openTreeEntryInIntegratedTerminal('/repo', '');

    expect(useUIStore.getState().contextPanelByDirectory).toEqual({});
    expect(useTerminalStore.getState().getDirectoryState('/repo/src')).toBeUndefined();
  });
});
