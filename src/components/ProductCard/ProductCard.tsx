import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'
import { useWishlistStore } from '../../store/wishlistStore'
import { useToastStore } from '../../store/toastStore'
import { useAgeVerificationStore } from '../../store/ageVerificationStore'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation()
  const addItem = useCartStore(state => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { showToast } = useToastStore()
  const { isVerified, setShowModal } = useAgeVerificationStore()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.stock === 0) {
      showToast(t('common.outOfStock'), 'error')
      return
    }

    addItem(product, 1)
    showToast(t('common.addToCart') + ' ' + t('common.success'), 'success')
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleItem(product)
    showToast(
      isInWishlist(product.id)
        ? t('common.remove') + ' ' + t('common.wishlist')
        : t('common.add') + ' ' + t('common.wishlist'),
      'success'
    )
  }

  const handleClick = (e: React.MouseEvent) => {
    if (product.ageRating === '18+' && !isVerified) {
      e.preventDefault()
      setShowModal(true)
    }
  }

  const isOnSale = product.originalPrice && product.originalPrice > product.price
  const discount = isOnSale
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  return (
    <Link
      to={`/product/${product.slug}`}
      onClick={handleClick}
      className="group relative bg-white dark:bg-gamer-charcoal rounded-lg overflow-hidden border border-gray-200 dark:border-gamer-gray hover:border-blue-500 dark:hover:border-neon-blue transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 dark:hover:shadow-neon-blue/20"
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col space-y-2">
        {product.isNew && (
          <span className="bg-cyan-500 dark:bg-neon-cyan text-white px-2 py-1 rounded text-xs font-semibold">
            {t('common.new')}
          </span>
        )}
        {isOnSale && (
          <span className="bg-pink-500 dark:bg-neon-pink text-white px-2 py-1 rounded text-xs font-semibold">
            -{discount}%
          </span>
        )}
        {product.stock === 0 && (
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
            {t('common.outOfStock')}
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-gamer-charcoal/80 rounded-full hover:bg-gray-100 dark:hover:bg-gamer-charcoal transition-colors"
        aria-label={t('common.wishlist')}
      >
        <Heart
          className={`w-5 h-5 transition-colors ${
            isInWishlist(product.id)
              ? 'fill-pink-500 text-pink-500 dark:fill-neon-pink dark:text-neon-pink'
              : 'text-gray-400 group-hover:text-pink-500 dark:group-hover:text-neon-pink'
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gamer-gray overflow-hidden">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-gray-900 dark:text-white font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-neon-blue transition-colors">
          {product.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {product.shortDesc}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-900 dark:text-white text-sm">{product.ratingAvg.toFixed(1)}</span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">({product.ratingCount})</span>
        </div>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.platforms.slice(0, 3).map((platform) => (
            <span
              key={platform}
              className="text-xs bg-gray-100 dark:bg-gamer-gray text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
            >
              {platform}
            </span>
          ))}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            {isOnSale ? (
              <div>
                <span className="text-pink-600 dark:text-neon-pink font-bold text-lg">
                  €{product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm ml-2">
                  €{product.originalPrice!.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-blue-600 dark:text-neon-blue font-bold text-lg">
                €{product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="p-2 bg-blue-600 dark:bg-neon-blue text-white rounded-lg hover:bg-blue-700 dark:hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label={t('common.addToCart')}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

