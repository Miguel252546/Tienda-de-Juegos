import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, Heart, User, Menu, X, Search, Moon, Sun } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useAuthStore } from '../../store/authStore'
import { useThemeStore } from '../../store/themeStore'
import LanguageSelector from '../LanguageSelector/LanguageSelector'

const Header: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  
  const totalItems = useCartStore(state => state.getTotalItems())
  const wishlistCount = useWishlistStore(state => state.items.length)
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gamer-charcoal border-b border-gray-200 dark:border-gamer-gray shadow-lg transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue dark:text-glow transition-colors">
              GameStore
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors">
              {t('common.home')}
            </Link>
            <Link to="/catalog" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors">
              {t('common.catalog')}
            </Link>
            {user && useAuthStore.getState().isAdmin() && (
              <Link to="/admin" className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors">
                {t('common.admin')}
              </Link>
            )}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.search')}
                className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gamer-gray border border-gray-300 dark:border-gamer-gray rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-neon-blue transition-colors"
                aria-label={t('common.search')}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Wishlist */}
            <Link
              to="/catalog?wishlist=true"
              className="relative p-2 text-gray-700 dark:text-white hover:text-pink-600 dark:hover:text-neon-pink transition-colors"
              aria-label={t('common.wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-pink-500 dark:bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openCart'))}
              className="relative p-2 text-gray-700 dark:text-white hover:text-cyan-600 dark:hover:text-neon-cyan transition-colors"
              aria-label={t('common.cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-cyan-500 dark:bg-neon-cyan text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="p-2 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gamer-charcoal border border-gray-200 dark:border-gamer-gray rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-2">
                    <div className="px-3 py-2 text-sm text-gray-900 dark:text-white">{user.name}</div>
                    <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">{user.email}</div>
                    <button
                      onClick={logout}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gamer-gray rounded transition-colors"
                    >
                      {t('common.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
                aria-label={t('common.login')}
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gamer-gray">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
              >
                {t('common.home')}
              </Link>
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
              >
                {t('common.catalog')}
              </Link>
              {user && useAuthStore.getState().isAdmin() && (
                <Link
                  to="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
                >
                  {t('common.admin')}
                </Link>
              )}
              <form onSubmit={handleSearch} className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('common.search')}
                    className="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gamer-gray border border-gray-300 dark:border-gamer-gray rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-neon-blue transition-colors"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
                </div>
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

