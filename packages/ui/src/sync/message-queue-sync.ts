import { subscribemagioEvents } from '@/lib/magioEvents';
import { getRuntimeKey } from '@/lib/runtime-switch';
import { applyMessageQueueUpdatedEvent, useMessageQueueStore } from '@/stores/messageQueueStore';

/** Queue events use the control SSE stream even while OpenCode uses WS. */
export const subscribeMessageQueueSync = (runtimeKey: string): (() => void) => (
  subscribemagioEvents((event) => {
    if (runtimeKey !== getRuntimeKey()) return;
    if (event.type === 'event-stream-ready') {
      void useMessageQueueStore.getState().resync().catch(() => undefined);
    } else if (event.type === 'magio:message-queue.updated') {
      applyMessageQueueUpdatedEvent(event, runtimeKey);
    }
  })
);
