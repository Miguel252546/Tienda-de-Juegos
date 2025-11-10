import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import esTranslations from './locales/es.json'
import enTranslations from './locales/en.json'

// Función segura para obtener el idioma del localStorage
const getLanguage = (): string => {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('language') || 'es'
    } catch (e) {
      return 'es'
    }
  }
  return 'es'
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslations },
      en: { translation: enTranslations }
    },
    lng: getLanguage(),
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

