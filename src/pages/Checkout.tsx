import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { CreditCard, Lock, CheckCircle } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useToastStore } from '../store/toastStore'

const Checkout: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { showToast } = useToastStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'España',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const subtotal = getTotalPrice()
  const taxes = subtotal * 0.21
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + taxes + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate order number
    const orderNum = `ORD-${Date.now()}`
    setOrderNumber(orderNum)
    setOrderPlaced(true)
    clearCart()
    showToast(t('checkout.orderPlaced'), 'success')
    setIsProcessing(false)
  }

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart')
    return null
  }

  if (orderPlaced) {
    return (
      <>
        <Helmet>
          <title>{t('checkout.orderPlaced')} - GameStore</title>
        </Helmet>
        <div className="container mx-auto px-4 py-12 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-4">
            {t('checkout.orderPlaced')}
          </h1>
          <p className="text-gray-400 mb-2">
            {t('checkout.orderNumber')}: <span className="text-neon-blue font-bold">{orderNumber}</span>
          </p>
          <p className="text-gray-400 mb-8">
            Recibirás un correo de confirmación en breve.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="bg-neon-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            {t('common.continueShopping')}
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>{t('checkout.title')} - GameStore</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-8">
          {t('checkout.title')}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray">
              <h2 className="text-xl font-gamer font-bold text-neon-blue mb-6">
                {t('checkout.shippingInfo')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2">Dirección</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Código Postal</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">País</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="España">España</option>
                    <option value="México">México</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Colombia">Colombia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray">
              <h2 className="text-xl font-gamer font-bold text-neon-blue mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                {t('checkout.paymentInfo')}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Número de tarjeta</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    maxLength={19}
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Nombre en la tarjeta</label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Fecha de expiración</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/AA"
                      required
                      maxLength={5}
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      required
                      maxLength={3}
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center text-gray-400 text-sm">
                <Lock className="w-4 h-4 mr-2" />
                <span>Tu información de pago está protegida</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray sticky top-24">
              <h2 className="text-xl font-gamer font-bold text-neon-blue mb-6">
                {t('checkout.orderSummary')}
              </h2>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{item.product.title}</p>
                      <p className="text-gray-400 text-sm">x{item.quantity}</p>
                    </div>
                    <p className="text-neon-blue font-bold">
                      €{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gamer-gray pt-4 space-y-2 mb-6">
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
                <div className="border-t border-gamer-gray pt-2">
                  <div className="flex justify-between text-xl font-bold text-neon-blue">
                    <span>{t('common.total')}</span>
                    <span>€{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-neon-blue text-white py-4 rounded-lg font-semibold hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>{t('checkout.placeOrder')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Checkout

