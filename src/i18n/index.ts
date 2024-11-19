import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    supportedLngs: ['pt-BR', 'en-US', 'es-ES'],
    defaultNS: 'common',
    ns: ['common', 'auth', 'dashboard', 'vehicles', 'maintenance', 'financial', 'admin'],
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    }
  });

// Força o idioma padrão para pt-BR se nenhum outro estiver definido
if (!localStorage.getItem('i18nextLng')) {
  i18n.changeLanguage('pt-BR');
}

export default i18n;