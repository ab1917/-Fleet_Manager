import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  DollarSign, TrendingUp, TrendingDown, Receipt,
  FileText, Download, Filter, Plus, CreditCard, QrCode
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { companyApi } from '../../services/companyApi';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

export default function CompanyFinancial() {
  const { user } = useAuth();
  const companyId = user?.companyId;

  const { data: financialDashboard } = useQuery({
    queryKey: ['company-financial-dashboard', companyId],
    queryFn: () => companyApi.financial.getDashboard(companyId!),
    enabled: !!companyId
  });

  const { data: billing } = useQuery({
    queryKey: ['company-billing', companyId],
    queryFn: () => companyApi.financial.getBilling(companyId!),
    enabled: !!companyId
  });

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Saldo Atual</h3>
              <p className="text-2xl font-semibold text-gray-900">
                R$ {financialDashboard?.currentBalance.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">A Receber</h3>
              <p className="text-2xl font-semibold text-gray-900">
                R$ {financialDashboard?.pendingIncome.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-red-100 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">A Pagar</h3>
              <p className="text-2xl font-semibold text-gray-900">
                R$ {financialDashboard?.pendingExpenses.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Receipt className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Faturas</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {billing?.invoices?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mensalidade do Plano */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Mensalidade do Plano</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Plano Atual</p>
              <p className="text-lg font-medium text-gray-900">{billing?.plan}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Valor Mensal</p>
              <p className="text-2xl font-semibold text-gray-900">
                R$ {billing?.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Próximo Vencimento</p>
              <p className="text-lg text-gray-900">
                {billing?.dueDate && format(new Date(billing.dueDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>

            <div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                billing?.status === 'active' 
                  ? 'bg-green-100 text-green-800'
                  : billing?.status === 'overdue'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {billing?.status === 'active' ? 'Em dia' :
                 billing?.status === 'overdue' ? 'Em atraso' : 'Cancelado'}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-sm text-gray-500">Métodos de Pagamento</p>
              
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <QrCode className="h-5 w-5 mr-2 text-gray-500" />
                  Pagar com PIX
                </button>
                
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                  Cartão de Crédito
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <FileText className="h-5 w-5 mr-2" />
                Ver Faturas Anteriores
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Comparativo Mensal</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialDashboard?.monthlyComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" name="Receitas" fill="#10B981" />
                <Bar dataKey="expense" name="Despesas" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Principais Despesas</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={financialDashboard?.topExpenseCategories}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3B82F6"
                  label
                >
                  {financialDashboard?.topExpenseCategories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}