import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { adminApi } from '../services/adminApi';
import { companyApi } from '../services/companyApi';
import { FinancialTransaction } from '../types/financial';

export function useFinancial() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const isAdmin = user?.role === 'super_admin';

  // Hooks para Super Admin
  const useGlobalStats = () => useQuery({
    queryKey: ['admin-financial-stats'],
    queryFn: () => adminApi.financial.getGlobalStats(),
    enabled: isAdmin
  });

  const useCompanyBillings = () => useQuery({
    queryKey: ['company-billings'],
    queryFn: () => adminApi.financial.getCompanyBillings(),
    enabled: isAdmin
  });

  // Hooks para Empresa
  const useCompanyDashboard = (companyId?: string) => useQuery({
    queryKey: ['company-financial-dashboard', companyId],
    queryFn: () => companyApi.financial.getDashboard(companyId!),
    enabled: !!companyId && !isAdmin
  });

  const useCompanyTransactions = (companyId?: string) => useQuery({
    queryKey: ['company-transactions', companyId],
    queryFn: () => companyApi.financial.getTransactions(companyId!),
    enabled: !!companyId && !isAdmin
  });

  const useCreateTransaction = () => {
    return useMutation({
      mutationFn: (data: { companyId: string; transaction: Partial<FinancialTransaction> }) =>
        companyApi.financial.createTransaction(data.companyId, data.transaction),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ 
          queryKey: ['company-transactions', variables.companyId] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['company-financial-dashboard', variables.companyId] 
        });
      }
    });
  };

  const useUpdateTransaction = () => {
    return useMutation({
      mutationFn: (data: { id: string; transaction: Partial<FinancialTransaction> }) =>
        companyApi.financial.updateTransaction(data.id, data.transaction),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ 
          queryKey: ['company-transactions'] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['company-financial-dashboard'] 
        });
      }
    });
  };

  const useDeleteTransaction = () => {
    return useMutation({
      mutationFn: (id: string) => companyApi.financial.deleteTransaction(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['company-transactions'] 
        });
        queryClient.invalidateQueries({ 
          queryKey: ['company-financial-dashboard'] 
        });
      }
    });
  };

  return {
    // Hooks globais (Super Admin)
    useGlobalStats,
    useCompanyBillings,
    
    // Hooks da empresa
    useCompanyDashboard,
    useCompanyTransactions,
    useCreateTransaction,
    useUpdateTransaction,
    useDeleteTransaction
  };
}