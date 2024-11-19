import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Activity, Users, Database, Server,
  Clock, AlertTriangle, TrendingUp, Cpu
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockPerformanceData = [
  { time: '00:00', cpu: 45, memory: 60, requests: 120 },
  { time: '04:00', cpu: 30, memory: 55, requests: 80 },
  { time: '08:00', cpu: 65, memory: 70, requests: 200 },
  { time: '12:00', cpu: 80, memory: 85, requests: 350 },
  { time: '16:00', cpu: 70, memory: 75, requests: 280 },
  { time: '20:00', cpu: 50, memory: 65, requests: 150 }
];

export default function SystemMonitoring() {
  const { data: systemStats, isLoading } = useQuery({
    queryKey: ['system-stats'],
    queryFn: () => adminApi.system.getStats(),
    refetchInterval: 30000 // Atualiza a cada 30 segundos
  });

  const stats = [
    {
      name: 'CPU',
      value: '45%',
      icon: Cpu,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      name: 'Memória',
      value: '65%',
      icon: Database,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      name: 'Requisições/min',
      value: '250',
      icon: Activity,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      name: 'Tempo de Resposta',
      value: '120ms',
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Monitoramento do Sistema</h1>

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
                  <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Uso de Recursos</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" name="CPU %" stroke="#3B82F6" />
                <Line type="monotone" dataKey="memory" name="Memória %" stroke="#10B981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Requisições por Hora</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  name="Requisições" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Saúde do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Server className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">Status dos Serviços</span>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                Operacional
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">API</span>
                <span className="text-green-600">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Banco de Dados</span>
                <span className="text-green-600">Online</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cache</span>
                <span className="text-green-600">Online</span>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">Alertas Ativos</span>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                2 Alertas
              </span>
            </div>
            <div className="mt-4 space-y-2">
              <div className="p-2 rounded bg-yellow-50 text-yellow-700 text-sm">
                Alto uso de memória no servidor principal
              </div>
              <div className="p-2 rounded bg-red-50 text-red-700 text-sm">
                Taxa de erros acima do normal
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-900">Métricas</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Uptime</span>
                <span className="text-gray-900">99.9%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxa de Erros</span>
                <span className="text-gray-900">0.05%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tempo Médio de Resposta</span>
                <span className="text-gray-900">120ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}