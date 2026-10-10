/** Wire envelope `v`. Guest postMessage and host pushes use this. */
export const MAGIO_SDK_CHANNEL = 'magio.sdk';
export const MAGIO_SDK_API_VERSION = 1;
/** Manifest `apiVersion` values this host accepts. Service and sockets ship on `1`. */
export const MAGIO_SDK_MANIFEST_API_VERSIONS = [1] as const;
export type MagioManifestApiVersion = (typeof MAGIO_SDK_MANIFEST_API_VERSIONS)[number];
