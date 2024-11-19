import React from 'react';
import { MaintenanceRecord } from '../../types';
import { Tool, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MaintenanceTimelineProps {
  records: MaintenanceRecord[];
}

export default function MaintenanceTimeline({ records }: MaintenanceTimelineProps) {
  const statusIcons = {
    completed: CheckCircle,
    scheduled: Clock,
    in_progress: Tool
  };

  const statusColors = {
    completed: 'text-green-500',
    scheduled: 'text-blue-500',
    in_progress: 'text-yellow-500'
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {records.map((record, recordIdx) => {
          const Icon = statusIcons[record.status];
          return (
            <li key={record.id}>
              <div className="relative pb-8">
                {recordIdx !== records.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      statusColors[record.status]
                    }`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-900">{record.description}</p>
                      <p className="text-sm text-gray-500">
                        Custo: R$ {record.cost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-gray-500">
                        Fornecedor: {record.provider}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {format(new Date(record.date), "dd 'de' MMMM", { locale: ptBR })}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}