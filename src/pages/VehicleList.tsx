import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import VehicleCard from '../components/VehicleCard';
import { Vehicle } from '../types';

const mockVehicles: Vehicle[] = [
  {
    id: '1',
    type: 'truck',
    status: 'active',
    brand: 'Volvo',
    model: 'FH 460',
    year: 2022,
    plate: 'ABC1234',
    chassisNumber: '9BM395274MB123456',
    lastMaintenance: '2024-02-15',
    nextMaintenance: '2024-03-15',
    currentDriver: 'João Silva'
  },
  {
    id: '2',
    type: 'crane',
    status: 'maintenance',
    brand: 'Liebherr',
    model: 'LTM 1100',
    year: 2021,
    plate: 'DEF5678',
    chassisNumber: '8AM395274MB789012',
    lastMaintenance: '2024-01-20',
    nextMaintenance: '2024-03-01'
  },
  {
    id: '3',
    type: 'munk',
    status: 'active',
    brand: 'Palfinger',
    model: 'PK 40002',
    year: 2023,
    plate: 'GHI9012',
    chassisNumber: '7CM395274MB345678',
    lastMaintenance: '2024-02-01',
    nextMaintenance: '2024-04-01',
    currentDriver: 'Pedro Santos'
  }
];

export default function VehicleList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por placa, marca ou modelo..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos os status</option>
            <option value="active">Ativos</option>
            <option value="maintenance">Em Manutenção</option>
            <option value="inactive">Inativos</option>
          </select>
          
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Veículo
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredVehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onSelect={(id) => console.log('Selected vehicle:', id)}
          />
        ))}
      </div>
    </div>
  );
}