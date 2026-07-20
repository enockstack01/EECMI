import { Navigate } from 'react-router-dom';
import { useRole } from '../hooks/useRole';

export default function RequireRole({ roles, children, redirectSignedOutTo = '/login', redirectDeniedTo = '/dashboard' }) {
  const { role, isSignedIn, isLoaded } = useRole();

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)', fontSize: '1rem' }}>
        Loading...
      </div>
    );
  }
  if (!isSignedIn) return <Navigate to={redirectSignedOutTo} replace />;
  if (roles && !roles.includes(role)) return <Navigate to={redirectDeniedTo} replace />;
  return children;
}
