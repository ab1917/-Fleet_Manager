import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Save, Building2, Users, Truck, Settings2 } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

const settingsSchema = z.object({
  settings: z.object({
    maxUsers: z.number().min(1, 'Mínimo de 1 usuário'),
    maxVehicles: z.number().min(1, 'Mínimo de 1 veículo'),
    features: z.array(z.string())
  }),
  plan: z.enum(['basic', 'professional', 'enterprise']),
  status: z.enum(['active', 'inactive', 'pending'])
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const features = [
  { id: 'tracking', label: 'Rastreamento em tempo real' },
  { id: 'maintenance', label: 'Gestão de manutenção' },
  { id: 'fuel_control', label: 'Controle de combustível' },
  { id: 'driver_management', label: 'Gestão de motoristas' },
  { id: 'reports', label: 'Relatórios avançados' },
  { id: 'alerts', label: 'Sistema de alertas' },
  { id: 'api_access', label: 'Acesso à API' },
  { id: 'mobile_app', label: 'Aplicativo móvel' }
];

export default function CompanySettings() {
  const { companyId } = useParams<{ companyId: string }>();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ['company', companyId],
    queryFn: () => adminApi.companies.getById(companyId!)
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      settings: company?.settings,
      plan: company?.plan,
      status: company?.status
    }
  });

  const updateCompany = useMutation({
    mutationFn: (data: SettingsFormData) => 
      adminApi.companies.update(companyId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company', companyId] });
    }
  });

  const selectedPlan = watch('plan');

  const planLimits = {
    basic: { users: 5, vehicles: 10, features: ['maintenance', 'fuel_control'] },
    professional: { users: 20, vehicles: 50, features: ['maintenance', 'fuel_control', 'tracking', 'driver_management', 'reports'] },
    enterprise: { users: 100, vehicles: 200, features: features.map(f => f.id) }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Configurações da Empresa</h1>
        <div className="text-sm text-gray-500">ID: {companyId}</div>
      </div>

      <form onSubmit={handleSubmit((data) => updateCompany.mutate(data))} className="space-y-6">
        <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Plano e Status</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plano</label>
                <select
                  {...register('plan')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="basic">Básico</option>
                  <option value="professional">Profissional</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  {...register('status')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                  <option value="pending">Pendente</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Limites</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Máximo de Usuários
                  <span className="text-sm text-gray-500 ml-2">
                    (Limite do plano: {planLimits[selectedPlan].users})
                  </span>
                </label>
                <input
                  type="number"
                  {...register('settings.maxUsers', { valueAsNumber: true })}
                  max={planLimits[selectedPlan].users}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.settings?.maxUsers && (
                  <p className="mt-1 text-sm text-red-600">{errors.settings.maxUsers.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Máximo de Veículos
                  <span className="text-sm text-gray-500 ml-2">
                    (Limite do plano: {planLimits[selectedPlan].vehicles})
                  </span>
                </label>
                <input
                  type="number"
                  {...register('settings.maxVehicles', { valueAsNumber: true })}
                  max={planLimits[selectedPlan].vehicles}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.settings?.maxVehicles && (
                  <p className="mt-1 text-sm text-red-600">{errors.settings.maxVehicles.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Funcionalidades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('settings.features')}
                    value={feature.id}
                    disabled={!planLimits[selectedPlan].features.includes(feature.id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    {feature.label}
                    {!planLimits[selectedPlan].features.includes(feature.id) && (
                      <span className="ml-2 text-xs text-gray-500">(Plano superior necessário)</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateCompany.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {updateCompany.isPending ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </form>
    </div>
  );
}