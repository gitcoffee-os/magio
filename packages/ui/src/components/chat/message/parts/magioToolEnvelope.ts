import { z } from 'zod';

import type { ToolInput } from '@/lib/opencode/model';

/**
 * Reading what Magio's own agent tools answered, for the chat to show
 * it in their own words. The tools answer one envelope
 * (`packages/web/server/lib/agent-tool/runtime.js`): `{ schemaVersion, ok,
 * action, data }` on success, `error.message` on failure. Behind Code Mode the
 * envelope is what the `execute` script returned, which is usually that text
 * as is, sometimes the same JSON quoted once more, and sometimes something
 * else the script made of it; anything that is not an envelope reads as
 * `null`, and the row shows its plain output.
 */

const envelopeSchema = z.object({
  ok: z.boolean(),
  action: z.string().min(1),
  data: z.unknown().optional(),
  error: z.object({ message: z.string().optional() }).passthrough().optional().catch(undefined),
});

export type MagioEnvelope = {
  ok: boolean;
  action: string;
  data: unknown;
  errorMessage: string | undefined;
};

const jsonText = z.string().transform((text, context) => {
  try {
    return z.json().parse(JSON.parse(text));
  } catch {
    context.addIssue({ code: 'custom', message: 'not JSON' });
    return z.NEVER;
  }
});

export const parseMagioEnvelope = (output: string | undefined): MagioEnvelope | null => {
  const outer = jsonText.safeParse(output?.trim() ?? '');
  if (!outer.success) return null;
  // The envelope as text, or that text quoted once more.
  const inner = jsonText.safeParse(outer.data);
  const parsed = envelopeSchema.safeParse(inner.success ? inner.data : outer.data);
  if (!parsed.success) return null;
  return {
    ok: parsed.data.ok,
    action: parsed.data.action,
    data: parsed.data.data,
    errorMessage: parsed.data.error?.message?.trim() || undefined,
  };
};

const text = z.string().trim().min(1).optional().catch(undefined);

export const linkedSchema = z.object({
  linked: z.object({
    id: text,
    number: z.number().optional().catch(undefined),
    title: text,
    url: z.string().url(),
    kind: text,
  }),
});

export const dispatchedSchema = z.object({
  sessionId: z.string().min(1),
  directory: text,
  title: text,
  agent: text,
  model: z.object({ providerID: text, modelID: text }).optional().catch(undefined),
});

export const movedSchema = z.object({
  sessionId: z.string().min(1),
  directory: text,
  worktree: z.object({ name: text, branch: text, path: text }).optional().catch(undefined),
});

export const memorySavedSchema = z.object({
  memory: z.object({
    title: text,
    type: z.enum(['fact', 'preference', 'reference']).optional().catch(undefined),
    scope: z.enum(['global', 'project']).optional().catch(undefined),
  }),
  replaced: z.boolean().optional().catch(undefined),
  // Stored, but held back from future sessions.
  warning: text,
});

export const knowledgeSavedSchema = z.object({
  todo: z.object({ text: text, completed: z.boolean().optional().catch(undefined) }).optional().catch(undefined),
  note: z.object({ body: text }).optional().catch(undefined),
  plan: z.object({ title: text, path: text }).optional().catch(undefined),
  // A plan saved without its steps checklist.
  warning: text,
}).refine((saved) => Boolean(saved.todo?.text || saved.note?.body || saved.plan?.path), 'nothing to show');

const scheduledTaskSchema = z.object({
  name: text,
  enabled: z.boolean().optional().catch(undefined),
  schedule: z.object({
    kind: z.enum(['daily', 'weekly', 'once', 'cron']),
    times: z.array(z.string()).optional().catch(undefined),
    time: text,
    date: text,
    weekdays: z.array(z.number()).optional().catch(undefined),
    cron: text,
    timezone: text,
  }),
});

export const scheduledSchema = z.object({ task: scheduledTaskSchema });

const notifiedSchema = z.object({ delivered: z.boolean() });

export const projectsListedSchema = z.object({
  projects: z.array(z.object({ id: z.string(), path: text, label: text })),
});

export const sessionsListedSchema = z.object({
  sessions: z.array(z.object({
    id: z.string().min(1),
    title: text,
    parentID: text,
    time: z.object({ updated: z.number().optional().catch(undefined) }).optional().catch(undefined),
    location: z.object({ directory: text }).optional().catch(undefined),
  })),
});

const modelRefSchema = z.object({ providerID: z.string(), modelID: z.string() });

export const modelPreferencesSchema = z.object({
  defaultModel: text,
  defaultVariant: text,
  defaultAgent: text,
  favoriteModels: z.array(modelRefSchema).catch([]),
  recentModels: z.array(modelRefSchema).catch([]),
});

export const modelsFoundSchema = z.object({
  models: z.array(z.object({ id: z.string().min(1), name: text, provider: text })),
  total: z.number().optional().catch(undefined),
  // Where the next page starts; null on the last page.
  next: z.number().nullable().optional().catch(undefined),
});

export const memoriesListedSchema = z.object({
  memories: z.array(z.object({
    memoryId: z.string(),
    title: text,
    type: z.enum(['fact', 'preference', 'reference']).optional().catch(undefined),
    scope: z.enum(['global', 'project']).optional().catch(undefined),
  })),
  // A scope that failed to load: its entries are missing from the list.
  globalUnavailable: z.boolean().optional().catch(undefined),
  projectUnavailable: z.boolean().optional().catch(undefined),
});

export const knowledgeListedSchema = z.object({
  notes: z.array(z.object({ id: z.string(), body: text })).catch([]),
  todos: z.array(z.object({ id: z.string(), text: text, completed: z.boolean().optional().catch(undefined) })).catch([]),
  plans: z.array(z.object({
    id: z.string(),
    title: text,
    path: text,
    progress: z.object({ done: z.number(), total: z.number() }).optional().catch(undefined),
  })).catch([]),
});

export const scheduleListedSchema = z.object({
  tasks: z.array(scheduledTaskSchema.extend({ id: z.string() })),
});

export const pageOpenedSchema = z.object({ url: z.string().url(), title: text });

export const screenshotSchema = z.object({
  path: z.string().trim().min(1),
  url: z.string().url().optional().catch(undefined),
  title: text,
});

const windowSchema = z.object({
  usedPercent: z.number().nullable().catch(null),
  remainingPercent: z.number().nullable().catch(null),
  resetAt: z.number().nullable().catch(null),
  resetAtFormatted: z.string().nullable().optional().catch(null),
  resetAfterFormatted: z.string().nullable().optional().catch(null),
}).passthrough();

export const usageSchema = z.object({
  providers: z.array(z.object({
    providerId: z.string(),
    providerName: text,
    ok: z.boolean(),
    error: text,
    usage: z.object({ windows: z.record(z.string(), windowSchema).optional().catch(undefined) }).nullable().optional().catch(null),
  })),
});

type UsageProviderRow = z.infer<typeof usageSchema>['providers'][number];
type UsageWindowRow = z.infer<typeof windowSchema>;

/**
 * The window of a provider that is closest to its limit: the one a person
 * glancing at the row needs. Windows without a share (a credit balance) are
 * skipped; a provider with none of them has nothing to draw.
 */
export const tightestWindow = (provider: UsageProviderRow): { key: string; window: UsageWindowRow } | null => {
  let best: { key: string; window: UsageWindowRow } | null = null;
  for (const [key, window] of Object.entries(provider.usage?.windows ?? {})) {
    if (window.usedPercent === null) continue;
    if (!best || window.usedPercent > (best.window.usedPercent ?? -1)) best = { key, window };
  }
  return best;
};

const VIEW_SCHEMAS: ReadonlyMap<string, z.ZodType> = new Map<string, z.ZodType>([
  ['session.link', linkedSchema],
  ['session.create', dispatchedSchema],
  ['session.send', dispatchedSchema],
  ['session.fork', dispatchedSchema],
  ['session.moveToWorktree', movedSchema],
  ['memory.save', memorySavedSchema],
  ['knowledge.save', knowledgeSavedSchema],
  ['schedule.create', scheduledSchema],
  ['schedule.update', scheduledSchema],
  ['notify.send', notifiedSchema],
  ['usage.read', usageSchema],
  ['projects.list', projectsListedSchema],
  ['session.list', sessionsListedSchema],
  ['models.list', modelPreferencesSchema],
  ['models.search', modelsFoundSchema],
  ['memory.list', memoriesListedSchema],
  ['knowledge.list', knowledgeListedSchema],
  ['schedule.list', scheduleListedSchema],
  ['browser.open', pageOpenedSchema],
  ['browser.capture', screenshotSchema],
]);

/**
 * Whether the chat has a view of its own for this answer: a successful action
 * it knows, with the data that view reads. Anything else keeps the plain
 * output, so a changed answer never leaves the row empty.
 */
export const hasMagioView = (envelope: MagioEnvelope): boolean => {
  if (!envelope.ok) return false;
  const schema = VIEW_SCHEMAS.get(envelope.action);
  return schema ? schema.safeParse(envelope.data).success : false;
};
/** The verb key of each Magio tool action, for the row's subtitle once the action succeeded. */
export const MAGIO_ACTION_VERB_KEYS = {
  'projects.list': 'chat.toolPart.magio.action.projectsList',
  'models.list': 'chat.toolPart.magio.action.modelsList',
  'models.search': 'chat.toolPart.magio.action.modelsSearch',
  'session.list': 'chat.toolPart.magio.action.sessionList',
  'session.create': 'chat.toolPart.magio.action.sessionCreate',
  'session.send': 'chat.toolPart.magio.action.sessionSend',
  'session.fork': 'chat.toolPart.magio.action.sessionFork',
  'session.status': 'chat.toolPart.magio.action.sessionStatus',
  'session.messages': 'chat.toolPart.magio.action.sessionMessages',
  'session.moveToWorktree': 'chat.toolPart.magio.action.sessionMoveToWorktree',
  'session.link': 'chat.toolPart.magio.action.sessionLink',
  'pr.watch': 'chat.toolPart.magio.action.prWatch',
  'pr.unwatch': 'chat.toolPart.magio.action.prUnwatch',
  'work.name': 'chat.toolPart.magio.action.workName',
  'file.open': 'chat.toolPart.magio.action.fileOpen',
  'schedule.list': 'chat.toolPart.magio.action.scheduleList',
  'schedule.create': 'chat.toolPart.magio.action.scheduleCreate',
  'schedule.update': 'chat.toolPart.magio.action.scheduleUpdate',
  'schedule.run': 'chat.toolPart.magio.action.scheduleRun',
  'schedule.delete': 'chat.toolPart.magio.action.scheduleDelete',
  'schedule.toggle': 'chat.toolPart.magio.action.scheduleToggle',
  'knowledge.list': 'chat.toolPart.magio.action.knowledgeList',
  'knowledge.save': 'chat.toolPart.magio.action.knowledgeSave',
  'knowledge.delete': 'chat.toolPart.magio.action.knowledgeDelete',
  'knowledge.show': 'chat.toolPart.magio.action.knowledgeShow',
  'memory.read': 'chat.toolPart.magio.action.memoryRead',
  'memory.list': 'chat.toolPart.magio.action.memoryList',
  'memory.save': 'chat.toolPart.magio.action.memorySave',
  'memory.delete': 'chat.toolPart.magio.action.memoryDelete',
  'notify.send': 'chat.toolPart.magio.action.notifySend',
  'usage.read': 'chat.toolPart.magio.action.usageRead',
  'browser.open': 'chat.toolPart.magio.action.browserOpen',
  'browser.snapshot': 'chat.toolPart.magio.action.browserSnapshot',
  'browser.click': 'chat.toolPart.magio.action.browserClick',
  'browser.type': 'chat.toolPart.magio.action.browserType',
  'browser.select': 'chat.toolPart.magio.action.browserSelect',
  'browser.scroll': 'chat.toolPart.magio.action.browserScroll',
  'browser.back': 'chat.toolPart.magio.action.browserBack',
  'browser.forward': 'chat.toolPart.magio.action.browserForward',
  'browser.inspect': 'chat.toolPart.magio.action.browserInspect',
  'browser.capture': 'chat.toolPart.magio.action.browserCapture',
  'browser.resize': 'chat.toolPart.magio.action.browserResize',
  'browser.close': 'chat.toolPart.magio.action.browserClose',
  'image.generate': 'chat.toolPart.magio.action.imageGenerate',
  'render.page': 'chat.toolPart.magio.action.renderPage',
  'secret.request': 'chat.toolPart.magio.action.secretRequest',
  'workflow.check': 'chat.toolPart.magio.action.workflowCheck',
  'workflow.run': 'chat.toolPart.magio.action.workflowRun',
  'workflow.status': 'chat.toolPart.magio.action.workflowStatus',
  'workflow.result': 'chat.toolPart.magio.action.workflowResult',
  'workflow.stop': 'chat.toolPart.magio.action.workflowStop',
  'workflow.resume': 'chat.toolPart.magio.action.workflowResume',
  'workflow.save': 'chat.toolPart.magio.action.workflowSave',
  'workflow.list': 'chat.toolPart.magio.action.workflowList',
} as const;

const VERB_KEYS = new Map(Object.entries(MAGIO_ACTION_VERB_KEYS));

/** The verb key of an action, or `undefined` for one without a verb. */
export const magioVerbKey = (action: string | undefined) => (action ? VERB_KEYS.get(action) : undefined);

/** What the views read from a call's input, inside `parameters` or beside `action`, as the plugin reads it. */
const callFields = z.object({
  projectId: text,
  directory: text,
  title: text,
  body: text,
  carry: z.array(z.string()).optional().catch(undefined),
});
const callInputSchema = callFields.extend({ parameters: callFields.optional().catch(undefined) }).catch({});

export type MagioCallInput = z.infer<typeof callFields>;

export const readMagioCallInput = (input: ToolInput | undefined): MagioCallInput => {
  const parsed = callInputSchema.parse(input ?? {});
  return {
    projectId: parsed.parameters?.projectId ?? parsed.projectId,
    directory: parsed.parameters?.directory ?? parsed.directory,
    title: parsed.parameters?.title ?? parsed.title,
    body: parsed.parameters?.body ?? parsed.body,
    carry: parsed.parameters?.carry ?? parsed.carry,
  };
};
