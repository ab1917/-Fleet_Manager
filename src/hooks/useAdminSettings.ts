import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminApi';

export function useAdminSettings() {
  const queryClient = useQueryClient();

  const useSettings = () => useQuery({
    queryKey: ['system-settings'],
    queryFn: () => adminApi.settings.get()
  });

  const useUpdateSettings = () => useMutation({
    mutationFn: (data: any) => adminApi.settings.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
    }
  });

  return {
    useSettings,
    useUpdateSettings
  };
}