import i18n from 'i18next'
import en from '../assets/locales/en/translation.json'
import uk from '../assets/locales/uk/translation.json'
import ru from '../assets/locales/ru/translation.json'
import { initReactI18next } from 'react-i18next'

export const LANGUAGES = new Map([
  ['en', 'English'],
  ['uk', 'Ukrainian'],
  ['ru', 'Russian'],
]);

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: ["en"],
    supportedLngs: Array.from(LANGUAGES.keys()),

    resources: {
      "en": {
        translation: en
      },
      "uk": {
        translation: uk
      },
      "ru": {
        translation: ru
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n
