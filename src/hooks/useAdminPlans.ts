import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminApi';
import { Plan } from '../types/admin';

export function useAdminPlans() {
  const queryClient = useQueryClient();

  const usePlans = () => useQuery({
    queryKey: ['plans'],
    queryFn: () => adminApi.plans.list()
  });

  const usePlan = (id: string) => useQuery({
    queryKey: ['plan', id],
    queryFn: () => adminApi.plans.getById(id),
    enabled: !!id
  });

  const useCreatePlan = () => useMutation({
    mutationFn: (data: Partial<Plan>) => adminApi.plans.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    }
  });

  const useUpdatePlan = () => useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Plan> }) => 
      adminApi.plans.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    }
  });

  const useDeletePlan = () => useMutation({
    mutationFn: (id: string) => adminApi.plans.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    }
  });

  return {
    usePlans,
    usePlan,
    useCreatePlan,
    useUpdatePlan,
    useDeletePlan
  };
}