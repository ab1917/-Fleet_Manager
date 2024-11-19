import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, AlertTriangle, TrendingUp, Activity, Truck } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockActivityData = [
  { date: '2024-01', companies: 8, users: 45, vehicles: 120 },
  { date: '2024-02', companies: 12, users: 68, vehicles: 180 },
  { date: '2024-03', companies: 15, users: 85, vehicles: 230 }
];

const mockPlanDistribution = [
  { plan: 'Basic', count: 5 },
  { plan: 'Professional', count: 8 },
  { plan: 'Enterprise', count: 2 }
];

export default function AdminDashboard() {
  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['companies'],
    queryFn: () => adminApi.companies.list()
  });

  const { data: systemStats } = useQuery({
    queryKey: ['system-stats'],
    queryFn: () => adminApi.system.getStats()
  });

  const stats = [
    {
      title: 'Total de Empresas',
      value: companies?.length || 0,
      change: '+20%',
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Usuários Ativos',
      value: systemStats?.activeUsers || 0,
      change: '+12%',
      icon: Users,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Veículos Monitorados',
      value: systemStats?.totalVehicles || 0,
      change: '+15%',
      icon: Truck,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      title: 'Alertas Pendentes',
      value: systemStats?.pendingAlerts || 0,
      change: '-5%',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Administrativo</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`${stat.bg} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <span className={`ml-2 text-sm ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Crescimento do Sistema</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="companies" name="Empresas" stroke="#3B82F6" />
                <Line type="monotone" dataKey="users" name="Usuários" stroke="#10B981" />
                <Line type="monotone" dataKey="vehicles" name="Veículos" stroke="#8B5CF6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Distribuição de Planos</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPlanDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Empresas" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h2>
        <div className="space-y-4">
          {[
            { type: 'company_added', message: 'Nova empresa cadastrada: Transportes XYZ', time: '2h atrás' },
            { type: 'plan_upgraded', message: 'Upgrade de plano: Logística ABC para Enterprise', time: '5h atrás' },
            { type: 'alert', message: 'Alerta de uso: Sistema próximo ao limite de usuários', time: '1d atrás' }
          ].map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
              <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}