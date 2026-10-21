import { describe, expect, test } from 'bun:test';

import {
  compareMagioVersions,
  hostMeetsMagioEngine,
  magioEngineMinimum,
  parseMagioVersion,
} from './host-version.ts';

describe('magio host version', () => {
  test('parses core semver', () => {
    expect(parseMagioVersion('1.22.0')).toEqual({ major: 1, minor: 22, patch: 0 });
    expect(parseMagioVersion('v1.22.0-beta.1')).toEqual({ major: 1, minor: 22, patch: 0 });
    expect(parseMagioVersion('junk')).toBeNull();
  });

  test('compares versions', () => {
    expect(compareMagioVersions('1.22.0', '1.21.9')).toBeGreaterThan(0);
    expect(compareMagioVersions('1.22.0', '1.22.0')).toBe(0);
    expect(compareMagioVersions('1.21.0', '1.22.0')).toBeLessThan(0);
  });

  test('normalizes engines.magio floors', () => {
    expect(magioEngineMinimum('1.22.0')).toBe('1.22.0');
    expect(magioEngineMinimum('>=1.22.0')).toBe('1.22.0');
    expect(magioEngineMinimum('^1.22.0')).toBeNull();
  });

  test('checks host against engines.magio', () => {
    expect(hostMeetsMagioEngine('1.22.0', '>=1.22.0')).toBe(true);
    expect(hostMeetsMagioEngine('1.22.0', '1.22.0')).toBe(true);
    expect(hostMeetsMagioEngine('1.21.9', '>=1.22.0')).toBe(false);
    expect(hostMeetsMagioEngine('unknown', '>=1.22.0')).toBe(false);
  });
});
