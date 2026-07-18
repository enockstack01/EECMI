import { createContext, useContext, useState, useCallback } from 'react';

const AdminAuthContext = createContext(null);

const TOKEN_KEY = 'eecmi_admin_token';
const ADMIN_KEY = 'eecmi_admin_user';

export function AdminAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem(ADMIN_KEY)); } catch { return null; }
  });

  const login = useCallback((newToken, adminUser) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(ADMIN_KEY, JSON.stringify(adminUser));
    setToken(newToken);
    setAdmin(adminUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setToken(null);
    setAdmin(null);
  }, []);

  const authFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (res.status === 401) { logout(); return res; }
    return res;
  }, [token, logout]);

  return (
    <AdminAuthContext.Provider value={{ token, admin, login, logout, authFetch, isAuthenticated: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);
