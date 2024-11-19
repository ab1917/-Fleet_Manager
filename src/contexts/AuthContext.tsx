import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LoginCredentials } from '../types/auth';
import { authApi } from '../services/authApi';

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signOut: () => void;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadStoredAuth() {
      const storedToken = localStorage.getItem('@FleetManager:token');
      
      if (storedToken) {
        try {
          const user = await authApi.validateToken(storedToken);
          setUser(user);
          
          // Redireciona para a página apropriada se estiver na raiz
          if (window.location.pathname === '/') {
            navigate(user.role === 'super_admin' ? '/admin' : '/dashboard');
          }
        } catch {
          localStorage.removeItem('@FleetManager:token');
        }
      }
      
      setIsLoading(false);
    }

    loadStoredAuth();
  }, [navigate]);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    
    localStorage.setItem('@FleetManager:token', response.token);
    setUser(response.user);

    // Redireciona baseado no papel do usuário
    if (response.user.role === 'super_admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  }, [navigate]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@FleetManager:token');
    setUser(null);
    navigate('/');
  }, [navigate]);

  const checkPermission = useCallback((permission: string) => {
    if (!user) return false;
    if (user.role === 'super_admin') return true;
    return user.permissions.includes(permission);
  }, [user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        signIn, 
        signOut,
        checkPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);