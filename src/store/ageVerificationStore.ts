import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AgeVerificationStore {
  isVerified: boolean
  showModal: boolean
  verify: () => void
  setShowModal: (show: boolean) => void
}

export const useAgeVerificationStore = create<AgeVerificationStore>()(
  persist(
    (set) => ({
      isVerified: false,
      showModal: false,
      verify: () => set({ isVerified: true, showModal: false }),
      setShowModal: (show) => set({ showModal: show })
    }),
    {
      name: 'age-verification-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

