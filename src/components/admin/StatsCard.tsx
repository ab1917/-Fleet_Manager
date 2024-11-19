import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export default function StatsCard({ title, value, change, icon: Icon, color, bg }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`${bg} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-sm ${
                change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}