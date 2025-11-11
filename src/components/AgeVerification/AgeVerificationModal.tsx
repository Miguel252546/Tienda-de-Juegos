import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAgeVerificationStore } from '../../store/ageVerificationStore'
import { X } from 'lucide-react'

const AgeVerificationModal: React.FC = () => {
  const { t } = useTranslation()
  const { verify, setShowModal } = useAgeVerificationStore()

  const handleVerify = () => {
    verify()
  }

  const handleDeny = () => {
    setShowModal(false)
    window.history.back()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="bg-white dark:bg-gamer-charcoal border border-blue-500 dark:border-neon-blue rounded-lg p-6 max-w-md w-full shadow-xl transition-colors">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue">
            {t('ageVerification.title')}
          </h2>
          <button
            onClick={handleDeny}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-900 dark:text-white mb-6">
          {t('ageVerification.message')}
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleVerify}
            className="flex-1 bg-blue-600 dark:bg-neon-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-opacity-80 transition-colors"
          >
            {t('ageVerification.yes')}
          </button>
          <button
            onClick={handleDeny}
            className="flex-1 bg-gray-200 dark:bg-gamer-gray text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-opacity-80 transition-colors"
          >
            {t('ageVerification.no')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgeVerificationModal

