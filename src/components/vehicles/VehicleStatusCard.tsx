import React from 'react';
import { CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface VehicleStatusCardProps {
  status: 'active' | 'maintenance' | 'inactive';
}

export default function VehicleStatusCard({ status }: VehicleStatusCardProps) {
  const statusConfig = {
    active: {
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      label: 'Em Operação'
    },
    maintenance: {
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      label: 'Em Manutenção'
    },
    inactive: {
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
      label: 'Inativo'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full border ${config.border} ${config.bg}`}>
      <Icon className={`w-5 h-5 ${config.color}`} />
      <span className={`ml-2 text-sm font-medium ${config.color}`}>
        {config.label}
      </span>
    </div>
  );
}