import React from 'react';
import { FuelConsumption } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FuelConsumptionChartProps {
  data: FuelConsumption[];
}

export default function FuelConsumptionChart({ data }: FuelConsumptionChartProps) {
  const formattedData = data.map(record => ({
    ...record,
    date: format(new Date(record.date), 'dd/MM'),
    efficiency: (record.kilometers / record.liters).toFixed(2)
  }));

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="liters"
            name="Litros"
            stroke="#3B82F6"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="efficiency"
            name="Km/L"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Consumo Total</p>
          <p className="text-2xl font-semibold text-blue-900">
            {data.reduce((acc, curr) => acc + curr.liters, 0).toFixed(2)}L
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Média Km/L</p>
          <p className="text-2xl font-semibold text-green-900">
            {(data.reduce((acc, curr) => acc + curr.kilometers, 0) / 
              data.reduce((acc, curr) => acc + curr.liters, 0)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}