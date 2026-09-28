const DEFAULT_API_BASE_URL = 'http://10.15.126.67:8080';

export function buildApiUrl(path, env = import.meta.env) {
  const baseUrl = (env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

export async function fetchApi(path, options = {}) {
  const token = localStorage.getItem('nepal-tourism-token');
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');

  const response = await fetch(buildApiUrl(path), { ...options, headers });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('nepal-tourism-token');
      localStorage.removeItem('nepal-tourism-user');
      window.dispatchEvent(new Event('nepal-tourism-auth-expired'));
    }
    const error = new Error(payload?.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return payload;
}
