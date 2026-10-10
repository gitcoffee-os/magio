import express from 'express';
import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';

import { BrowserControlError } from '../browser-control/broker.js';
import { MagioControlError } from './error.js';
import { registerMagioControlRoutes } from './routes.js';

const createApp = (execute) => {
  const app = express();
  registerMagioControlRoutes(app, { controlService: { execute } });
  return app;
};

describe('Magio control route', () => {
  it('is a thin adapter over the control service', async () => {
    const execute = vi.fn(async () => ({ projects: [] }));
    const response = await request(createApp(execute))
      .post('/api/magio/control')
      .send({ action: 'projects.list', input: {}, contextDirectory: '/repo' })
      .expect(200);
    expect(response.body).toEqual({ projects: [] });
    expect(execute).toHaveBeenCalledWith('projects.list', {}, '/repo', expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });

  it('preserves service status and partial-result details', async () => {
    const execute = vi.fn(async () => {
      throw new MagioControlError('dispatch failed', 500, {
        partial: true,
        partialAction: 'fork-created',
        sessionId: 'ses_fork',
        directory: '/repo',
      });
    });
    const response = await request(createApp(execute))
      .post('/api/magio/control')
      .send({ action: 'session.fork', input: {} })
      .expect(500);
    expect(response.body).toEqual({
      error: 'dispatch failed',
      partial: true,
      partialAction: 'fork-created',
      sessionId: 'ses_fork',
      directory: '/repo',
    });
  });

  it('keeps the status of a browser refusal instead of reporting 500', async () => {
    const execute = vi.fn(async () => {
      throw new BrowserControlError('The user is interacting with this page in the panel right now.', 409);
    });
    const response = await request(createApp(execute))
      .post('/api/magio/control')
      .send({ action: 'browser.click', input: {} })
      .expect(409);
    expect(response.body).toEqual({ error: 'The user is interacting with this page in the panel right now.' });
  });
});
