import { renderHook, act } from '@testing-library/react'
import { useCartStore } from '../store/cartStore'
import { Product } from '../types'

const mockProduct: Product = {
  id: '1',
  title: 'Test Game',
  slug: 'test-game',
  categories: ['acción'],
  platforms: ['PC'],
  ageRating: '16+',
  price: 59.99,
  stock: 10,
  ratingAvg: 4.5,
  ratingCount: 100,
  images: ['test.jpg'],
  shortDesc: 'Test description',
  longDesc: 'Long test description',
  specs: {
    minRequirements: [],
    recommendedRequirements: [],
    features: []
  },
  tags: ['test'],
  releaseDate: '2024-01-01',
  developer: 'Test Dev',
  publisher: 'Test Pub'
}

describe('CartStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.clearCart()
    })
  })

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 1)
    })

    expect(result.current.items.length).toBe(1)
    expect(result.current.items[0].product.id).toBe('1')
    expect(result.current.items[0].quantity).toBe(1)
  })

  it('should update quantity when adding same product', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.addItem(mockProduct, 2)
    })

    expect(result.current.items.length).toBe(1)
    expect(result.current.items[0].quantity).toBe(3)
  })

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.removeItem('1')
    })

    expect(result.current.items.length).toBe(0)
  })

  it('should calculate total items correctly', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 2)
    })

    expect(result.current.getTotalItems()).toBe(2)
  })

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 2)
    })

    expect(result.current.getTotalPrice()).toBe(119.98)
  })

  it('should clear cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockProduct, 1)
      result.current.clearCart()
    })

    expect(result.current.items.length).toBe(0)
  })
})

