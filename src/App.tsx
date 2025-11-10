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

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

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

