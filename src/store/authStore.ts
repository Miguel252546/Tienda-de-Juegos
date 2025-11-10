import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { User } from '../types'

interface AuthStore {
  user: User | null
  isGuest: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  setGuest: () => void
  isAdmin: () => boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isGuest: false,
      login: async (email, password) => {
        // Simulación de login - en producción esto sería una llamada API
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const user = users.find((u: any) => u.email === email && u.password === password)
        
        if (user) {
          set({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, isGuest: false })
          return true
        }
        return false
      },
      register: async (email, password, name) => {
        // Simulación de registro
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        if (users.some((u: any) => u.email === email)) {
          return false // Email ya existe
        }
        
        const newUser = {
          id: Date.now().toString(),
          email,
          password, // En producción esto debería estar hasheado
          name,
          role: 'user' as const
        }
        
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        set({ user: { id: newUser.id, email, name, role: 'user' }, isGuest: false })
        return true
      },
      logout: () => set({ user: null, isGuest: false }),
      setGuest: () => set({ isGuest: true, user: null }),
      isAdmin: () => {
        const user = get().user
        return user?.role === 'admin'
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

