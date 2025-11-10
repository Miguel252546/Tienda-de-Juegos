import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProductCard from '../components/ProductCard/ProductCard'
import { Product } from '../types'
import productsData from '../data/products.json'

const Home: React.FC = () => {
  const { t } = useTranslation()
  const [products] = useState<Product[]>(productsData as Product[])
  
  const newReleases = products.filter(p => p.isNew).slice(0, 8)
  const onSale = products.filter(p => p.isOnSale).slice(0, 8)
  const featured = products
    .sort((a, b) => b.ratingAvg - a.ratingAvg)
    .slice(0, 8)

  return (
    <>
      <Helmet>
        <title>{t('home.heroTitle')} - GameStore</title>
        <meta name="description" content={t('home.heroSubtitle')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop
          className="h-full"
        >
          {newReleases.slice(0, 3).map((product) => (
            <SwiperSlide key={product.id}>
              <div
                className="relative h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images[0]})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="relative h-full container mx-auto px-4 flex items-center">
                  <div className="max-w-2xl">
                    <h1 className="text-5xl md:text-6xl font-gamer font-bold text-white mb-4 text-glow">
                      {product.title}
                    </h1>
                    <p className="text-xl text-gray-300 mb-6">
                      {product.shortDesc}
                    </p>
                    <div className="flex space-x-4">
                      <Link
                        to={`/product/${product.slug}`}
                        className="bg-neon-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
                      >
                        {t('common.viewDetails')}
                      </Link>
                      <Link
                        to="/catalog"
                        className="bg-transparent border-2 border-neon-blue text-neon-blue px-8 py-3 rounded-lg font-semibold hover:bg-neon-blue hover:text-white transition-colors"
                      >
                        {t('home.shopNow')}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* New Releases */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-gamer font-bold text-neon-blue">
            {t('home.newReleases')}
          </h2>
          <Link
            to="/catalog?category=nuevos"
            className="text-neon-blue hover:text-neon-cyan transition-colors"
          >
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newReleases.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* On Sale */}
      <section className="py-12 bg-gamer-charcoal container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-gamer font-bold text-neon-pink">
            {t('home.onSale')}
          </h2>
          <Link
            to="/catalog?category=ofertas"
            className="text-neon-pink hover:text-neon-cyan transition-colors"
          >
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {onSale.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="py-12 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-gamer font-bold text-neon-cyan">
            {t('home.featured')}
          </h2>
          <Link
            to="/catalog"
            className="text-neon-cyan hover:text-neon-blue transition-colors"
          >
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

