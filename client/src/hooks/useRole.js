import { useLayoutEffect, useRef, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';

const ADMIN_ROLES = ['admin', 'editor', 'super_admin'];

export function useRole() {
  const { isLoaded: authLoaded, isSignedIn, getToken } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [syncing, setSyncing] = useState(false);
  const synced = useRef(false);

  useLayoutEffect(() => {
    if (!authLoaded || !userLoaded || !isSignedIn || !user) return;
    if (user.publicMetadata?.role || synced.current) return;
    synced.current = true;
    setSyncing(true);
    (async () => {
      try {
        const token = await getToken();
        await fetch('/api/auth/sync-role', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
        await user.reload();
      } finally {
        setSyncing(false);
      }
    })();
  }, [authLoaded, userLoaded, isSignedIn, user, getToken]);

  const isLoaded = authLoaded && userLoaded && !syncing;
  const role = user?.publicMetadata?.role || (isSignedIn ? 'user' : null);

  return {
    role,
    isSignedIn: !!isSignedIn,
    isLoaded,
    isAdmin: ADMIN_ROLES.includes(role),
    isSuperAdmin: role === 'super_admin',
    user,
  };
}

export { ADMIN_ROLES };
