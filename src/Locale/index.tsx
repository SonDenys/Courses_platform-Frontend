import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { get_translation_data } from "./translations";
import { LANGUAGE_SETTINGS_KEY } from "../params";
import { getActiveLanguageCache, setActiveLanguageCache } from "../Auth";


export let activeLanguage = 'en';

// export function t(text) {
//     return i18n.t(text)
// }

// export async function changeLanguage(language) {
//     return i18n.changeLanguage(language)
// }


// const data = {
//     en:{
//         translation: {
//             "toggle_lang": "Toggle Language"
//         }
//     },
//     ja:{
//         translation: {
//             "toggle_lang": "トグル言語"
//         }
//     }

// }

// export function get_language_settings() {
//     const lang = localStorage.getItem(LANGUAGE_SETTINGS_KEY) ;
//     return lang;
// }

// export function set_language_settings(language) {
//     localStorage.setItem(LANGUAGE_SETTINGS_KEY, language) ;
// }


export function init_i18n() {
    i18n
        // .use(Backend)
        // .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .use(LanguageDetector) // detect browser language
        .init({
            resources: get_translation_data(),
            lng: "en",
            fallbackLng: "en",

            interpolation: {
                escapeValue: false
            }
        });

    const lang = getActiveLanguageCache();

    if (!lang) {
        setActiveLanguageCache(i18n.language)
    } else {
        i18n.changeLanguage(lang)
    }
}

// init_i18n();
export default i18n;
