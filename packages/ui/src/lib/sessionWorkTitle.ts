import { z } from 'zod';
import type { Metadata } from '@/lib/opencode/model';

/**
 * Who named a task in the main checkout, under `metadata.magio.workTitle`
 * of its root session: the agent through the magio tool's `work.name`,
 * or the user by renaming the session. The server reads it so an agent never
 * renames what the user named (`web/server/lib/magio-sessions/work-naming.js`).
 */
const magioSchema = z.object({ magio: z.record(z.string(), z.json()) });

/** The metadata after the user named the session `title`. */
export function withUserWorkTitle(metadata: Metadata, title: string): Metadata {
  const namespace = magioSchema.safeParse(metadata).data?.magio ?? {};
  return { ...metadata, magio: { ...namespace, workTitle: { title, by: 'user' } } };
}
