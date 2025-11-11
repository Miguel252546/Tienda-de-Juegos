import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import esTranslations from './locales/es.json'
import enTranslations from './locales/en.json'

// Función segura para obtener el idioma del localStorage
const getLanguage = (): string => {
  if (typeof window !== 'undefined') {
    try {
      const savedLang = localStorage.getItem('language')
      if (savedLang && (savedLang === 'es' || savedLang === 'en')) {
        return savedLang
      }
      // Detect language from browser
      const browserLang = navigator.language.split('-')[0]
      return browserLang === 'en' ? 'en' : 'es'
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
    },
    react: {
      useSuspense: false
    }
  })

// Save language changes to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('language', lng)
    } catch (e) {
      console.error('Error saving language to localStorage:', e)
    }
  }
})

export default i18n

