import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { Save, Plus, Minus } from 'lucide-react';

const planSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  price: z.number().min(0, 'Preço deve ser maior ou igual a zero'),
  billingCycle: z.enum(['monthly', 'yearly']),
  features: z.array(z.string()).min(1, 'Adicione pelo menos uma funcionalidade'),
  limits: z.object({
    users: z.number().min(1, 'Mínimo de 1 usuário'),
    vehicles: z.number().min(1, 'Mínimo de 1 veículo'),
    storage: z.number().min(1, 'Mínimo de 1GB')
  }),
  isActive: z.boolean()
});

type PlanFormData = z.infer<typeof planSchema>;

export default function PlanForm() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: plan, isLoading: isLoadingPlan } = useQuery({
    queryKey: ['plan', planId],
    queryFn: () => adminApi.plans.getById(planId!),
    enabled: !!planId
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<PlanFormData>({
    resolver: zodResolver(planSchema),
    defaultValues: plan || {
      billingCycle: 'monthly',
      isActive: true,
      features: [],
      limits: {
        users: 5,
        vehicles: 10,
        storage: 10
      }
    }
  });

  const createPlan = useMutation({
    mutationFn: (data: PlanFormData) => adminApi.plans.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      navigate('/admin/plans');
    }
  });

  const updatePlan = useMutation({
    mutationFn: (data: PlanFormData) => adminApi.plans.update(planId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
      navigate('/admin/plans');
    }
  });

  const onSubmit = (data: PlanFormData) => {
    if (planId) {
      updatePlan.mutate(data);
    } else {
      createPlan.mutate(data);
    }
  };

  if (isLoadingPlan) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {planId ? 'Editar Plano' : 'Novo Plano'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome do Plano
              </label>
              <input
                type="text"
                {...register('name')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Preço
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { valueAsNumber: true })}
                    className="pl-12 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ciclo de Cobrança
                </label>
                <select
                  {...register('billingCycle')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="monthly">Mensal</option>
                  <option value="yearly">Anual</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Limites
              </label>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500">Usuários</label>
                  <input
                    type="number"
                    {...register('limits.users', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Veículos</label>
                  <input
                    type="number"
                    {...register('limits.vehicles', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Armazenamento (GB)</label>
                  <input
                    type="number"
                    {...register('limits.storage', { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Funcionalidades
              </label>
              <div className="mt-2 space-y-2">
                {watch('features')?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...watch('features')];
                        newFeatures[index] = e.target.value;
                        setValue('features', newFeatures);
                      }}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeatures = watch('features').filter((_, i) => i !== index);
                        setValue('features', newFeatures);
                      }}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newFeatures = [...watch('features'), ''];
                    setValue('features', newFeatures);
                  }}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Funcionalidade
                </button>
              </div>
              {errors.features && (
                <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('isActive')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Plano Ativo
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/plans')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createPlan.isPending || updatePlan.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {createPlan.isPending || updatePlan.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}