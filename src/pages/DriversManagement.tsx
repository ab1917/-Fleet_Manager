import React, { useState } from 'react';
import { Users, Search, Plus, Phone, Mail, Calendar } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  license: {
    number: string;
    category: string;
    expiration: string;
  };
  status: 'available' | 'on_duty' | 'off_duty';
}

const mockDrivers: Driver[] = [
  {
    id: '1',
    name: 'João Silva',
    photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    license: {
      number: '12345678900',
      category: 'E',
      expiration: '2025-06-15'
    },
    status: 'available'
  },
  {
    id: '2',
    name: 'Pedro Santos',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    phone: '(11) 98765-1234',
    email: 'pedro.santos@email.com',
    license: {
      number: '98765432100',
      category: 'E',
      expiration: '2024-12-20'
    },
    status: 'on_duty'
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    phone: '(11) 98765-5678',
    email: 'maria.oliveira@email.com',
    license: {
      number: '45678912300',
      category: 'D',
      expiration: '2025-03-10'
    },
    status: 'off_duty'
  }
];

const statusStyles = {
  available: 'bg-green-50 text-green-700',
  on_duty: 'bg-blue-50 text-blue-700',
  off_duty: 'bg-gray-50 text-gray-700'
};

export default function DriversManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = mockDrivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.license.number.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nome ou CNH..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Motorista
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4">
              <img
                src={driver.photo}
                alt={driver.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{driver.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${statusStyles[driver.status]}`}>
                  {driver.status === 'available' && 'Disponível'}
                  {driver.status === 'on_duty' && 'Em serviço'}
                  {driver.status === 'off_duty' && 'Fora de serviço'}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2" />
                {driver.phone}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                {driver.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                CNH {driver.license.category} - Venc. {new Date(driver.license.expiration).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}