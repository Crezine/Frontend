import { auth } from './firebase';

const DEFAULT_API_BASE_URL = 'https://crezine-api-1057458775492.us-central1.run.app';

const normalizeApiBaseUrl = (baseUrl: string | undefined): string => {
  const normalized = (baseUrl || DEFAULT_API_BASE_URL).replace(/\/+$/, '');
  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
};

const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

function getErrorMessage(responseBody: unknown, response: Response): string {
  if (typeof responseBody === 'string' && responseBody.trim()) {
    return responseBody;
  }

  if (typeof responseBody === 'object' && responseBody !== null) {
    const errorBody = responseBody as Record<string, unknown>;

    if (typeof errorBody.message === 'string') {
      return errorBody.message;
    }

    if (Array.isArray(errorBody.message)) {
      return errorBody.message.filter(Boolean).join(', ');
    }

    if (typeof errorBody.error === 'string') {
      return errorBody.error;
    }

    if (typeof errorBody.detail === 'string') {
      return errorBody.detail;
    }
  }

  return `API request failed: ${response.status} ${response.statusText}`;
}

async function getAuthToken(forceRefresh = false): Promise<string | null> {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(forceRefresh);
    localStorage.setItem('firebaseToken', token);
    return token;
  }
  // Fallback to localStorage if Firebase hasn't loaded or user is not in memory
  return localStorage.getItem('firebaseToken');
}

function buildUrl(endpoint: string): string {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}

function serializeBody(body: unknown): BodyInit | undefined {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof URLSearchParams ||
    typeof body === 'string'
  ) {
    return body;
  }

  return JSON.stringify(body);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return {};
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  const text = await response.text();
  return text || {};
}

function clearCachedAuth() {
  localStorage.removeItem('firebaseToken');
  localStorage.removeItem('userData');
  window.dispatchEvent(new Event('auth:unauthorized'));
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
  retryAuth = true
): Promise<T> {
  const token = await getAuthToken();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(buildUrl(endpoint), {
    ...options,
    headers,
  });

  if (response.status === 401 && retryAuth && auth.currentUser) {
    const refreshedToken = await getAuthToken(true);
    const retryHeaders = new Headers(headers);
    if (refreshedToken) {
      retryHeaders.set('Authorization', `Bearer ${refreshedToken}`);
    }

    return apiRequest<T>(endpoint, { ...options, headers: retryHeaders }, false);
  }

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearCachedAuth();
    }

    throw new ApiError(getErrorMessage(responseBody, response), response.status, responseBody);
  }

  return responseBody as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'POST',
      body: serializeBody(body),
    }),
  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: serializeBody(body),
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};
