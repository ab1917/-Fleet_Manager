import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import GlobalFinancial from './pages/admin/GlobalFinancial';
import Companies from './pages/admin/Companies';
import CompanyForm from './pages/admin/CompanyForm';
import CompanyUsers from './pages/admin/CompanyUsers';
import CompanySettings from './pages/admin/CompanySettings';
import Plans from './pages/admin/Plans';
import PlanForm from './pages/admin/PlanForm';
import Reports from './pages/admin/Reports';
import Notifications from './pages/admin/Notifications';
import NotificationTemplates from './pages/admin/NotificationTemplates';
import Integrations from './pages/admin/Integrations';
import SystemSettings from './pages/admin/SystemSettings';
import AuditLogs from './pages/admin/AuditLogs';
import SystemMonitoring from './pages/admin/SystemMonitoring';

// Company Pages
import Dashboard from './pages/Dashboard';
import VehicleList from './pages/VehicleList';
import MaintenanceSchedule from './pages/MaintenanceSchedule';
import DriversManagement from './pages/DriversManagement';
import CompanyFinancial from './pages/company/Financial';
import UserManagement from './pages/company/UserManagement';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <AdminDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/financial"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <GlobalFinancial />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/companies"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <Companies />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/companies/new"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <CompanyForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/companies/:companyId/users"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <CompanyUsers />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/companies/:companyId/settings"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <CompanySettings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <Plans />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/plans/new"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <PlanForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/plans/:planId/edit"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <PlanForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <Notifications />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notifications/templates"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <NotificationTemplates />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <SystemSettings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/audit-logs"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <AuditLogs />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/monitoring"
          element={
            <PrivateRoute allowedRoles={['super_admin']}>
              <Layout>
                <SystemMonitoring />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* Company Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['admin', 'manager', 'operator']}>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/financial"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Layout>
                <CompanyFinancial />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/vehicles"
          element={
            <PrivateRoute allowedRoles={['admin', 'manager', 'operator']}>
              <Layout>
                <VehicleList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/maintenance"
          element={
            <PrivateRoute allowedRoles={['admin', 'manager']}>
              <Layout>
                <MaintenanceSchedule />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/drivers"
          element={
            <PrivateRoute allowedRoles={['admin', 'manager']}>
              <Layout>
                <DriversManagement />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/company/users"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Layout>
                <UserManagement />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}