import { describe, expect, it } from 'vitest';

import { INJECTED_ENV_KEY, assignInjectedEnv, injectedEnvKeys, withUserEnv, withoutInjectedEnv } from './injected-env.js';

describe('assignInjectedEnv', () => {
  it('sets the values and records their names', () => {
    const env = { PATH: '/usr/bin' };

    expect(assignInjectedEnv(env, { MAGIO_RUNTIME: 'desktop', MAGIO_DESKTOP_NOTIFY: 'true' })).toBe(env);

    expect(env).toEqual({
      PATH: '/usr/bin',
      MAGIO_RUNTIME: 'desktop',
      MAGIO_DESKTOP_NOTIFY: 'true',
      [INJECTED_ENV_KEY]: 'MAGIO_RUNTIME,MAGIO_DESKTOP_NOTIFY',
    });
    expect(injectedEnvKeys(env)).toEqual(new Set(['MAGIO_RUNTIME', 'MAGIO_DESKTOP_NOTIFY', INJECTED_ENV_KEY]));
  });

  it('leaves a value the shell already had as the user\'s', () => {
    const env = { OPENCODE_PASSWORD: 'theirs', MAGIO_SKIP_API_COMPRESSION: 'false' };

    assignInjectedEnv(env, {
      OPENCODE_PASSWORD: 'theirs',
      OPENCODE_SERVER_PASSWORD: 'theirs',
      MAGIO_SKIP_API_COMPRESSION: env.MAGIO_SKIP_API_COMPRESSION || 'true',
    });

    expect(env.MAGIO_SKIP_API_COMPRESSION).toBe('false');
    expect(injectedEnvKeys(env)).toEqual(new Set(['OPENCODE_SERVER_PASSWORD', INJECTED_ENV_KEY]));
  });

  it('adds to a record inherited from the parent process', () => {
    const env = assignInjectedEnv({}, { MAGIO_RUNTIME: 'desktop' });
    const child = assignInjectedEnv({ ...env }, { OPENCODE_CONFIG: '/tmp/opencode.json', MAGIO_RUNTIME: 'desktop' });

    expect(child[INJECTED_ENV_KEY]).toBe('MAGIO_RUNTIME,OPENCODE_CONFIG');
    expect(env[INJECTED_ENV_KEY]).toBe('MAGIO_RUNTIME');
  });

  it('skips undefined values and writes no record when nothing changed', () => {
    const env = { MAGIO_HOST: '0.0.0.0' };

    assignInjectedEnv(env, { MAGIO_UI_PASSWORD: undefined, MAGIO_HOST: '0.0.0.0' });

    expect(env).toEqual({ MAGIO_HOST: '0.0.0.0' });
    expect(injectedEnvKeys(env).size).toBe(0);
  });
});

describe('injectedEnvKeys', () => {
  it('ignores a malformed record', () => {
    expect(injectedEnvKeys({ [INJECTED_ENV_KEY]: '' }).size).toBe(0);
    expect(injectedEnvKeys({ [INJECTED_ENV_KEY]: ',,' })).toEqual(new Set([INJECTED_ENV_KEY]));
  });
});

describe('withoutInjectedEnv', () => {
  it('drops what Magio put into the shell and keeps the user\'s own', () => {
    const env = assignInjectedEnv({ PATH: '/usr/bin', OPENCODE_PASSWORD: 'theirs' }, {
      MAGIO_DIST_DIR: '/Applications/Magio.app/web-dist',
      MAGIO_UI_PASSWORD: 'desktop',
      OPENCODE_PASSWORD: 'theirs',
    });

    expect(withoutInjectedEnv(env)).toEqual({ PATH: '/usr/bin', OPENCODE_PASSWORD: 'theirs' });
    expect(withoutInjectedEnv({ PATH: '/usr/bin' })).toEqual({ PATH: '/usr/bin' });
  });
});

describe('withUserEnv', () => {
  it('hands a value over as the user\'s own, so a server started with it keeps it', () => {
    const env = assignInjectedEnv({ PATH: '/usr/bin' }, { MAGIO_UI_PASSWORD: 'old', MAGIO_RUNTIME: 'web' });

    const next = withUserEnv(env, { MAGIO_UI_PASSWORD: 'kept' });

    expect(withoutInjectedEnv(next)).toEqual({ PATH: '/usr/bin', MAGIO_UI_PASSWORD: 'kept' });
    expect(withoutInjectedEnv(withUserEnv({ A: '1' }, { B: '2' }))).toEqual({ A: '1', B: '2' });
  });
});
