import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminApi';

export function useAdminFinancial() {
  return {
    useGlobalStats: () => useQuery({
      queryKey: ['admin-financial-stats'],
      queryFn: () => adminApi.financial.getGlobalStats()
    }),
    
    useCompanyBillings: () => useQuery({
      queryKey: ['company-billings'],
      queryFn: () => adminApi.financial.getCompanyBillings()
    })
  };
}

export function useAuditLogs(filters?: {
  startDate?: string;
  endDate?: string;
  entityType?: string;
  action?: string;
}) {
  return useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () => adminApi.auditLogs.list(filters)
  });
}

export function useAdminPlans() {
  const queryClient = useQueryClient();

  return {
    usePlans: () => useQuery({
      queryKey: ['plans'],
      queryFn: () => adminApi.plans.list()
    }),

    useUpdatePlan: () => useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => 
        adminApi.plans.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['plans'] });
      }
    })
  };
}

export function useAdminReports() {
  return {
    useReport: (dateRange: string, type: string) => useQuery({
      queryKey: ['admin-report', dateRange, type],
      queryFn: () => adminApi.reports.get(dateRange, type)
    })
  };
}

export function useAdminNotifications() {
  const queryClient = useQueryClient();

  return {
    useNotifications: () => useQuery({
      queryKey: ['notifications'],
      queryFn: () => adminApi.notifications.list()
    }),

    useTemplates: () => useQuery({
      queryKey: ['notification-templates'],
      queryFn: () => adminApi.notifications.listTemplates()
    }),

    useSendNotification: () => useMutation({
      mutationFn: (notification: any) => adminApi.notifications.send(notification),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notifications'] });
      }
    })
  };
}