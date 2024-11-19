import React, { useState } from 'react';
import { Calendar, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'preventive' | 'corrective' | 'calibration';
  status: 'scheduled' | 'in_progress' | 'completed';
  date: string;
  description: string;
}

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    vehicleId: '1',
    vehicleName: 'Volvo FH 460 - ABC1234',
    type: 'preventive',
    status: 'scheduled',
    date: '2024-03-15',
    description: 'Revisão programada - 50.000 km'
  },
  {
    id: '2',
    vehicleId: '2',
    vehicleName: 'Liebherr LTM 1100 - DEF5678',
    type: 'calibration',
    status: 'in_progress',
    date: '2024-03-01',
    description: 'Calibração do sistema hidráulico'
  },
  {
    id: '3',
    vehicleId: '3',
    vehicleName: 'Palfinger PK 40002 - GHI9012',
    type: 'corrective',
    status: 'completed',
    date: '2024-02-28',
    description: 'Substituição de componentes do freio'
  }
];

const statusStyles = {
  scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  in_progress: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  completed: 'bg-green-50 text-green-700 border-green-200'
};

const typeIcons = {
  preventive: Calendar,
  corrective: Wrench,
  calibration: AlertTriangle
};

export default function MaintenanceSchedule() {
  const [filter, setFilter] = useState('all');

  const filteredTasks = filter === 'all' 
    ? mockTasks 
    : mockTasks.filter(task => task.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Todas as manutenções</option>
            <option value="scheduled">Agendadas</option>
            <option value="in_progress">Em andamento</option>
            <option value="completed">Concluídas</option>
          </select>
        </div>

        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Calendar className="w-4 h-4 mr-2" />
          Agendar Manutenção
        </button>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => {
          const TypeIcon = typeIcons[task.type];
          return (
            <div
              key={task.id}
              className={`p-4 border rounded-lg ${statusStyles[task.status]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <TypeIcon className="w-5 h-5 mt-1" />
                  <div>
                    <h3 className="font-medium">{task.vehicleName}</h3>
                    <p className="text-sm mt-1">{task.description}</p>
                    <p className="text-sm mt-2">
                      Data: {new Date(task.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-sm rounded-full border">
                  {task.status === 'scheduled' && 'Agendada'}
                  {task.status === 'in_progress' && 'Em andamento'}
                  {task.status === 'completed' && 'Concluída'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}