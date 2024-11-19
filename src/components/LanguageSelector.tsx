import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'pt-BR', name: 'Português' },
  { code: 'en-US', name: 'English' },
  { code: 'es-ES', name: 'Español' }
];

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center">
        <Globe className="h-5 w-5 text-gray-400 mr-2" />
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="appearance-none bg-transparent border-none focus:ring-0 text-sm text-gray-600 cursor-pointer pr-8"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}