import { subscribemagioEvents, type ControlStreamSyncEvent } from '@/lib/magioEvents';
import { getRuntimeKey } from '@/lib/runtime-switch';
import { useWorkflowRunsStore } from '@/lib/workflows/store';
import { seedGlobalSessionStatusFromHost } from './host-session-status-seed';

/**
 * Magio's own session announcements, from the control stream: the main
 * event stream carries them over the WebSocket and never over SSE, which is
 * OpenCode's own stream. Changes during a gap are not replayed, so each
 * connection of the control stream reads the shown workflow runs again and the
 * host's snapshot, which settles a waiting page whose end was missed.
 */
export const subscribeControlStreamSync = (
  runtimeKey: string,
  apply: (event: ControlStreamSyncEvent) => void,
): (() => void) => subscribemagioEvents((event) => {
  if (runtimeKey !== getRuntimeKey()) return;
  if (event.type === 'event-stream-ready') {
    useWorkflowRunsStore.getState().reloadLoaded();
    void seedGlobalSessionStatusFromHost().catch(() => undefined);
  } else if (event.type === 'control-sync') {
    apply(event.event);
  }
});
