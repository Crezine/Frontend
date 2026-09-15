import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { api, apiRequest, ApiError } from '../../services/api';
import { auth } from '../../services/firebase';

describe('API Client & apiRequest', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  describe('ApiError', () => {
    it('instantiates with message, status, and data', () => {
      const error = new ApiError('Not Found', 404, { error: 'Resource missing' });
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toBe('ApiError');
      expect(error.message).toBe('Not Found');
      expect(error.status).toBe(404);
      expect(error.data).toEqual({ error: 'Resource missing' });
    });
  });

  describe('Headers and Authentication', () => {
    it('attaches Bearer token from localStorage when auth.currentUser is null', async () => {
      localStorage.setItem('firebaseToken', 'test-local-token');

      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.get<{ success: boolean }>('/test-endpoint');

      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, requestInit] = fetchMock.mock.calls[0];
      expect(url).toContain('/api/test-endpoint');
      const headers = new Headers(requestInit.headers);
      expect(headers.get('Authorization')).toBe('Bearer test-local-token');
      expect(result).toEqual({ success: true });
    });

    it('attaches Bearer token from auth.currentUser.getIdToken()', async () => {
      const mockGetIdToken = vi.fn().mockResolvedValue('firebase-user-token');
      // @ts-ignore
      auth.currentUser = { getIdToken: mockGetIdToken } as any;

      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ user: 'creator' }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.get('/user-info');

      expect(mockGetIdToken).toHaveBeenCalledWith(false);
      expect(localStorage.getItem('firebaseToken')).toBe('firebase-user-token');
      const [, requestInit] = fetchMock.mock.calls[0];
      const headers = new Headers(requestInit.headers);
      expect(headers.get('Authorization')).toBe('Bearer firebase-user-token');
      expect(result).toEqual({ user: 'creator' });

      // @ts-ignore
      auth.currentUser = null;
    });

    it('adds Content-Type application/json when body is an object and method is POST', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: '123' }), {
          status: 201,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const payload = { name: 'Item', price: 50 };
      await api.post('/items', payload);

      const [, requestInit] = fetchMock.mock.calls[0];
      const headers = new Headers(requestInit.headers);
      expect(headers.get('Content-Type')).toBe('application/json');
      expect(requestInit.body).toBe(JSON.stringify(payload));
      expect(requestInit.method).toBe('POST');
    });

    it('does not overwrite Content-Type when body is FormData', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ uploaded: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const formData = new FormData();
      formData.append('file', 'test-data');

      await api.post('/upload', formData);

      const [, requestInit] = fetchMock.mock.calls[0];
      const headers = new Headers(requestInit.headers);
      expect(headers.get('Content-Type')).toBeNull();
      expect(requestInit.body).toBe(formData);
    });
  });

  describe('URL building', () => {
    it('uses absolute URL directly if endpoint starts with http:// or https://', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await api.get('https://example.com/custom-api/resource');

      const [url] = fetchMock.mock.calls[0];
      expect(url).toBe('https://example.com/custom-api/resource');
    });

    it('prefixes relative endpoints without leading slash properly', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await api.get('relative/path');

      const [url] = fetchMock.mock.calls[0];
      expect(url).toMatch(/\/api\/relative\/path$/);
    });
  });

  describe('Response parsing & HTTP methods', () => {
    it('returns empty object for 204 No Content', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(null, {
          status: 204,
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.delete('/delete-resource');
      expect(result).toEqual({});
    });

    it('handles text responses gracefully when content-type is not JSON', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response('plain text response', {
          status: 200,
          headers: { 'content-type': 'text/plain' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.get('/text-endpoint');
      expect(result).toBe('plain text response');
    });

    it('handles api.put correctly', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ updated: true }), {
          status: 200,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.put('/update/1', { title: 'new' });
      const [, requestInit] = fetchMock.mock.calls[0];
      expect(requestInit.method).toBe('PUT');
      expect(result).toEqual({ updated: true });
    });
  });

  describe('Error handling & Error message parsing', () => {
    it('extracts string error message from response body', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response('Bad request parameter', {
          status: 400,
          statusText: 'Bad Request',
          headers: { 'content-type': 'text/plain' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(api.get('/error-test')).rejects.toThrow('Bad request parameter');
    });

    it('extracts message property from object response body', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Invalid credentials' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(api.get('/error-test')).rejects.toThrow('Invalid credentials');
    });

    it('extracts array of messages from object response body', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: ['Email is invalid', 'Password too short'] }), {
          status: 422,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(api.get('/error-test')).rejects.toThrow('Email is invalid, Password too short');
    });

    it('extracts error and detail fields from object response body', async () => {
      const fetchMockError = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: 'Unauthorized token' }), {
          status: 403,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMockError);

      await expect(api.get('/err-field')).rejects.toThrow('Unauthorized token');

      const fetchMockDetail = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ detail: 'Item does not exist' }), {
          status: 404,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMockDetail);

      await expect(api.get('/detail-field')).rejects.toThrow('Item does not exist');
    });

    it('falls back to status and statusText when error body is empty', async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        new Response('', {
          status: 500,
          statusText: 'Internal Server Error',
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(api.get('/fallback-error')).rejects.toThrow('API request failed: 500 Internal Server Error');
    });
  });

  describe('401 retry and unauthorized event handling', () => {
    it('retries request with refreshed token when 401 is encountered and currentUser exists', async () => {
      const mockGetIdToken = vi.fn()
        .mockResolvedValueOnce('old-expired-token')
        .mockResolvedValueOnce('refreshed-token');

      // @ts-ignore
      auth.currentUser = { getIdToken: mockGetIdToken } as any;

      const fetchMock = vi.fn()
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ message: 'Token expired' }), {
            status: 401,
            headers: { 'content-type': 'application/json' },
          })
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ data: 'success after retry' }), {
            status: 200,
            headers: { 'content-type': 'application/json' },
          })
        );
      vi.stubGlobal('fetch', fetchMock);

      const result = await api.get<{ data: string }>('/protected-resource');

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(mockGetIdToken).toHaveBeenCalledWith(true);
      expect(result).toEqual({ data: 'success after retry' });

      // @ts-ignore
      auth.currentUser = null;
    });

    it('clears localStorage and dispatches auth:unauthorized event on unhandled 401', async () => {
      localStorage.setItem('firebaseToken', 'some-token');
      localStorage.setItem('userData', JSON.stringify({ email: 'user@example.com' }));

      const unauthorizedSpy = vi.fn();
      window.addEventListener('auth:unauthorized', unauthorizedSpy);

      const fetchMock = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Unauthorized' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        })
      );
      vi.stubGlobal('fetch', fetchMock);

      await expect(api.get('/unauthorized-resource')).rejects.toThrow('Unauthorized');

      expect(localStorage.getItem('firebaseToken')).toBeNull();
      expect(localStorage.getItem('userData')).toBeNull();
      expect(unauthorizedSpy).toHaveBeenCalledTimes(1);

      window.removeEventListener('auth:unauthorized', unauthorizedSpy);
    });
  });
});
