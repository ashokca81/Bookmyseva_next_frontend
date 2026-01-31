import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files

import enTranslation from '@/locales/en/translation.json';
import teTranslation from '@/locales/te/translation.json';
import hiTranslation from '@/locales/hi/translation.json';
import enGitaSlokas from '@/locales/en/gitaSlokas.json';
import teGitaSlokas from '@/locales/te/gitaSlokas.json';
import hiGitaSlokas from '@/locales/hi/gitaSlokas.json';
import enKidsGitaSlokas from '@/locales/en/kidsGitaSlokas.json';
import teKidsGitaSlokas from '@/locales/te/kidsGitaSlokas.json';
import hiKidsGitaSlokas from '@/locales/hi/kidsGitaSlokas.json';

// Initialize i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          ...enTranslation,
          sidebar: {
            ...enTranslation.sidebar,
            gitaSlokas: enGitaSlokas,
            kidsGitaSlokas: enKidsGitaSlokas
          }
        }
      },
      te: {
        translation: {
          ...teTranslation,
          sidebar: {
            ...teTranslation.sidebar,
            gitaSlokas: teGitaSlokas,
            kidsGitaSlokas: teKidsGitaSlokas
          }
        }
      },
      hi: {
        translation: {
          ...hiTranslation,
          sidebar: {
            ...hiTranslation.sidebar,
            gitaSlokas: hiGitaSlokas,
            kidsGitaSlokas: hiKidsGitaSlokas
          }
        }
      },
    },
    fallbackLng: 'en', // Default language
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
