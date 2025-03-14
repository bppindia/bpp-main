import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    isAuthenticated: boolean;
    requiredVerification?: boolean; // Require verification for this route
    restrictedFor?: 'primary' | 'business'; // Restrict access for specific membership types
}

export const ProtectedRoute = ({
    children,
    isAuthenticated,
    requiredVerification = false,
    restrictedFor,
}: ProtectedRouteProps) => {
    const location = useLocation();
    const { user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (requiredVerification && !user?.isVerified) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    if (restrictedFor && user?.membershipType === restrictedFor) {
        return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};