export class MagioControlError extends Error {
  constructor(message, statusCode = 500, details = {}) {
    super(message);
    this.name = 'MagioControlError';
    this.statusCode = statusCode;
    Object.assign(this, details);
  }
}

export const asControlError = (error, fallbackMessage, fallbackStatus = 500) => {
  if (error instanceof MagioControlError) return error;
  const message = error instanceof Error ? error.message : fallbackMessage;
  return new MagioControlError(message || fallbackMessage, Number(error?.statusCode) || Number(error?.status) || fallbackStatus, {
    ...(error?.goalConfigured === true ? { goalConfigured: true } : {}),
  });
};
