import { createConfiguredWebAPIs } from './runtimeConfig';
import type { RuntimeAPIs } from '@magio/ui/lib/api/types';
import '@magio/ui/index.css';
import '@magio/ui/styles/fonts';
import '@magio/ui/styles/katex-css';

declare global {
  interface Window {
    __MAGIO_RUNTIME_APIS__?: RuntimeAPIs;
  }
}

window.__MAGIO_RUNTIME_APIS__ = createConfiguredWebAPIs();

void import('@magio/ui/apps/renderElectronMiniChatApp')
  .then(({ renderElectronMiniChatApp }) => {
    renderElectronMiniChatApp(window.__MAGIO_RUNTIME_APIS__ ?? createConfiguredWebAPIs());
  });
