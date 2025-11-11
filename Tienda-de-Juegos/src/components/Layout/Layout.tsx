import React from 'react'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from '../Cart/CartSidebar'
import Toast from '../Toast/Toast'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gamer-dark">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartSidebar />
      <Toast />
    </div>
  )
}

export default Layout

