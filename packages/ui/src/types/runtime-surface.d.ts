import type { HostedSurface } from '@/lib/runtimeSurface';

declare global {
  interface Window {
    __MAGIO_SURFACE__?: HostedSurface;
  }
}
