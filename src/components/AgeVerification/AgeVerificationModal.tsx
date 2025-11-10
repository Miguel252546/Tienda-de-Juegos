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
      <div className="bg-gamer-charcoal border border-neon-blue rounded-lg p-6 max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-gamer font-bold text-neon-blue">
            {t('ageVerification.title')}
          </h2>
          <button
            onClick={handleDeny}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-white mb-6">
          {t('ageVerification.message')}
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleVerify}
            className="flex-1 bg-neon-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            {t('ageVerification.yes')}
          </button>
          <button
            onClick={handleDeny}
            className="flex-1 bg-gamer-gray text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            {t('ageVerification.no')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AgeVerificationModal

