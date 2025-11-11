import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState(i18n.language)

  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' }
  ]

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      setCurrentLang(lng)
    }

    i18n.on('languageChanged', handleLanguageChange)
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  const changeLanguage = async (langCode: string) => {
    try {
      await i18n.changeLanguage(langCode)
      localStorage.setItem('language', langCode)
      setCurrentLang(langCode)
      setIsOpen(false)
    } catch (error) {
      console.error('Error changing language:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-5 h-5" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gamer-charcoal border border-gray-200 dark:border-gamer-gray rounded-lg shadow-lg z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  currentLang === lang.code || i18n.language === lang.code
                    ? 'bg-blue-600 dark:bg-neon-blue text-white'
                    : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gamer-gray'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector

