import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Minus } from 'lucide-react';

const templateSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.enum(['email', 'in_app']),
  subject: z.string().min(3, 'Assunto é obrigatório'),
  content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
  variables: z.array(z.string()).min(1, 'Adicione pelo menos uma variável')
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface TemplateFormProps {
  onSubmit: (data: TemplateFormData) => void;
  initialData?: Partial<TemplateFormData>;
  isLoading?: boolean;
}

export default function TemplateForm({ onSubmit, initialData, isLoading }: TemplateFormProps) {
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: initialData || {
      type: 'email',
      variables: []
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome do Template
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
          Tipo
        </label>
        <select
          {...register('type')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="email">E-mail</option>
          <option value="in_app">No Sistema</option>
        </select>
      </div>

      {watch('type') === 'email' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assunto
          </label>
          <input
            type="text"
            {...register('subject')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Conteúdo
        </label>
        <textarea
          {...register('content')}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Variáveis
        </label>
        <div className="mt-2 space-y-2">
          {watch('variables')?.map((variable, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={variable}
                onChange={(e) => {
                  const newVariables = [...watch('variables')];
                  newVariables[index] = e.target.value;
                  setValue('variables', newVariables);
                }}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  const newVariables = watch('variables').filter((_, i) => i !== index);
                  setValue('variables', newVariables);
                }}
                className="p-2 text-red-600 hover:text-red-700"
              >
                <Minus className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newVariables = [...watch('variables'), ''];
              setValue('variables', newVariables);
            }}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Variável
          </button>
        </div>
        {errors.variables && (
          <p className="mt-1 text-sm text-red-600">{errors.variables.message}</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Salvando...' : 'Salvar Template'}
        </button>
      </div>
    </form>
  );
}