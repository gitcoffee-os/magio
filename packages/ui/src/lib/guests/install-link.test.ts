import { describe, expect, test } from 'bun:test';

import { parseExtensionInstallLink } from './install-link.ts';

describe('parseExtensionInstallLink', () => {
  test('reads a repository and a folder', () => {
    expect(parseExtensionInstallLink('magio://extensions/install?url=https%3A%2F%2Fgithub.com%2Fa%2Fb')).toEqual({ kind: 'url', source: 'https://github.com/a/b' });
    expect(parseExtensionInstallLink('magio://extensions/install?path=/Users/me/my%20ext')).toEqual({ kind: 'path', source: '/Users/me/my ext' });
  });

  test('refuses anything else', () => {
    for (const href of [
      'magio://session/ses_1',
      'magio://extensions/install',
      'magio://extensions/install?url=http://example.com/a',
      'magio://extensions/install?url=file:///etc/passwd',
      'magio://extensions/install?path=relative/folder',
    ]) expect(parseExtensionInstallLink(href)).toBeNull();
  });
});
