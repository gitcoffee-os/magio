import { describe, expect, it } from 'vitest';

import { createDevServerWatchCommand } from './dev-server-watch.mjs';

describe('createDevServerWatchCommand', () => {
  it('uses the package default port and disables relay hosting by default', () => {
    const command = createDevServerWatchCommand({
      platform: 'win32',
      env: {},
      bunExecutable: '/opt/bun/bin/bun',
    });

    expect(command.command).toBe('/opt/bun/bin/bun');
    expect(command.args).toEqual(['--watch', 'server/index.js', '--port', '3001']);
    expect(command.spawnOptions.env.MAGIO_RELAY_HOST).toBe('off');
    expect(command.spawnOptions.windowsHide).toBe(true);
  });

  it('passes the configured port and relay host to the Bun watcher', () => {
    const command = createDevServerWatchCommand({
      platform: 'win32',
      env: {
        MAGIO_PORT: '58992',
        MAGIO_RELAY_HOST: 'relay.example.test',
      },
      bunExecutable: 'C:\\Tools\\Bun\\bun.exe',
    });

    expect(command.args).toEqual(['--watch', 'server/index.js', '--port', '58992']);
    expect(command.spawnOptions.env.MAGIO_RELAY_HOST).toBe('relay.example.test');
  });

  it('rejects an invalid configured port before spawning', () => {
    expect(() => createDevServerWatchCommand({
      platform: 'win32',
      env: { MAGIO_PORT: 'not-a-port' },
      bunExecutable: 'bun',
    })).toThrow(/Invalid MAGIO_PORT/);
  });

  it('preserves the nodemon watcher command outside Windows', () => {
    const command = createDevServerWatchCommand({
      platform: 'linux',
      env: { MAGIO_PORT: '4200' },
      bunExecutable: '/opt/bun/bin/bun',
    });

    expect(command.command).toBe('/opt/bun/bin/bun');
    expect(command.args).toEqual([
      'x',
      'nodemon',
      '--watch',
      'server',
      '--ext',
      'js',
      '--exec',
      'bun server/index.js --port 4200',
    ]);
  });

  it('drops what an Magio app put into the shell and keeps the user\'s own exports', () => {
    const command = createDevServerWatchCommand({
      platform: 'linux',
      env: {
        PATH: '/usr/bin',
        MAGIO_PORT: '4200',
        MAGIO_UI_PASSWORD: 'desktop-secret',
        MAGIO_RUNTIME: 'desktop',
        OPENCODE_PASSWORD: 'theirs',
        MAGIO_INJECTED_ENV: 'MAGIO_UI_PASSWORD,MAGIO_RUNTIME',
      },
      bunExecutable: 'bun',
    });

    const { env } = command.spawnOptions;
    expect(env).not.toHaveProperty('MAGIO_UI_PASSWORD');
    expect(env).not.toHaveProperty('MAGIO_RUNTIME');
    expect(env).not.toHaveProperty('MAGIO_INJECTED_ENV');
    expect(env).toMatchObject({ PATH: '/usr/bin', MAGIO_PORT: '4200', OPENCODE_PASSWORD: 'theirs' });
  });
});
