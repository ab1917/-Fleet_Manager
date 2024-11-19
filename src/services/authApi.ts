import { LoginCredentials, AuthResponse } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(500);
    
    // Super Admin
    if (credentials.email === 'admin@fleetmanager.com' && credentials.password === 'admin123') {
      return {
        user: {
          id: '1',
          name: 'Super Admin',
          email: 'admin@fleetmanager.com',
          role: 'super_admin',
          permissions: ['*']
        },
        token: 'fake-jwt-token-super-admin'
      };
    }
    
    // Admin da Empresa
    if (credentials.email === 'company@example.com' && credentials.password === 'company123') {
      return {
        user: {
          id: '2',
          name: 'Admin da Empresa',
          email: 'company@example.com',
          role: 'admin',
          companyId: 'company1',
          permissions: ['company.*']
        },
        token: 'fake-jwt-token-company-admin'
      };
    }
    
    throw new Error('Credenciais inválidas');
  },

  validateToken: async (token: string): Promise<AuthResponse['user']> => {
    await delay(100);
    
    if (token === 'fake-jwt-token-super-admin') {
      return {
        id: '1',
        name: 'Super Admin',
        email: 'admin@fleetmanager.com',
        role: 'super_admin',
        permissions: ['*']
      };
    }
    
    if (token === 'fake-jwt-token-company-admin') {
      return {
        id: '2',
        name: 'Admin da Empresa',
        email: 'company@example.com',
        role: 'admin',
        companyId: 'company1',
        permissions: ['company.*']
      };
    }
    
    throw new Error('Token inválido');
  },

  refreshToken: async (token: string): Promise<string> => {
    await delay(100);
    return `${token}-refreshed`;
  }
};