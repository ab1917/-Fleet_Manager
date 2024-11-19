import React from 'react';
import { Truck, Construction, MoreHorizontal, Calendar, Wrench } from 'lucide-react';
import { Vehicle } from '../types';
import StatusBadge from './StatusBadge';

interface VehicleCardProps {
  vehicle: Vehicle;
  onSelect: (id: string) => void;
}

const vehicleIcons = {
  truck: Truck,
  crane: Construction,
  munk: Construction,
  other: MoreHorizontal
};

export default function VehicleCard({ vehicle, onSelect }: VehicleCardProps) {
  const Icon = vehicleIcons[vehicle.type];
  
  return (
    <div 
      onClick={() => onSelect(vehicle.id)}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Icon className="w-8 h-8 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {vehicle.brand} {vehicle.model}
            </h3>
            <p className="text-sm text-gray-500">Placa: {vehicle.plate}</p>
          </div>
        </div>
        <StatusBadge status={vehicle.status} />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Próx. Manutenção: {new Date(vehicle.nextMaintenance).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Wrench className="w-4 h-4 mr-2" />
          <span>Últ. Manutenção: {new Date(vehicle.lastMaintenance).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}