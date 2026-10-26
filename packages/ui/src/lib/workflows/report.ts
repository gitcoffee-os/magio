import { z } from 'zod';

import type { Message } from '@/lib/opencode/model';

/**
 * The report of a workflow run, as the session that proposed it sees it.
 *
 * When a run ends (or the user declines or stops it) the Magio server
 * (`web/server/lib/workflows/runtime.js`) appends one synthetic message to the
 * session, the way a dispatched session reports back
 * (`lib/opencode/dispatched-session`): metadata names the run
 * (`source: "magio-workflow"`) and the text wraps the report in an
 * `<magio-workflow …>` envelope.
 */

export type WorkflowReportState = 'completed' | 'failed' | 'stopped' | 'declined';

export type WorkflowReport = {
  runId: string;
  name: string;
  state: WorkflowReportState;
  /** The report without the envelope. */
  output: string;
};

const metadataSchema = z.object({
  source: z.literal('magio-workflow'),
  runId: z.string().min(1),
  name: z.string(),
  state: z.enum(['completed', 'failed', 'stopped', 'declined']),
});

const ENVELOPE = /^\s*<magio-workflow\b[^>]*>\n?([\s\S]*?)\n?<\/magio-workflow>\s*$/;

/** The workflow run a message reports on, or undefined for any other message. */
export function readWorkflowReport(message: Message): WorkflowReport | undefined {
  if (message.role !== 'synthetic') return undefined;
  const parsed = metadataSchema.safeParse(message.metadata ?? {});
  if (!parsed.success) return undefined;
  const envelope = message.text.match(ENVELOPE);
  return {
    runId: parsed.data.runId,
    name: parsed.data.name,
    state: parsed.data.state,
    output: envelope ? envelope[1] : message.text,
  };
}
