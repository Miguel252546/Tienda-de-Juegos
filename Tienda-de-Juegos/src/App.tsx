import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Admin from './pages/Admin'
import Login from './pages/Login'
import { useThemeStore } from './store/themeStore'
import { useAgeVerificationStore } from './store/ageVerificationStore'
import AgeVerificationModal from './components/AgeVerification/AgeVerificationModal'

function App() {
  const { theme } = useThemeStore()
  const { isVerified, showModal } = useAgeVerificationStore()

  // Apply theme when it changes
  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  // Initialize theme on mount (before Zustand loads from localStorage)
  React.useEffect(() => {
    // Check if theme is already set in localStorage
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      try {
        const parsed = JSON.parse(savedTheme)
        const savedThemeValue = parsed.state?.theme
        if (savedThemeValue === 'light') {
          document.documentElement.classList.remove('dark')
        } else {
          document.documentElement.classList.add('dark')
        }
      } catch (e) {
        // Default to dark if parsing fails
        document.documentElement.classList.add('dark')
      }
    } else {
      // Default to dark theme
      document.documentElement.classList.add('dark')
    }
  }, [])

  return (
    <>
      <Helmet>
        <html lang="es" />
      </Helmet>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
      {showModal && !isVerified && <AgeVerificationModal />}
    </>
  )
}

export default App

