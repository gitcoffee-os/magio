import type { Metadata, Session } from '@/lib/opencode/model';

export type SessionMetadataRecord = Metadata;

type MagioMetadata = {
  kind?: 'review';
  originalSessionID?: string;
  reviewSessionID?: string;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

export const getSessionMetadata = (session: Session | null | undefined): SessionMetadataRecord => (
  session?.metadata ?? {}
);

const getMagioMetadata = (metadata: SessionMetadataRecord): MagioMetadata => {
  const value = metadata.magio;
  return isRecord(value) ? value as MagioMetadata : {};
};

export const getReviewSessionID = (session: Session | null | undefined): string | null => {
  const value = getMagioMetadata(getSessionMetadata(session)).reviewSessionID;
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
};

export const getOriginalSessionID = (session: Session | null | undefined): string | null => {
  const value = getMagioMetadata(getSessionMetadata(session)).originalSessionID;
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
};

export const isReviewSession = (session: Session | null | undefined): boolean =>
  getMagioMetadata(getSessionMetadata(session)).kind === 'review' && Boolean(getOriginalSessionID(session));

export const withReviewSessionLink = (
  metadata: SessionMetadataRecord,
  reviewSessionID: string,
): SessionMetadataRecord => {
  const current = getMagioMetadata(metadata);
  return {
    ...metadata,
    magio: {
      ...current,
      reviewSessionID,
    },
  };
};

export const withReviewSessionMarker = (
  metadata: SessionMetadataRecord,
  originalSessionID: string,
): SessionMetadataRecord => {
  const current = getMagioMetadata(metadata);
  return {
    ...metadata,
    magio: {
      ...current,
      kind: 'review' as const,
      originalSessionID,
    },
  };
};

export const withoutReviewSessionLink = (
  metadata: SessionMetadataRecord,
  reviewSessionID: string,
): SessionMetadataRecord => {
  const current = getMagioMetadata(metadata);
  if (current.reviewSessionID !== reviewSessionID) return metadata;

  const restMagio = { ...current };
  delete restMagio.reviewSessionID;
  const next: SessionMetadataRecord = { ...metadata };
  if (Object.keys(restMagio).length > 0) {
    next.magio = restMagio;
  } else {
    delete next.magio;
  }
  return next;
};
