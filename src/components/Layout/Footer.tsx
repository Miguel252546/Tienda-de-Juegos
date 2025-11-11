import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-50 dark:bg-gamer-charcoal border-t border-gray-200 dark:border-gamer-gray mt-auto transition-colors">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-gamer font-bold text-blue-600 dark:text-neon-blue mb-4">GameStore</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Tu tienda de videojuegos online. Los mejores juegos para todas las plataformas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  {t('common.catalog')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=ofertas" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  {t('home.onSale')}
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=nuevos" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  {t('home.newReleases')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors text-sm">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gamer-gray text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} GameStore. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

