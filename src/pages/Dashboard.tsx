import React from 'react';
import * as Icons from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', maintenance: 4, repairs: 2 },
  { name: 'Fev', maintenance: 3, repairs: 1 },
  { name: 'Mar', maintenance: 5, repairs: 3 },
  { name: 'Abr', maintenance: 2, repairs: 4 },
  { name: 'Mai', maintenance: 6, repairs: 2 },
  { name: 'Jun', maintenance: 4, repairs: 1 },
];

const stats = [
  { 
    title: 'Total de Veículos',
    value: '24',
    icon: Icons.Truck,
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    title: 'Em Manutenção',
    value: '3',
    icon: Icons.Wrench,
    color: 'text-yellow-600',
    bg: 'bg-yellow-100'
  },
  {
    title: 'Motoristas Ativos',
    value: '18',
    icon: Icons.Users,
    color: 'text-green-600',
    bg: 'bg-green-100'
  },
  {
    title: 'Alertas Pendentes',
    value: '5',
    icon: Icons.AlertTriangle,
    color: 'text-red-600',
    bg: 'bg-red-100'
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
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
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Manutenções e Reparos</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="maintenance" name="Manutenções" fill="#3B82F6" />
                <Bar dataKey="repairs" name="Reparos" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alertas Recentes</h3>
          <div className="space-y-4">
            {[
              { type: 'warning', message: 'Calibração necessária - Guindaste LT100', date: '2h atrás' },
              { type: 'success', message: 'Manutenção concluída - Caminhão XYZ-1234', date: '4h atrás' },
              { type: 'error', message: 'Revisão atrasada - Munk ABC-5678', date: '1d atrás' },
            ].map((alert, index) => (
              <div key={index} className="flex items-start space-x-3">
                {alert.type === 'warning' && <Icons.AlertTriangle className="w-5 h-5 text-yellow-500" />}
                {alert.type === 'success' && <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
                {alert.type === 'error' && <Icons.AlertTriangle className="w-5 h-5 text-red-500" />}
                <div>
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-500">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}