import React from 'react';
import { X } from 'lucide-react';

interface TemplatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  preview: {
    subject?: string;
    content: string;
  };
}

export default function TemplatePreview({ isOpen, onClose, preview }: TemplatePreviewProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Preview do Template
              </h3>
              
              {preview.subject && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Assunto</h4>
                  <p className="mt-1 text-sm text-gray-900">{preview.subject}</p>
                </div>
              )}

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Conteúdo</h4>
                <div className="mt-1 p-4 bg-gray-50 rounded-lg">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: preview.content }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}