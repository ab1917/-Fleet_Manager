import React from 'react';
import { VehicleDocument } from '../../types';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DocumentsListProps {
  documents: VehicleDocument[];
}

export default function DocumentsList({ documents }: DocumentsListProps) {
  const statusIcons = {
    valid: CheckCircle,
    expired: AlertTriangle,
    expiring_soon: Clock
  };

  const statusColors = {
    valid: 'text-green-500',
    expired: 'text-red-500',
    expiring_soon: 'text-yellow-500'
  };

  const statusLabels = {
    valid: 'Válido',
    expired: 'Vencido',
    expiring_soon: 'Vencendo em breve'
  };

  const documentTypes = {
    license: 'Licenciamento',
    insurance: 'Seguro',
    inspection: 'Vistoria'
  };

  return (
    <div className="divide-y divide-gray-200">
      {documents.map((doc) => {
        const Icon = statusIcons[doc.status];
        return (
          <div key={doc.id} className="py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">
                  {documentTypes[doc.type]}
                </p>
                <p className="text-sm text-gray-500">
                  Nº {doc.number}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <p className="text-sm text-gray-900">
                  Vencimento: {format(new Date(doc.expirationDate), "dd/MM/yyyy")}
                </p>
                <p className={`text-sm ${statusColors[doc.status]}`}>
                  {statusLabels[doc.status]}
                </p>
              </div>
              <Icon className={`h-5 w-5 ${statusColors[doc.status]}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}