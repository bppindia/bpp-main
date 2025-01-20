import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

// Import the translation files
import enCommon from '@/modules/I18n/Translations/en/common.json';
import enHeader from '@/modules/I18n/Translations/en/header.json';
import enHomePage from '@/modules/I18n/Translations/en/homepage.json';

import hiCommon from '@/modules/I18n/Translations/hi/common.json';
import hiHeader from '@/modules/I18n/Translations/hi/header.json';
import hiHomePage from '@/modules/I18n/Translations/hi/homepage.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(Backend)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        common: enCommon,
        header: enHeader,
        homePage: enHomePage,
      },
      hi: {
        common: hiCommon,
        header: hiHeader,
        homePage: hiHomePage,
      },
    },
    ns: ['header', 'common', 'homePage'],
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    defaultNS: 'common',
  });

export default i18n;
