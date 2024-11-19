import { FinancialDashboard, FinancialTransaction } from '../types/financial';
import { CompanyUser } from '../types/admin';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const companyApi = {
  financial: {
    getDashboard: async (companyId: string): Promise<FinancialDashboard> => {
      await delay(500);
      return {
        currentBalance: 125000,
        pendingIncome: 45000,
        pendingExpenses: 32000,
        monthlyComparison: [
          { month: 'Jan', income: 85000, expense: 65000 },
          { month: 'Fev', income: 92000, expense: 70000 },
          { month: 'Mar', income: 125000, expense: 85000 }
        ],
        topExpenseCategories: [
          { category: 'Combustível', amount: 25000, percentage: 30 },
          { category: 'Manutenção', amount: 20000, percentage: 25 },
          { category: 'Salários', amount: 18000, percentage: 22 },
          { category: 'Seguros', amount: 12000, percentage: 15 },
          { category: 'Outros', amount: 10000, percentage: 8 }
        ]
      };
    },

    getTransactions: async (companyId: string): Promise<FinancialTransaction[]> => {
      await delay(500);
      return [
        {
          id: '1',
          companyId,
          type: 'income',
          category: 'Serviços',
          description: 'Frete para Empresa XYZ',
          amount: 15000,
          date: '2024-03-10',
          status: 'completed',
          paymentMethod: 'bank_transfer',
          createdBy: 'user1',
          createdAt: '2024-03-10T10:00:00Z',
          updatedAt: '2024-03-10T10:00:00Z'
        },
        {
          id: '2',
          companyId,
          type: 'expense',
          category: 'Combustível',
          description: 'Abastecimento Frota',
          amount: 5000,
          date: '2024-03-09',
          status: 'completed',
          paymentMethod: 'credit_card',
          createdBy: 'user1',
          createdAt: '2024-03-09T15:30:00Z',
          updatedAt: '2024-03-09T15:30:00Z'
        }
      ];
    },

    getBilling: async (companyId: string) => {
      await delay(500);
      return {
        plan: 'professional',
        amount: 1500,
        status: 'active',
        dueDate: '2024-04-01',
        paymentMethod: {
          type: 'credit_card',
          lastDigits: '4242'
        },
        invoices: [
          {
            id: '1',
            number: 'INV-001',
            amount: 1500,
            status: 'paid',
            issuedAt: '2024-03-01T00:00:00Z',
            paidAt: '2024-03-05T00:00:00Z',
            dueDate: '2024-03-15T00:00:00Z'
          }
        ]
      };
    }
  },

  users: {
    list: async (companyId: string): Promise<CompanyUser[]> => {
      await delay(500);
      return [
        {
          id: '1',
          name: 'João Silva',
          email: 'joao.silva@empresa.com',
          role: 'manager',
          status: 'active',
          companyId,
          permissions: ['vehicles.view', 'vehicles.edit', 'maintenance.view'],
          lastLogin: '2024-03-10T10:00:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          department: 'Operações',
          phone: '(11) 98765-4321'
        },
        {
          id: '2',
          name: 'Maria Santos',
          email: 'maria.santos@empresa.com',
          role: 'operator',
          status: 'active',
          companyId,
          permissions: ['vehicles.view', 'maintenance.view'],
          lastLogin: '2024-03-09T15:30:00Z',
          createdAt: '2024-01-15T00:00:00Z',
          department: 'Logística',
          phone: '(11) 98765-1234'
        }
      ];
    },

    create: async (companyId: string, data: Partial<CompanyUser>): Promise<CompanyUser> => {
      await delay(500);
      return {
        id: Math.random().toString(36).substr(2, 9),
        companyId,
        ...data,
        status: 'active',
        createdAt: new Date().toISOString()
      } as CompanyUser;
    },

    update: async (companyId: string, userId: string, data: Partial<CompanyUser>): Promise<CompanyUser> => {
      await delay(500);
      return {
        id: userId,
        companyId,
        ...data,
        updatedAt: new Date().toISOString()
      } as CompanyUser;
    },

    delete: async (companyId: string, userId: string): Promise<void> => {
      await delay(500);
      // Simula a deleção do usuário
    }
  }
};