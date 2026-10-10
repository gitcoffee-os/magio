import { describe, expect, test } from 'bun:test';
import type { Session } from '@/lib/opencode/model';
import {
  getBtwBoundaryMessageID,
  getBtwOriginalSessionID,
  getBtwSessionID,
  isBtwSession,
  withBtwSessionLink,
  withBtwSessionMarker,
  withoutBtwSessionLink,
  wasPromotedBtwSession,
  withoutBtwSessionMarker,
} from './sessionBtwMetadata';

const sessionWith = (metadata: unknown): Session => ({ id: 's', metadata }) as unknown as Session;

describe('parent link', () => {
  test('withBtwSessionLink preserves unrelated magio metadata', () => {
    const next = withBtwSessionLink({ magio: { reviewSessionID: 'r-1' }, other: 1 }, 'fork-1');
    expect(next).toEqual({ magio: { reviewSessionID: 'r-1', btwSessionID: 'fork-1' }, other: 1 });
  });

  test('getBtwSessionID reads the link and rejects blank values', () => {
    expect(getBtwSessionID(sessionWith({ magio: { btwSessionID: 'fork-1' } }))).toBe('fork-1');
    expect(getBtwSessionID(sessionWith({ magio: { btwSessionID: '  ' } }))).toBeNull();
    expect(getBtwSessionID(sessionWith(undefined))).toBeNull();
    expect(getBtwSessionID(null)).toBeNull();
  });

  test('withoutBtwSessionLink removes only a matching link', () => {
    const linked = { magio: { btwSessionID: 'fork-1', reviewSessionID: 'r-1' } };
    expect(withoutBtwSessionLink(linked, 'fork-2')).toBe(linked);
    expect(withoutBtwSessionLink(linked, 'fork-1')).toEqual({ magio: { reviewSessionID: 'r-1' } });
  });

  test('withoutBtwSessionLink drops an emptied magio object', () => {
    expect(withoutBtwSessionLink({ magio: { btwSessionID: 'fork-1' } }, 'fork-1')).toEqual({});
  });
});

describe('fork marker', () => {
  test('withBtwSessionMarker replaces inherited magio metadata', () => {
    const inherited = { magio: { btwSessionID: 'stale', reviewSessionID: 'r-1' }, other: 1 };
    expect(withBtwSessionMarker(inherited, 'parent-1', 'msg-9')).toEqual({
      magio: { kind: 'btw', originalSessionID: 'parent-1', btwBoundaryMessageID: 'msg-9' },
      other: 1,
    });
  });

  test('withBtwSessionMarker omits a null boundary (empty parent)', () => {
    expect(withBtwSessionMarker({}, 'parent-1', null)).toEqual({
      magio: { kind: 'btw', originalSessionID: 'parent-1' },
    });
  });

  test('marker readers only apply to btw-kind sessions', () => {
    const fork = sessionWith({ magio: { kind: 'btw', originalSessionID: 'parent-1', btwBoundaryMessageID: 'msg-9' } });
    expect(isBtwSession(fork)).toBe(true);
    expect(getBtwOriginalSessionID(fork)).toBe('parent-1');
    expect(getBtwBoundaryMessageID(fork)).toBe('msg-9');

    const review = sessionWith({ magio: { kind: 'review', originalSessionID: 'parent-1', btwBoundaryMessageID: 'msg-9' } });
    expect(isBtwSession(review)).toBe(false);
    expect(getBtwOriginalSessionID(review)).toBeNull();
    expect(getBtwBoundaryMessageID(review)).toBeNull();
  });

  test('withoutBtwSessionMarker strips the marker, keeps other keys, and records the promotion', () => {
    const marked = { magio: { kind: 'btw', originalSessionID: 'parent-1', btwBoundaryMessageID: 'msg-9', btwSessionID: 'nested' } };
    expect(withoutBtwSessionMarker(marked)).toEqual({ magio: { btwSessionID: 'nested', btwPromoted: true } });
    expect(withoutBtwSessionMarker({ magio: { kind: 'btw', originalSessionID: 'parent-1' } })).toEqual({ magio: { btwPromoted: true } });
    const plain = { magio: { kind: 'review' } };
    expect(withoutBtwSessionMarker(plain)).toBe(plain);
  });

  test('wasPromotedBtwSession only reports a session that went through promotion', () => {
    expect(wasPromotedBtwSession(sessionWith({ magio: { btwPromoted: true } }))).toBe(true);
    // Still a live btw fork: the boundary applies, the notice must not.
    expect(wasPromotedBtwSession(sessionWith({ magio: { kind: 'btw', originalSessionID: 'p-1' } }))).toBe(false);
    expect(wasPromotedBtwSession(sessionWith({ magio: {} }))).toBe(false);
    expect(wasPromotedBtwSession(sessionWith(undefined))).toBe(false);
    expect(wasPromotedBtwSession(null)).toBe(false);
  });
});
