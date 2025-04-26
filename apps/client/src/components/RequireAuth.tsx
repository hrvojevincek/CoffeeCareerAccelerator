import { type ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useMe } from '../hooks/useAuth';

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}

/**
 * A component that protects routes requiring authentication.
 * If user is not authenticated, redirects to login page.
 * If allowedRoles is provided, also checks if user has one of the allowed roles.
 */
export const RequireAuth = ({
  children,
  redirectTo = '/login',
  allowedRoles,
}: RequireAuthProps) => {
  const location = useLocation();
  const { data: user, isLoading, isError } = useMe();

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // Not authenticated, redirect to login
  if (isError || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if allowedRoles is provided
  if (allowedRoles && user.category && !allowedRoles.includes(user.category)) {
    return <Navigate to="/" replace />;
  }

  // User is authenticated (and has required role if specified)
  return <>{children}</>;
};

export default RequireAuth;
