import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const availableLanguages = ['FO', 'NA'];

import translationsAR from './assets/translations/ar.js';
import translationsEN from './assets/translations/en.js';

const authData = JSON.parse(localStorage.getItem('authData'));

const resources = {
    NA: {translation: translationsAR},
    FO: {translation: translationsEN}
};

i18n
    .use(Backend) // load translations using http (default public/assets/locals/en/translations)
    .use(LanguageDetector) // detect user language
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        lng:authData?.user ? authData?.user?.LANG_ID  :  "FO",
        detection: {
            checkWhitelist: true, // options for language detection
        },
        resources,
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false, // no need for react. it escapes by default
        },
    });

export default i18n;


