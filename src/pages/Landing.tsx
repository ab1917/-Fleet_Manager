import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, Shield, BarChart2, Bell, Clock, Users,
  CheckCircle, ArrowRight, MapPin, Wrench, Building2,
  DollarSign, FileText, Settings
} from 'lucide-react';

export default function Landing() {
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-sm z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">Fleet Manager</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-500 hover:text-gray-900">Login</Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Teste Grátis
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              Gestão Inteligente de Frotas
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
              Controle total da sua frota em uma única plataforma. Monitore veículos, 
              gerencie manutenções e otimize custos com nossa solução completa.
            </p>
            <div className="mt-10 flex justify-center space-x-6">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Agendar Demonstração
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Recursos Completos para sua Operação
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Tudo que você precisa para gerenciar sua frota de forma eficiente
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: 'Rastreamento em Tempo Real',
                description: 'Monitore sua frota 24/7 com GPS e geofencing avançado.'
              },
              {
                icon: Wrench,
                title: 'Gestão de Manutenção',
                description: 'Controle manutenções preventivas e corretivas automaticamente.'
              },
              {
                icon: Users,
                title: 'Gestão de Motoristas',
                description: 'Acompanhe documentação, escalas e desempenho dos motoristas.'
              },
              {
                icon: BarChart2,
                title: 'Relatórios Detalhados',
                description: 'Análises completas para tomada de decisões estratégicas.'
              },
              {
                icon: Bell,
                title: 'Alertas Inteligentes',
                description: 'Notificações automáticas sobre eventos importantes.'
              },
              {
                icon: DollarSign,
                title: 'Controle de Custos',
                description: 'Gestão completa de despesas e indicadores financeiros.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="relative p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Clientes Ativos', value: '500+' },
              { label: 'Veículos Monitorados', value: '5.000+' },
              { label: 'Manutenções Gerenciadas', value: '25.000+' },
              { label: 'Economia Média', value: '32%' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-base text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Pronto para otimizar sua operação?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Comece agora mesmo com nosso período de teste gratuito
            </p>
            <div className="mt-8">
              <Link
                to="/register"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold text-white">Fleet Manager</span>
              </div>
              <p className="mt-4 text-gray-400">
                Gestão inteligente para sua frota
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Produto</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/features" className="text-base text-gray-400 hover:text-white">
                    Recursos
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-base text-gray-400 hover:text-white">
                    Preços
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Suporte</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/contact" className="text-base text-gray-400 hover:text-white">
                    Contato
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="text-base text-gray-400 hover:text-white">
                    Documentação
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link to="/privacy" className="text-base text-gray-400 hover:text-white">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-base text-gray-400 hover:text-white">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2024 Fleet Manager. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}