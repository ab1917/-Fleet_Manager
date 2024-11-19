import { Vehicle, Driver, MaintenanceAlert } from '../types';
import { AuthResponse, LoginCredentials } from '../types/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let authToken = '';

export const api = {
  setAuthToken: (token: string) => {
    authToken = token;
  },

  auth: {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      await delay(500);
      
      // Simula diferentes tipos de usuário
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        return {
          user: {
            id: '1',
            name: 'Super Admin',
            email: 'admin@example.com',
            role: 'super_admin',
            permissions: ['all'],
          },
          token: 'fake-jwt-token-admin'
        };
      } else if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        return {
          user: {
            id: '2',
            name: 'Usuário Normal',
            email: 'user@example.com',
            role: 'manager',
            companyId: 'company1',
            permissions: ['read', 'write']
          },
          token: 'fake-jwt-token-user'
        };
      }
      
      throw new Error('Credenciais inválidas');
    }
  },

  // ... resto do código da API permanece o mesmo
};