import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ne from './locales/ne.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ne: { translation: ne },
    },
    // Try localStorage key first, then browser language, fallback to 'en'
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'nepal-tourism-lang-code',
      caches: ['localStorage'],
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
