import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { companyApi } from '../../services/companyApi';

interface CompanyUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser?: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  role: z.enum(['manager', 'operator'], {
    required_error: 'Selecione uma função'
  }),
  permissions: z.array(z.string()).min(1, 'Selecione pelo menos uma permissão')
});

type UserFormData = z.infer<typeof userSchema>;

const availablePermissions = [
  { id: 'vehicles.view', label: 'Visualizar veículos' },
  { id: 'vehicles.edit', label: 'Editar veículos' },
  { id: 'maintenance.view', label: 'Visualizar manutenções' },
  { id: 'maintenance.edit', label: 'Gerenciar manutenções' },
  { id: 'drivers.view', label: 'Visualizar motoristas' },
  { id: 'drivers.edit', label: 'Gerenciar motoristas' },
  { id: 'reports.view', label: 'Visualizar relatórios' }
];

export default function CompanyUserModal({ isOpen, onClose, editingUser }: CompanyUserModalProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: editingUser || {
      permissions: []
    }
  });

  const createUser = useMutation({
    mutationFn: (data: UserFormData) => 
      companyApi.users.create(user?.companyId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-users', user?.companyId] });
      reset();
      onClose();
    }
  });

  const updateUser = useMutation({
    mutationFn: (data: UserFormData & { id: string }) => 
      companyApi.users.update(user?.companyId!, data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company-users', user?.companyId] });
      reset();
      onClose();
    }
  });

  const onSubmit = (data: UserFormData) => {
    if (editingUser) {
      updateUser.mutate({ ...data, id: editingUser.id });
    } else {
      createUser.mutate(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Função
                  </label>
                  <select
                    {...register('role')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Selecione uma função</option>
                    <option value="manager">Gerente</option>
                    <option value="operator">Operador</option>
                  </select>
                  {errors.role && (
                    <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Permissões
                  </label>
                  <div className="mt-2 space-y-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center">
                        <input
                          type="checkbox"
                          {...register('permissions')}
                          value={permission.id}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.permissions && (
                    <p className="mt-1 text-sm text-red-600">{errors.permissions.message}</p>
                  )}
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={createUser.isPending || updateUser.isPending}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                  >
                    {createUser.isPending || updateUser.isPending ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}