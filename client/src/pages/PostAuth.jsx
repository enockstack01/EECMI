import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

export default function PostAuth() {
  const { isLoaded, isSignedIn, isAdmin } = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) { navigate('/login', { replace: true }); return; }
    navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
  }, [isLoaded, isSignedIn, isAdmin, navigate]);

  return (
    <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)', fontSize: '1rem' }}>
      Signing you in...
    </div>
  );
}
