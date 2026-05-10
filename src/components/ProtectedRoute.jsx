import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export default function ProtectedRoute({ children, requireMembership = true }) {
  const { user, loading, membershipStatus } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-magenta font-medium">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireMembership && membershipStatus !== 'active') {
    return <Navigate to="/portal/inactive" replace />;
  }

  return children;
}
