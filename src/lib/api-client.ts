import { env } from './env';
import { ApiError, ApiSuccess } from './api-types';
import { useAuthStore } from '@/stores/auth-store';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: unknown;
  auth?: boolean;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = 'GET', body, auth = true } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (auth) {
    const token = useAuthStore.getState().accessToken;
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${env.apiUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiError(
      res.status,
      json.message ?? 'Something went wrong',
      json.errors ?? [],
    );
  }

  return (json as ApiSuccess<T>).data;
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<T>(path, { ...options, method: 'GET' }),
  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(path, { ...options, method: 'POST', body }),
  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(
    path: string,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => request<T>(path, { ...options, method: 'DELETE' }),
};
