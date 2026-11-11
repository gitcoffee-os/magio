import { describe, expect, test } from 'bun:test';

import { MAGIO_ACTION_VERB_KEYS } from '@/components/chat/message/parts/magioToolEnvelope';
import { magioToolOutputI18n } from './magio-tool-output.i18n';

const locales = ['en', 'de', 'fr', 'nl', 'es', 'ja', 'pt-BR', 'uk', 'ko', 'pl', 'zh-CN', 'zh-TW', 'tr', 'ar', 'he'] as const;

describe('Magio tool output translations', () => {
  test('every locale has every key, filled', () => {
    const keys = Object.keys(magioToolOutputI18n.en).sort();
    for (const locale of locales) {
      const dictionary: Record<string, string> = magioToolOutputI18n[locale];
      expect(Object.keys(dictionary).sort()).toEqual(keys);
      for (const key of keys) expect(dictionary[key]?.trim()).toBeTruthy();
    }
  });

  test('every action verb has a key', () => {
    for (const key of Object.values(MAGIO_ACTION_VERB_KEYS)) {
      expect(key in magioToolOutputI18n.en).toBe(true);
    }
  });
});
