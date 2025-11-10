import React, { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Filter, X, Search } from 'lucide-react'
import ProductCard from '../components/ProductCard/ProductCard'
import { Product } from '../types'
import { useFilterStore } from '../store/filterStore'
import productsData from '../data/products.json'

const Catalog: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
  const [products] = useState<Product[]>(productsData as Product[])
  
  const {
    category,
    platform,
    priceRange,
    rating,
    tag,
    searchQuery,
    setCategory,
    setPlatform,
    setPriceRange,
    setRating,
    setTag,
    setSearchQuery,
    resetFilters
  } = useFilterStore()

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const searchParam = searchParams.get('search')
    const wishlistParam = searchParams.get('wishlist')
    
    if (categoryParam) setCategory(categoryParam)
    if (searchParam) setSearchQuery(searchParam)
  }, [searchParams, setCategory, setSearchQuery])

  // Get unique values for filters
  const categories = useMemo(() => {
    const cats = new Set<string>()
    products.forEach(p => p.categories.forEach(c => cats.add(c)))
    return Array.from(cats).sort()
  }, [products])

  const platforms = useMemo(() => {
    const plats = new Set<string>()
    products.forEach(p => p.platforms.forEach(pl => plats.add(pl)))
    return Array.from(plats).sort()
  }, [products])

  const tags = useMemo(() => {
    const tagSet = new Set<string>()
    products.forEach(p => p.tags.forEach(t => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [products])

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (category && !product.categories.includes(category)) return false
      
      // Platform filter
      if (platform && !product.platforms.includes(platform)) return false
      
      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false
      
      // Rating filter
      if (rating && product.ratingAvg < rating) return false
      
      // Tag filter
      if (tag && !product.tags.includes(tag)) return false
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesTitle = product.title.toLowerCase().includes(query)
        const matchesDesc = product.shortDesc.toLowerCase().includes(query) ||
                           product.longDesc.toLowerCase().includes(query)
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(query))
        if (!matchesTitle && !matchesDesc && !matchesTags) return false
      }
      
      return true
    })
  }, [products, category, platform, priceRange, rating, tag, searchQuery])

  const maxPrice = Math.max(...products.map(p => p.price))

  return (
    <>
      <Helmet>
        <title>{t('common.catalog')} - GameStore</title>
        <meta name="description" content={t('common.catalog')} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-gamer font-bold text-neon-blue">
                  {t('common.filter')}
                </h2>
                <button
                  onClick={() => resetFilters()}
                  className="text-sm text-gray-400 hover:text-neon-blue transition-colors"
                >
                  {t('common.reset')}
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.search')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('common.search')}
                      className="w-full px-4 py-2 pl-10 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.categories')}
                  </label>
                  <select
                    value={category || ''}
                    onChange={(e) => setCategory(e.target.value || null)}
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">{t('common.all')}</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.platforms')}
                  </label>
                  <select
                    value={platform || ''}
                    onChange={(e) => setPlatform(e.target.value || null)}
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">{t('common.all')}</option>
                    {platforms.map(plat => (
                      <option key={plat} value={plat}>{plat}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.price')}: €{priceRange[0]} - €{priceRange[1]}
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.rating')}: {rating ? `${rating}+` : t('common.all')}
                  </label>
                  <select
                    value={rating || ''}
                    onChange={(e) => setRating(e.target.value ? Number(e.target.value) : null)}
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">{t('common.all')}</option>
                    <option value="4">4+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-white text-sm font-semibold mb-2">
                    {t('common.tags')}
                  </label>
                  <select
                    value={tag || ''}
                    onChange={(e) => setTag(e.target.value || null)}
                    className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                  >
                    <option value="">{t('common.all')}</option>
                    {tags.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-gamer font-bold text-neon-blue mb-2">
                  {t('common.catalog')}
                </h1>
                <p className="text-gray-400">
                  {filteredProducts.length} {t('common.products')}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden p-2 bg-gamer-charcoal rounded-lg border border-gamer-gray text-white hover:text-neon-blue transition-colors"
                aria-label={t('common.filter')}
              >
                {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">{t('common.noResults')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Catalog

