import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../services/adminApi';
import { NotificationTemplate } from '../types/admin';

export function useAdminNotifications() {
  const queryClient = useQueryClient();

  const useTemplates = () => useQuery({
    queryKey: ['notification-templates'],
    queryFn: () => adminApi.notifications.listTemplates()
  });

  const useCreateTemplate = () => useMutation({
    mutationFn: (data: Partial<NotificationTemplate>) => 
      adminApi.notifications.createTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    }
  });

  const useUpdateTemplate = () => useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NotificationTemplate> }) =>
      adminApi.notifications.updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    }
  });

  const useDeleteTemplate = () => useMutation({
    mutationFn: (id: string) => adminApi.notifications.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    }
  });

  const usePreviewTemplate = () => useMutation({
    mutationFn: ({ id, variables }: { id: string; variables: Record<string, string> }) =>
      adminApi.notifications.previewTemplate(id, variables)
  });

  return {
    useTemplates,
    useCreateTemplate,
    useUpdateTemplate,
    useDeleteTemplate,
    usePreviewTemplate
  };
}