import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { Product } from '../types'
import productsData from '../data/products.json'

const Admin: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuthStore()
  const [products, setProducts] = useState<Product[]>(productsData as Product[])
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    category: '',
    platform: ''
  })

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/login')
    }
  }, [user, isAdmin, navigate])

  if (!user || !isAdmin()) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    if (editingProduct) {
      // Update product
      setProducts(products.map(p =>
        p.id === editingProduct.id
          ? { ...editingProduct, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
          : p
      ))
    } else {
      // Add new product
      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        categories: [formData.category],
        platforms: [formData.platform],
        ageRating: '16+',
        price: Number(formData.price),
        stock: Number(formData.stock),
        ratingAvg: 0,
        ratingCount: 0,
        images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800'],
        shortDesc: '',
        longDesc: '',
        specs: {
          minRequirements: [],
          recommendedRequirements: [],
          features: []
        },
        tags: [],
        releaseDate: new Date().toISOString().split('T')[0],
        developer: '',
        publisher: ''
      }
      setProducts([...products, newProduct])
    }
    setShowModal(false)
    setEditingProduct(null)
    setFormData({ title: '', price: '', stock: '', category: '', platform: '' })
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.categories[0] || '',
      platform: product.platforms[0] || ''
    })
    setShowModal(true)
  }

  const handleDelete = (productId: string) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter(p => p.id !== productId))
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('common.admin')} - GameStore</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-gamer font-bold text-neon-blue">
            {t('common.admin')}
          </h1>
          <button
            onClick={() => {
              setEditingProduct(null)
              setFormData({ title: '', price: '', stock: '', category: '', platform: '' })
              setShowModal(true)
            }}
            className="bg-neon-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Agregar Producto</span>
          </button>
        </div>

        <div className="bg-gamer-charcoal rounded-lg border border-gamer-gray overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gamer-gray">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Imagen</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Título</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Precio</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Stock</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Categoría</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-gamer-gray hover:bg-gamer-gray/50">
                    <td className="px-6 py-4">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                        loading="lazy"
                      />
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">{product.title}</td>
                    <td className="px-6 py-4 text-neon-blue font-bold">€{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-white">{product.stock}</td>
                    <td className="px-6 py-4 text-gray-400">{product.categories.join(', ')}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-neon-blue hover:bg-gamer-gray rounded transition-colors"
                          aria-label={t('common.edit')}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-500 hover:bg-gamer-gray rounded transition-colors"
                          aria-label={t('common.delete')}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowModal(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div
                className="bg-gamer-charcoal rounded-lg p-6 border border-gamer-gray max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-gamer font-bold text-neon-blue mb-6">
                  {editingProduct ? t('common.edit') : 'Agregar'} Producto
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Título</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Precio</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Categoría</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="acción">Acción</option>
                      <option value="aventura">Aventura</option>
                      <option value="estrategia">Estrategia</option>
                      <option value="terror">Terror</option>
                      <option value="deportes">Deportes</option>
                      <option value="simulación">Simulación</option>
                      <option value="indie">Indie</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-semibold mb-2">Plataforma</label>
                    <select
                      name="platform"
                      value={formData.platform}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-gamer-gray border border-gamer-gray rounded-lg text-white focus:outline-none focus:border-neon-blue"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="PC">PC</option>
                      <option value="PlayStation">PlayStation</option>
                      <option value="Xbox">Xbox</option>
                      <option value="Nintendo Switch">Nintendo Switch</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-neon-blue text-white py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
                  >
                    {t('common.save')}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gamer-gray text-white py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Admin

