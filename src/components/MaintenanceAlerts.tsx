import React from 'react';
import { AlertTriangle, Calendar, AlertCircle } from 'lucide-react';
import { MaintenanceAlert } from '../types';

interface MaintenanceAlertsProps {
  alerts: MaintenanceAlert[];
}

export default function MaintenanceAlerts({ alerts }: MaintenanceAlertsProps) {
  const alertStyles = {
    scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
    overdue: 'bg-red-50 text-red-700 border-red-200',
    urgent: 'bg-yellow-50 text-yellow-700 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2" />
        <h2 className="text-lg font-semibold">Alertas de Manutenção</h2>
      </div>
      
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border ${alertStyles[alert.type]} flex items-start`}
          >
            {alert.type === 'scheduled' ? (
              <Calendar className="w-5 h-5 mr-3" />
            ) : (
              <AlertCircle className="w-5 h-5 mr-3" />
            )}
            <div>
              <p className="font-medium">{alert.description}</p>
              <p className="text-sm mt-1">
                Vencimento: {new Date(alert.dueDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}