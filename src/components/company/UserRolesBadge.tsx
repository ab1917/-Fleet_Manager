import React from 'react';
import { Shield, Users, Wrench } from 'lucide-react';

interface UserRolesBadgeProps {
  role: string;
}

const roleConfig = {
  admin: {
    icon: Shield,
    label: 'Administrador',
    color: 'text-purple-700',
    bg: 'bg-purple-100'
  },
  manager: {
    icon: Users,
    label: 'Gerente',
    color: 'text-blue-700',
    bg: 'bg-blue-100'
  },
  operator: {
    icon: Wrench,
    label: 'Operador',
    color: 'text-green-700',
    bg: 'bg-green-100'
  }
};

export default function UserRolesBadge({ role }: UserRolesBadgeProps) {
  const config = roleConfig[role as keyof typeof roleConfig];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      <Icon className="w-4 h-4 mr-1" />
      {config.label}
    </span>
  );
}