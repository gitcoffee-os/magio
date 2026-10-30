import { createConfiguredWebAPIs } from './runtimeConfig';
import type { RuntimeAPIs } from '@magio/ui/lib/api/types';
import '@magio/ui/index.css';
import '@magio/ui/styles/fonts';
import '@magio/ui/styles/katex-css';
import { importWithChunkRecovery } from '@magio/ui/lib/chunkLoadRecovery';

declare global {
  interface Window {
    __MAGIO_RUNTIME_APIS__?: RuntimeAPIs;
  }
}

window.__MAGIO_RUNTIME_APIS__ = createConfiguredWebAPIs();

// Tried again, then reloaded once, when a module fails to load.
void importWithChunkRecovery(() => import('@magio/ui/apps/renderMobileApp'))
  .then(({ renderMobileApp }) => {
    renderMobileApp(window.__MAGIO_RUNTIME_APIS__ ?? createConfiguredWebAPIs());
  });
