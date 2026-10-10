import { describe, expect, test } from 'bun:test';

import { resolveProjectActionsOwner } from './useProjectActionsContext';

const projects = [
  { id: 'magio', path: '/workspace/magio', label: 'Magio' },
];

describe('resolveProjectActionsOwner', () => {
  test('resolves a worktree directory to its owning parent project', () => {
    const owner = resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map([
        ['/workspace/magio', [{
          path: '/workspace/magio-feature',
          projectDirectory: '/workspace/magio',
          branch: 'feature',
          label: 'feature',
        }]],
      ]),
      directory: '/workspace/magio-feature',
      activeProjectId: null,
    });

    expect(owner).toEqual(projects[0]);
  });

  test('resolves a directory under the project path to that project', () => {
    const owner = resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map(),
      directory: '/workspace/magio/packages/ui',
      activeProjectId: null,
    });

    expect(owner).toEqual(projects[0]);
  });

  test('falls back to the active project when the directory does not resolve', () => {
    const owner = resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map(),
      directory: '/some/other/project',
      activeProjectId: 'magio',
    });

    expect(owner).toEqual(projects[0]);
  });

  test('falls back to the active project when the directory is empty or null', () => {
    expect(resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map(),
      directory: '',
      activeProjectId: 'magio',
    })).toEqual(projects[0]);

    expect(resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map(),
      directory: null,
      activeProjectId: 'magio',
    })).toEqual(projects[0]);
  });

  test('returns null when the directory does not resolve and the active project is unknown', () => {
    const owner = resolveProjectActionsOwner({
      projects,
      worktreesByProject: new Map(),
      directory: '/some/other/project',
      activeProjectId: 'missing-project',
    });

    expect(owner).toBeNull();
  });
});
