import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useToastStore } from '../../store/toastStore'

const CartSidebar: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = React.useState(false)
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const { showToast } = useToastStore()

  React.useEffect(() => {
    const handleCartOpen = () => setIsOpen(true)
    window.addEventListener('openCart', handleCartOpen)
    return () => window.removeEventListener('openCart', handleCartOpen)
  }, [])

  const handleCheckout = () => {
    if (items.length === 0) return
    setIsOpen(false)
    navigate('/checkout')
  }

  const handleRemove = (productId: string) => {
    removeItem(productId)
    showToast(t('common.remove') + ' ' + t('common.success'), 'success')
  }

  const subtotal = getTotalPrice()
  const taxes = subtotal * 0.21 // 21% IVA
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + taxes + shipping

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white dark:bg-gamer-charcoal border-l border-gray-200 dark:border-gamer-gray shadow-xl z-50 flex flex-col transition-colors">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gamer-gray">
          <h2 className="text-xl font-gamer font-bold text-blue-600 dark:text-neon-blue">
            {t('common.cart')}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">{t('common.emptyCart')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gamer-gray rounded-lg transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 dark:text-white font-semibold truncate">{item.product.title}</h3>
                    <p className="text-blue-600 dark:text-neon-blue font-bold">€{item.product.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-gray-900 dark:text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-neon-blue transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.product.id)}
                    className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                    aria-label={t('common.remove')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gamer-gray p-4 space-y-2 transition-colors">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{t('common.subtotal')}</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{t('common.taxes')}</span>
              <span>€{taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{t('common.shipping')}</span>
              <span>{shipping === 0 ? t('common.free') : `€${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-blue-600 dark:text-neon-blue pt-2 border-t border-gray-200 dark:border-gamer-gray">
              <span>{t('common.total')}</span>
              <span>€{total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 dark:bg-neon-blue text-white py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-opacity-80 transition-colors"
            >
              {t('common.checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartSidebar

