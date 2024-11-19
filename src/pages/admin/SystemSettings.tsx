import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Mail, Bell, Shield, Database } from 'lucide-react';

const settingsSchema = z.object({
  email: z.object({
    smtpHost: z.string().min(1, 'Host SMTP é obrigatório'),
    smtpPort: z.number().min(1, 'Porta SMTP é obrigatória'),
    smtpUser: z.string().min(1, 'Usuário SMTP é obrigatório'),
    smtpPassword: z.string().min(1, 'Senha SMTP é obrigatória'),
    defaultFromEmail: z.string().email('E-mail inválido')
  }),
  security: z.object({
    passwordMinLength: z.number().min(6, 'Mínimo de 6 caracteres'),
    passwordRequireNumbers: z.boolean(),
    passwordRequireSymbols: z.boolean(),
    sessionTimeout: z.number().min(5, 'Mínimo de 5 minutos'),
    maxLoginAttempts: z.number().min(1, 'Mínimo de 1 tentativa')
  }),
  notifications: z.object({
    maintenanceAlerts: z.boolean(),
    documentExpirationAlerts: z.boolean(),
    systemUpdates: z.boolean(),
    dailyReports: z.boolean()
  }),
  backup: z.object({
    autoBackup: z.boolean(),
    backupFrequency: z.enum(['daily', 'weekly', 'monthly']),
    retentionDays: z.number().min(1, 'Mínimo de 1 dia'),
    storageProvider: z.enum(['local', 's3', 'gcs'])
  })
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SystemSettings() {
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      email: {
        smtpPort: 587,
        defaultFromEmail: 'no-reply@fleetmanager.com'
      },
      security: {
        passwordMinLength: 8,
        passwordRequireNumbers: true,
        passwordRequireSymbols: true,
        sessionTimeout: 30,
        maxLoginAttempts: 5
      },
      notifications: {
        maintenanceAlerts: true,
        documentExpirationAlerts: true,
        systemUpdates: true,
        dailyReports: false
      },
      backup: {
        autoBackup: true,
        backupFrequency: 'daily',
        retentionDays: 30,
        storageProvider: 'local'
      }
    }
  });

  const onSubmit = (data: SettingsFormData) => {
    console.log('Salvando configurações:', data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Configurações do Sistema</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* E-mail */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Configurações de E-mail</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Host SMTP</label>
              <input
                type="text"
                {...register('email.smtpHost')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email?.smtpHost && (
                <p className="mt-1 text-sm text-red-600">{errors.email.smtpHost.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Porta SMTP</label>
              <input
                type="number"
                {...register('email.smtpPort', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Usuário SMTP</label>
              <input
                type="text"
                {...register('email.smtpUser')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Senha SMTP</label>
              <input
                type="password"
                {...register('email.smtpPassword')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Segurança */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Segurança</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tamanho Mínimo da Senha
              </label>
              <input
                type="number"
                {...register('security.passwordMinLength', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tempo de Sessão (minutos)
              </label>
              <input
                type="number"
                {...register('security.sessionTimeout', { valueAsNumber: true })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('security.passwordRequireNumbers')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Exigir números na senha
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('security.passwordRequireSymbols')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Exigir símbolos na senha
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Backup */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-gray-400 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Backup</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                {...register('backup.autoBackup')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Backup Automático
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequência
                </label>
                <select
                  {...register('backup.backupFrequency')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="daily">Diário</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dias de Retenção
                </label>
                <input
                  type="number"
                  {...register('backup.retentionDays', { valueAsNumber: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
}