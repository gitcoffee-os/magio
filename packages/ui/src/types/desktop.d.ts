import type { DesktopBootOutcome } from '@/lib/desktopBoot';

declare global {
  interface Window {
    __MAGIO_HOME__?: string;
    __MAGIO_MACOS_MAJOR__?: number;
    __MAGIO_LOCAL_ORIGIN__?: string;
    __MAGIO_SSH_FORWARD_API_URL__?: string;
    __MAGIO_ELECTRON__?: { runtime?: string; arch?: string; trayEnabled?: boolean; nativeFrame?: boolean };
    __MAGIO_PLATFORM__?: string;
    __MAGIO_DESKTOP_BOOT_OUTCOME__?: DesktopBootOutcome;
  }

  interface WebviewElement extends HTMLElement {
    loadURL(url: string): void;
    goBack(): void;
    goForward(): void;
    canGoBack(): boolean;
    canGoForward(): boolean;
    reload(): void;
    reloadIgnoringCache(): void;
    getZoomLevel(): number;
    setZoomLevel(level: number): void;
    stop(): void;
    getURL(): string;
    getTitle(): string;
    isLoading(): boolean;
    getWebContentsId(): number;
    openDevTools(): void;
    closeDevTools(): void;
    isDevToolsOpened(): boolean;
    executeJavaScript(code: string, userGesture?: boolean): Promise<unknown>;
  }

  namespace JSX {
    interface IntrinsicElements {
      webview: React.DetailedHTMLProps<
        React.HTMLAttributes<WebviewElement> & {
          src?: string;
          partition?: string;
          preload?: string;
          nodeintegration?: string;
          allowpopups?: string;
          webpreferences?: string;
          ref?: React.Ref<WebviewElement>;
        },
        WebviewElement
      >;
    }
  }
}

export {};
