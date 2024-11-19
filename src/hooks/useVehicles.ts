import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: () => api.vehicles.list()
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => api.vehicles.getById(id),
    enabled: !!id
  });
}