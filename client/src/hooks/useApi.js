import { useCallback, useMemo } from 'react';
import { useAuth } from '@clerk/clerk-react';

/**
 * Authenticated fetch helper for signed-in user features (profile, activity,
 * saved devotions, notifications). Mirrors the admin panel's `authFetch` but
 * is available anywhere in the public app.
 *
 * Every method returns the parsed JSON body and throws an Error (with the
 * server's message) on failure.
 */
export function useApi() {
  const { getToken, isSignedIn } = useAuth();

  const request = useCallback(async (path, { method = 'GET', body, isForm } = {}) => {
    const token = await getToken();
    const headers = { Authorization: `Bearer ${token}` };
    if (!isForm) headers['Content-Type'] = 'application/json';

    const res = await fetch(path, {
      method,
      headers,
      body: isForm ? body : body != null ? JSON.stringify(body) : undefined,
    });

    let data = null;
    try { data = await res.json(); } catch { /* non-JSON */ }

    if (!res.ok || (data && data.success === false)) {
      throw new Error((data && data.message) || `Request failed (${res.status}).`);
    }
    return data ?? { success: true };
  }, [getToken]);

  return useMemo(() => ({
    isSignedIn: !!isSignedIn,
    get: (path) => request(path),
    post: (path, body) => request(path, { method: 'POST', body }),
    patch: (path, body) => request(path, { method: 'PATCH', body }),
    del: (path) => request(path, { method: 'DELETE' }),
    upload: (path, formData, method = 'POST') => request(path, { method, body: formData, isForm: true }),
  }), [request, isSignedIn]);
}
