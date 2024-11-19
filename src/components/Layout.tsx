import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const navItems = user?.role === 'super_admin' ? [
    { path: '/admin', icon: Icons.LayoutDashboard, label: 'Painel' },
    { path: '/admin/companies', icon: Icons.Building2, label: 'Empresas' },
    { path: '/admin/financial', icon: Icons.DollarSign, label: 'Financeiro' },
    { path: '/admin/plans', icon: Icons.Package, label: 'Planos' },
    { path: '/admin/notifications', icon: Icons.Bell, label: 'Notificações' },
    { path: '/admin/reports', icon: Icons.BarChart2, label: 'Relatórios' },
    { path: '/admin/settings', icon: Icons.Settings, label: 'Configurações' },
    { path: '/admin/audit-logs', icon: Icons.FileText, label: 'Logs de Auditoria' }
  ] : [
    { path: '/dashboard', icon: Icons.LayoutDashboard, label: 'Painel' },
    { path: '/vehicles', icon: Icons.Truck, label: 'Veículos' },
    { path: '/maintenance', icon: Icons.Wrench, label: 'Manutenção' },
    { path: '/drivers', icon: Icons.Users, label: 'Motoristas' },
    { path: '/financial', icon: Icons.DollarSign, label: 'Financeiro' },
    ...(user?.role === 'admin' ? [
      { path: '/company/users', icon: Icons.UserPlus, label: 'Usuários' }
    ] : [])
  ];

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar Mobile Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
        >
          {isSidebarOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-10 h-full w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600">Fleet Manager</h1>
        </div>
        
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600
                  ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''}
                `}
              >
                <Icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              {navItems.find(item => item.path === location.pathname)?.label || 'Painel'}
            </h1>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <Icons.ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Icons.LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}