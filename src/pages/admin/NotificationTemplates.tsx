import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Mail, MessageSquare, Plus, Edit2, Trash2,
  Code, Eye, Copy
} from 'lucide-react';
import { adminApi } from '../../services/adminApi';

export default function NotificationTemplates() {
  const queryClient = useQueryClient();
  
  const { data: templates, isLoading } = useQuery({
    queryKey: ['notification-templates'],
    queryFn: () => adminApi.notifications.listTemplates()
  });

  const deleteTemplate = useMutation({
    mutationFn: (id: string) => adminApi.notifications.deleteTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    }
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Implementar feedback visual
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Templates de Notificação</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates?.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {template.type === 'email' ? (
                    <Mail className="h-5 w-5 text-blue-500" />
                  ) : (
                    <MessageSquare className="h-5 w-5 text-green-500" />
                  )}
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{template.name}</h3>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-500">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => deleteTemplate.mutate(template.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-2 text-sm text-gray-500">{template.subject}</p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Variáveis</span>
                  <button
                    onClick={() => copyToClipboard(template.variables.join(', '))}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {template.variables.map((variable) => (
                    <span
                      key={variable}
                      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <Code className="h-3 w-3 mr-1" />
                      {variable}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Preview</span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2">
                  <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                    {template.content.substring(0, 100)}...
                  </pre>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}