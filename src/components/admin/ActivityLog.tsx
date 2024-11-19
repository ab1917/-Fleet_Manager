import React from 'react';
import { Activity } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActivityLogProps {
  activities: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: string;
    metadata?: Record<string, any>;
  }>;
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Atividades Recentes</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg">
            <Activity className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{activity.message}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(activity.timestamp), { 
                  addSuffix: true,
                  locale: ptBR 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}