import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const notificationSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  message: z.string().min(1, 'Mensagem é obrigatória'),
  type: z.enum(['info', 'warning', 'error', 'success']),
  target: z.enum(['all', 'company', 'user']),
  targetId: z.string().optional(),
  channels: z.array(z.enum(['email', 'in_app', 'sms'])).min(1, 'Selecione pelo menos um canal'),
  scheduledFor: z.string().optional(),
  template: z.string().optional()
});

type NotificationFormData = z.infer<typeof notificationSchema>;

interface NotificationFormProps {
  onSubmit: (data: NotificationFormData) => void;
  isLoading?: boolean;
}

export default function NotificationForm({ onSubmit, isLoading }: NotificationFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema)
  });

  const selectedTarget = watch('target');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Mensagem
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tipo
          </label>
          <select
            {...register('type')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="info">Informação</option>
            <option value="warning">Aviso</option>
            <option value="error">Erro</option>
            <option value="success">Sucesso</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destino
          </label>
          <select
            {...register('target')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="company">Empresa Específica</option>
            <option value="user">Usuário Específico</option>
          </select>
        </div>
      </div>

      {selectedTarget !== 'all' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ID do {selectedTarget === 'company' ? 'Empresa' : 'Usuário'}
          </label>
          <input
            type="text"
            {...register('targetId')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Canais de Envio
        </label>
        <div className="mt-2 space-y-2">
          {['email', 'in_app', 'sms'].map((channel) => (
            <div key={channel} className="flex items-center">
              <input
                type="checkbox"
                {...register('channels')}
                value={channel}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                {channel === 'email' ? 'E-mail' : 
                 channel === 'in_app' ? 'No Sistema' : 'SMS'}
              </label>
            </div>
          ))}
        </div>
        {errors.channels && (
          <p className="mt-1 text-sm text-red-600">{errors.channels.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Agendar Envio (opcional)
        </label>
        <input
          type="datetime-local"
          {...register('scheduledFor')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Enviando...' : 'Enviar Notificação'}
        </button>
      </div>
    </form>
  );
}