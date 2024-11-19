import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../services/adminApi';
import { cnpjApi, CNPJData } from '../../services/cnpjApi';
import { Save, Search, Building2, AlertCircle } from 'lucide-react';

const companySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  tradingName: z.string().min(3, 'Nome fantasia deve ter no mínimo 3 caracteres'),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, 'CNPJ inválido'),
  plan: z.enum(['basic', 'professional', 'enterprise']),
  cnae: z.string().optional(),
  email: z.string().email('E-mail inválido').optional().nullable(),
  phone: z.string().optional().nullable(),
  address: z.object({
    street: z.string().min(3, 'Endereço é obrigatório'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, 'Bairro é obrigatório'),
    city: z.string().min(2, 'Cidade é obrigatória'),
    state: z.string().length(2, 'Estado deve ter 2 caracteres'),
    zipCode: z.string().regex(/^\d{5}-\d{3}$/, 'CEP inválido')
  })
});

type CompanyFormData = z.infer<typeof companySchema>;

export default function CompanyForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [cnpjError, setCnpjError] = useState<string | null>(null);
  const [isLoadingCNPJ, setIsLoadingCNPJ] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      plan: 'basic'
    }
  });

  const createCompany = useMutation({
    mutationFn: (data: CompanyFormData) => adminApi.companies.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/admin/companies');
    }
  });

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const handleCNPJChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNPJ(e.target.value);
    setValue('cnpj', formatted);
  };

  const lookupCNPJ = async () => {
    const cnpj = watch('cnpj');
    if (!cnpj || cnpj.length !== 18) {
      setCnpjError('CNPJ inválido');
      return;
    }

    setIsLoadingCNPJ(true);
    setCnpjError(null);

    try {
      const data = await cnpjApi.lookup(cnpj);
      
      setValue('name', data.razao_social);
      setValue('tradingName', data.nome_fantasia || data.razao_social);
      setValue('email', data.email || '');
      setValue('phone', data.telefone || '');
      setValue('cnae', `${data.cnae_fiscal} - ${data.cnae_fiscal_descricao}`);
      setValue('address', {
        street: data.logradouro,
        number: data.numero,
        complement: data.complemento || '',
        neighborhood: data.bairro,
        city: data.municipio,
        state: data.uf,
        zipCode: data.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')
      });
    } catch (error) {
      setCnpjError(error instanceof Error ? error.message : 'Erro ao buscar CNPJ');
    } finally {
      setIsLoadingCNPJ(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Nova Empresa</h1>
      
      <form onSubmit={handleSubmit((data) => createCompany.mutate(data))} className="space-y-8">
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Informações Básicas</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CNPJ
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  {...register('cnpj')}
                  onChange={handleCNPJChange}
                  maxLength={18}
                  placeholder="00.000.000/0000-00"
                  className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={lookupCNPJ}
                  disabled={isLoadingCNPJ}
                  className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoadingCNPJ ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  <span>Buscar</span>
                </button>
              </div>
              {errors.cnpj && (
                <p className="mt-1 text-sm text-red-600">{errors.cnpj.message}</p>
              )}
              {cnpjError && (
                <p className="mt-1 text-sm text-red-600">{cnpjError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Razão Social
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
                Nome Fantasia
              </label>
              <input
                type="text"
                {...register('tradingName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.tradingName && (
                <p className="mt-1 text-sm text-red-600">{errors.tradingName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                  Telefone
                </label>
                <input
                  type="text"
                  {...register('phone')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CNAE
              </label>
              <input
                type="text"
                {...register('cnae')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plano
              </label>
              <select
                {...register('plan')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="basic">Básico</option>
                <option value="professional">Profissional</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Endereço</h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  {...register('address.zipCode')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.address?.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.zipCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logradouro
              </label>
              <input
                type="text"
                {...register('address.street')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.address?.street && (
                <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número
                </label>
                <input
                  type="text"
                  {...register('address.number')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.address?.number && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.number.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Complemento
                </label>
                <input
                  type="text"
                  {...register('address.complement')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bairro
              </label>
              <input
                type="text"
                {...register('address.neighborhood')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.address?.neighborhood && (
                <p className="mt-1 text-sm text-red-600">{errors.address.neighborhood.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cidade
                </label>
                <input
                  type="text"
                  {...register('address.city')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <input
                  type="text"
                  {...register('address.state')}
                  maxLength={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.address?.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.state.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/companies')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={createCompany.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <Save className="h-4 w-4 mr-2" />
            {createCompany.isPending ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}