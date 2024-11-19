export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager' | 'operator';
  companyId?: string;
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
  settings?: {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, any>;
}