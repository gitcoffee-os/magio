const CORE_VERSION = /^(\d+)\.(\d+)\.(\d+)$/;
/** `1.22.0` or `>=1.22.0`. Ranges beyond a floor are not accepted. */
export const MAGIO_ENGINE_PATTERN = /^(>=)?\d+\.\d+\.\d+$/;

type MagioVersionParts = {
  major: number;
  minor: number;
  patch: number;
};

export const parseMagioVersion = (value: string): MagioVersionParts | null => {
  const core = String(value || '').trim().replace(/^v/i, '').split(/[-+]/)[0] ?? '';
  const match = CORE_VERSION.exec(core);
  if (!match) {
    return null;
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
};

export const compareMagioVersions = (left: string, right: string): number => {
  const a = parseMagioVersion(left);
  const b = parseMagioVersion(right);
  if (!a || !b) {
    return 0;
  }
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
};

/** Normalize `>=1.22.0` / `1.22.0` to the floor version string. */
export const magioEngineMinimum = (engine: string): string | null => {
  const trimmed = engine.trim();
  if (!MAGIO_ENGINE_PATTERN.test(trimmed)) {
    return null;
  }
  const floor = trimmed.startsWith('>=') ? trimmed.slice(2) : trimmed;
  return parseMagioVersion(floor) ? floor : null;
};

/**
 * True when this Magio build is new enough for the guest's `engines.magio`.
 * Unknown host versions fail closed when an engine is declared.
 */
export const hostMeetsMagioEngine = (
  hostVersion: string,
  engine: string,
): boolean => {
  const minimum = magioEngineMinimum(engine);
  if (!minimum) {
    return false;
  }
  if (!parseMagioVersion(hostVersion)) {
    return false;
  }
  return compareMagioVersions(hostVersion, minimum) >= 0;
};
