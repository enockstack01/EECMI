import { createContext, useContext, useCallback, useMemo } from 'react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { useRole } from '../../hooks/useRole';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  const { role, isSuperAdmin, isSignedIn, isLoaded, user } = useRole();

  const authFetch = useCallback(async (url, options = {}) => {
    const token = await getToken();
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }, [getToken]);

  const admin = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      name: user.fullName || user.username || user.primaryEmailAddress?.emailAddress || 'Admin',
      email: user.primaryEmailAddress?.emailAddress,
      imageUrl: user.imageUrl,
      role,
    };
  }, [user, role]);

  const logout = useCallback(() => signOut({ redirectUrl: '/' }), [signOut]);

  const value = { admin, role, isSuperAdmin, isAuthenticated: isSignedIn, isLoaded, authFetch, logout };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);
