import { renderHook, act } from '@testing-library/react'
import { useFilterStore } from '../store/filterStore'

describe('FilterStore', () => {
  it('should set category filter', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setCategory('acción')
    })

    expect(result.current.category).toBe('acción')
  })

  it('should set platform filter', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setPlatform('PC')
    })

    expect(result.current.platform).toBe('PC')
  })

  it('should set price range', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setPriceRange([10, 50])
    })

    expect(result.current.priceRange).toEqual([10, 50])
  })

  it('should set rating filter', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setRating(4.5)
    })

    expect(result.current.rating).toBe(4.5)
  })

  it('should set search query', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setSearchQuery('test query')
    })

    expect(result.current.searchQuery).toBe('test query')
  })

  it('should reset filters', () => {
    const { result } = renderHook(() => useFilterStore())
    
    act(() => {
      result.current.setCategory('acción')
      result.current.setPlatform('PC')
      result.current.setSearchQuery('test')
      result.current.resetFilters()
    })

    expect(result.current.category).toBeNull()
    expect(result.current.platform).toBeNull()
    expect(result.current.searchQuery).toBe('')
  })
})

