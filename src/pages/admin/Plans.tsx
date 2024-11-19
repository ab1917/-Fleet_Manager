import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Edit2, Archive, Plus, Check } from 'lucide-react';
import { adminApi } from '../../services/adminApi';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    users: number;
    vehicles: number;
    storage: number;
  };
  isActive: boolean;
}

export default function Plans() {
  const queryClient = useQueryClient();
  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: () => adminApi.plans.list()
  });

  const updatePlan = useMutation({
    mutationFn: (data: { id: string; plan: Partial<Plan> }) =>
      adminApi.plans.update(data.id, data.plan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['plans'] });
    }
  });

  const features = {
    basic: [
      'Gestão básica de frota',
      'Manutenções preventivas',
      'Relatórios básicos',
      'Suporte por email'
    ],
    professional: [
      'Tudo do plano Básico',
      'Rastreamento em tempo real',
      'Gestão de motoristas',
      'Controle de combustível',
      'Relatórios avançados',
      'Suporte prioritário'
    ],
    enterprise: [
      'Tudo do plano Professional',
      'API personalizada',
      'Integrações customizadas',
      'Gerenciamento multi-empresa',
      'Suporte 24/7',
      'Gestor de conta dedicado'
    ]
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Planos e Preços</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Plano
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans?.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-sm ${
              plan.isActive ? 'border-2 border-blue-500' : 'border border-gray-200'
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Archive className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">
                  R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-gray-500">/{plan.billingCycle === 'monthly' ? 'mês' : 'ano'}</span>
              </div>

              <ul className="mt-6 space-y-4">
                {features[plan.name.toLowerCase() as keyof typeof features].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Usuários</span>
                  <span className="font-medium text-gray-900">até {plan.limits.users}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Veículos</span>
                  <span className="font-medium text-gray-900">até {plan.limits.vehicles}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Armazenamento</span>
                  <span className="font-medium text-gray-900">{plan.limits.storage}GB</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}