import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const Cart: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const subtotal = getTotalPrice()
  const taxes = subtotal * 0.21
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + taxes + shipping

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>{t('common.cart')} - GameStore</title>
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-4">
            {t('common.emptyCart')}
          </h1>
          <Link
            to="/catalog"
            className="inline-block bg-neon-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            {t('common.continueShopping')}
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('common.cart')} - GameStore</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-8">
          {t('common.cart')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-start space-x-4 p-6 bg-gamer-charcoal rounded-lg border border-gamer-gray"
              >
                <Link to={`/product/${item.product.slug}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                    loading="lazy"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.slug}`}>
                    <h3 className="text-white font-semibold text-lg mb-2 hover:text-neon-blue transition-colors">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-neon-blue font-bold text-lg mb-4">
                    €{item.product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-10 h-10 bg-gamer-gray text-white rounded-lg hover:bg-gamer-dark transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4 mx-auto" />
                      </button>
                      <span className="text-white font-semibold w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gamer-gray text-white rounded-lg hover:bg-gamer-dark transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={t('common.remove')}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg">
                    €{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray sticky top-24">
              <h2 className="text-xl font-gamer font-bold text-neon-blue mb-6">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>{t('common.subtotal')}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t('common.taxes')}</span>
                  <span>€{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>{t('common.shipping')}</span>
                  <span>{shipping === 0 ? t('common.free') : `€${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gamer-gray pt-4">
                  <div className="flex justify-between text-xl font-bold text-neon-blue">
                    <span>{t('common.total')}</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-neon-blue text-white py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-colors flex items-center justify-center space-x-2"
              >
                <span>{t('common.checkout')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/catalog"
                className="block text-center text-gray-400 hover:text-neon-blue transition-colors mt-4"
              >
                {t('common.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

