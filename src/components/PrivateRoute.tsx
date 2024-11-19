import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'super_admin' | 'admin' | 'manager' | 'operator'>;
  requiredPermissions?: string[];
}

export default function PrivateRoute({ 
  children, 
  allowedRoles,
  requiredPermissions 
}: PrivateRouteProps) {
  const { user, isAuthenticated, checkPermission } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redireciona para a página apropriada baseado no papel do usuário
    const defaultPath = user.role === 'super_admin' ? '/admin' : '/dashboard';
    return <Navigate to={defaultPath} replace />;
  }

  // Verifica permissões específicas
  if (requiredPermissions && !requiredPermissions.every(checkPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Redireciona usuários não-admin tentando acessar rotas admin
  if (location.pathname.startsWith('/admin') && user?.role !== 'super_admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Redireciona admin tentando acessar rotas normais
  if (!location.pathname.startsWith('/admin') && user?.role === 'super_admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}