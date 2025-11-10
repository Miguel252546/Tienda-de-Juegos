import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { useToastStore } from '../store/toastStore'

const Login: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, register, setGuest } = useAuthStore()
  const { showToast } = useToastStore()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(formData.email, formData.password)
    if (success) {
      showToast(t('common.success'), 'success')
      navigate('/')
    } else {
      showToast('Credenciales incorrectas', 'error')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await register(formData.email, formData.password, formData.name)
    if (success) {
      showToast(t('common.success'), 'success')
      navigate('/')
    } else {
      showToast('El email ya está registrado', 'error')
    }
  }

  const handleGuest = () => {
    setGuest()
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>{t('common.login')} - GameStore</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-gamer-charcoal rounded-lg p-8 border border-gamer-gray">
          <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-8 text-center">
            {isLogin ? t('common.login') : t('common.register')}
          </h1>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white font-semibold mb-2">{t('common.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                />
              </div>
            )}
            <div>
              <label className="block text-white font-semibold mb-2">{t('common.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">{t('common.password')}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-neon-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
              {isLogin ? t('common.login') : t('common.register')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-neon-blue transition-colors"
            >
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gamer-gray" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gamer-charcoal text-gray-400">o</span>
              </div>
            </div>
            <button
              onClick={handleGuest}
              className="w-full mt-4 bg-transparent border-2 border-neon-blue text-neon-blue py-3 rounded-lg font-semibold hover:bg-neon-blue hover:text-white transition-colors"
            >
              {t('common.continueAsGuest')}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-gray-400 hover:text-neon-blue transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

