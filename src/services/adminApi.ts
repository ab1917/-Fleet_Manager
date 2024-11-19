import { 
  Company, CompanyUser, SystemStats, AuditLog,
  FinancialTransaction, FinancialReport, Plan,
  NotificationTemplate
} from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminApi = {
  plans: {
    list: async () => {
      await delay(500);
      return [
        {
          id: 'basic',
          name: 'Basic',
          description: 'Para pequenas empresas',
          price: 500,
          billingCycle: 'monthly',
          features: [
            'Até 5 veículos',
            'Gestão básica de frota',
            'Manutenções preventivas',
            'Relatórios básicos'
          ],
          limits: {
            users: 5,
            vehicles: 5,
            storage: 10
          },
          isActive: true
        },
        {
          id: 'professional',
          name: 'Professional',
          description: 'Para médias empresas',
          price: 1500,
          billingCycle: 'monthly',
          features: [
            'Até 20 veículos',
            'Rastreamento em tempo real',
            'Gestão de motoristas',
            'Relatórios avançados'
          ],
          limits: {
            users: 20,
            vehicles: 20,
            storage: 50
          },
          isActive: true
        },
        {
          id: 'enterprise',
          name: 'Enterprise',
          description: 'Para grandes empresas',
          price: 3000,
          billingCycle: 'monthly',
          features: [
            'Veículos ilimitados',
            'API personalizada',
            'Suporte 24/7',
            'Recursos exclusivos'
          ],
          limits: {
            users: 100,
            vehicles: -1,
            storage: 200
          },
          isActive: true
        }
      ];
    },

    getById: async (id: string) => {
      await delay(500);
      // Simula busca de plano por ID
      return {
        id,
        name: 'Professional',
        description: 'Para médias empresas',
        price: 1500,
        billingCycle: 'monthly',
        features: [
          'Até 20 veículos',
          'Rastreamento em tempo real',
          'Gestão de motoristas',
          'Relatórios avançados'
        ],
        limits: {
          users: 20,
          vehicles: 20,
          storage: 50
        },
        isActive: true
      };
    },

    create: async (data: any) => {
      await delay(500);
      return { id: 'new-plan', ...data };
    },

    update: async (id: string, data: any) => {
      await delay(500);
      return { id, ...data };
    },

    delete: async (id: string) => {
      await delay(500);
      // Simula deleção do plano
    }
  },

  notifications: {
    listTemplates: async () => {
      await delay(500);
      return [
        {
          id: 'welcome',
          name: 'Boas-vindas',
          type: 'email',
          subject: 'Bem-vindo ao Fleet Manager',
          content: 'Olá {{name}}, seja bem-vindo ao Fleet Manager! Estamos felizes em ter você conosco...',
          variables: ['name', 'company'],
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: '2024-03-01T00:00:00Z'
        },
        {
          id: 'maintenance-alert',
          name: 'Alerta de Manutenção',
          type: 'email',
          subject: 'Manutenção Programada - {{plate}}',
          content: 'Atenção! O veículo {{plate}} tem uma manutenção programada para {{date}}...',
          variables: ['plate', 'date', 'service', 'location'],
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: '2024-03-01T00:00:00Z'
        },
        {
          id: 'document-expiration',
          name: 'Vencimento de Documento',
          type: 'email',
          subject: 'Documento Próximo ao Vencimento',
          content: 'O documento {{document_type}} do veículo {{plate}} vencerá em {{days}} dias...',
          variables: ['document_type', 'plate', 'days', 'expiration_date'],
          createdAt: '2024-03-01T00:00:00Z',
          updatedAt: '2024-03-01T00:00:00Z'
        }
      ];
    },

    createTemplate: async (data: any) => {
      await delay(500);
      return {
        id: 'new-template',
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    },

    updateTemplate: async (id: string, data: any) => {
      await delay(500);
      return {
        id,
        ...data,
        updatedAt: new Date().toISOString()
      };
    },

    deleteTemplate: async (id: string) => {
      await delay(500);
      // Simula deleção do template
    },

    previewTemplate: async (id: string, variables: Record<string, string>) => {
      await delay(500);
      return {
        subject: 'Preview do Assunto',
        content: 'Preview do conteúdo com variáveis substituídas'
      };
    }
  },

  settings: {
    get: async () => {
      await delay(500);
      return {
        email: {
          smtpHost: 'smtp.example.com',
          smtpPort: 587,
          smtpUser: 'notifications@fleetmanager.com',
          smtpPassword: '********',
          defaultFromEmail: 'no-reply@fleetmanager.com'
        },
        security: {
          passwordMinLength: 8,
          passwordRequireNumbers: true,
          passwordRequireSymbols: true,
          sessionTimeout: 30,
          maxLoginAttempts: 5
        },
        notifications: {
          maintenanceAlerts: true,
          documentExpirationAlerts: true,
          systemUpdates: true,
          dailyReports: false
        },
        backup: {
          autoBackup: true,
          backupFrequency: 'daily',
          retentionDays: 30,
          storageProvider: 'local'
        }
      };
    },

    update: async (data: any) => {
      await delay(500);
      return data;
    }
  }
};