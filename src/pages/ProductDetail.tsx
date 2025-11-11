import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, Heart, Star, ChevronLeft, ZoomIn } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import ProductCard from '../components/ProductCard/ProductCard'
import { Product, Review } from '../types'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useToastStore } from '../store/toastStore'
import { useAgeVerificationStore } from '../store/ageVerificationStore'
import productsData from '../data/products.json'

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [product, setProduct] = useState<Product | null>(null)
  const [similarProducts, setSimilarProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [showZoom, setShowZoom] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })

  const addItem = useCartStore(state => state.addItem)
  const { toggleItem, isInWishlist } = useWishlistStore()
  const { showToast } = useToastStore()
  const { isVerified, setShowModal } = useAgeVerificationStore()

  useEffect(() => {
    const foundProduct = (productsData as Product[]).find(p => p.slug === slug)
    if (foundProduct) {
      setProduct(foundProduct)
      
      // Check age verification for 18+ content
      if (foundProduct.ageRating === '18+' && !isVerified) {
        setShowModal(true)
      }
      
      // Get similar products (same category)
      const similar = (productsData as Product[])
        .filter(p => p.id !== foundProduct.id && p.categories.some(c => foundProduct.categories.includes(c)))
        .slice(0, 4)
      setSimilarProducts(similar)
      
      // Load reviews (mock data)
      const mockReviews: Review[] = [
        {
          id: '1',
          productId: foundProduct.id,
          userId: '1',
          userName: 'Usuario1',
          rating: 5,
          comment: 'Excelente juego, muy recomendado!',
          date: '2024-01-15',
          verified: true
        },
        {
          id: '2',
          productId: foundProduct.id,
          userId: '2',
          userName: 'Usuario2',
          rating: 4,
          comment: 'Buen juego, pero tiene algunos bugs menores.',
          date: '2024-01-10',
          verified: true
        }
      ]
      setReviews(mockReviews)
    }
  }, [slug, isVerified, setShowModal])

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (product.stock === 0) {
      showToast(t('common.outOfStock'), 'error')
      return
    }
    addItem(product, quantity)
    showToast(t('common.addToCart') + ' ' + t('common.success'), 'success')
  }

  const handleWishlistToggle = () => {
    toggleItem(product)
    showToast(
      isInWishlist(product.id)
        ? t('common.remove') + ' ' + t('common.wishlist')
        : t('common.add') + ' ' + t('common.wishlist'),
      'success'
    )
  }

  const handleSubmitReview = () => {
    if (!newReview.comment.trim() || !product) return
    
    const review: Review = {
      id: Date.now().toString(),
      productId: product.id,
      userId: 'current-user',
      userName: 'Tú',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      verified: false
    }
    setReviews([review, ...reviews])
    setNewReview({ rating: 5, comment: '' })
    showToast(t('common.success'), 'success')
  }

  const isOnSale = product?.originalPrice && product.originalPrice > product.price
  const discount = isOnSale && product
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">{t('common.loading')}</p>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{product.title} - GameStore</title>
        <meta name="description" content={product.shortDesc} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.shortDesc} />
        <meta property="og:image" content={product.images[0]} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.title,
            description: product.longDesc,
            image: product.images,
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'EUR',
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.ratingAvg,
              reviewCount: product.ratingCount
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-neon-blue transition-colors mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          {t('common.back')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 dark:bg-gamer-gray rounded-lg overflow-hidden transition-colors">
              <Swiper
                modules={[Navigation, Thumbs]}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                className="h-full"
              >
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image || 'https://via.placeholder.com/800x600?text=No+Image'}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover cursor-zoom-in"
                      onClick={() => setShowZoom(true)}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <Swiper
              modules={[Thumbs]}
              watchSlidesProgress
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              spaceBetween={10}
              className="thumb-swiper"
            >
              {product.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image || 'https://via.placeholder.com/200x150?text=No+Image'}
                    alt={`${product.title} thumb ${index + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer border-2 border-transparent hover:border-blue-500 dark:hover:border-neon-blue transition-colors"
                    onClick={() => setSelectedImage(index)}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/200x150?text=Image+Not+Found'
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-gamer font-bold text-gray-900 dark:text-white mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-gray-900 dark:text-white font-semibold">{product.ratingAvg.toFixed(1)}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1">({product.ratingCount})</span>
                  </div>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-600 dark:text-gray-400">{t('common.ageRating')}: {product.ageRating}</span>
                </div>
              </div>
              <button
                onClick={handleWishlistToggle}
                className="p-2 bg-white dark:bg-gamer-charcoal rounded-lg border border-gray-200 dark:border-gamer-gray hover:border-pink-500 dark:hover:border-neon-pink transition-colors"
                aria-label={t('common.wishlist')}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isInWishlist(product.id)
                      ? 'fill-pink-500 text-pink-500 dark:fill-neon-pink dark:text-neon-pink'
                      : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            {/* Price */}
            <div className="mb-6">
              {isOnSale ? (
                <div>
                  <span className="text-4xl font-bold text-pink-600 dark:text-neon-pink">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-gray-500 line-through ml-4">
                    €{product.originalPrice!.toFixed(2)}
                  </span>
                  <span className="ml-4 bg-pink-500 dark:bg-neon-pink text-white px-3 py-1 rounded text-sm font-semibold">
                    -{discount}%
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-blue-600 dark:text-neon-blue">
                  €{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="text-green-600 dark:text-green-400 font-semibold">
                  {t('common.inStock')} ({product.stock} {t('common.available')})
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 font-semibold">
                  {t('common.outOfStock')}
                </span>
              )}
            </div>

            {/* Platforms */}
            <div className="mb-6">
              <h3 className="text-gray-900 dark:text-white font-semibold mb-2">{t('common.platforms')}</h3>
              <div className="flex flex-wrap gap-2">
                {product.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="bg-gray-100 dark:bg-gamer-gray text-gray-900 dark:text-white px-4 py-2 rounded-lg"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-gray-900 dark:text-white font-semibold">{t('common.quantity')}:</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-gray-100 dark:bg-gamer-gray text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gamer-charcoal transition-colors"
                  >
                    -
                  </button>
                  <span className="text-gray-900 dark:text-white font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 bg-gray-100 dark:bg-gamer-gray text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gamer-charcoal transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-blue-600 dark:bg-neon-blue text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{t('common.addToCart')}</span>
            </button>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue mb-4">
                {t('common.description')}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.longDesc}</p>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-12">
          <h2 className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue mb-6">
            {t('common.specifications')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common.minRequirements')}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {product.specs.minRequirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('common.recommendedRequirements')}
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                {product.specs.recommendedRequirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-12">
          <h2 className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue mb-6">
            {t('common.reviews')} ({reviews.length})
          </h2>
          
          {/* Write Review */}
          <div className="bg-white dark:bg-gamer-charcoal rounded-lg p-6 mb-6 border border-gray-200 dark:border-gamer-gray transition-colors">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('common.writeReview')}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-900 dark:text-white font-semibold mb-2">{t('common.yourRating')}</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          rating <= newReview.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-gray-900 dark:text-white font-semibold mb-2">{t('common.yourComment')}</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gamer-gray border border-gray-300 dark:border-gamer-gray rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-neon-blue transition-colors"
                  rows={4}
                  placeholder={t('common.yourComment')}
                />
              </div>
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 dark:bg-neon-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-opacity-80 transition-colors"
              >
                {t('common.submit')}
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gamer-charcoal rounded-lg p-6 border border-gray-200 dark:border-gamer-gray transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-semibold">{review.userName}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <Star
                            key={rating}
                            className={`w-4 h-4 ${
                              rating <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-gamer font-bold text-blue-600 dark:text-neon-blue mb-6">
              {t('common.similarProducts')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductDetail

