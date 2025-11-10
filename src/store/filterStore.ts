import { create } from 'zustand'
import { FilterState } from '../types'

interface FilterStore extends FilterState {
  setCategory: (category: string | null) => void
  setPlatform: (platform: string | null) => void
  setPriceRange: (range: [number, number]) => void
  setRating: (rating: number | null) => void
  setTag: (tag: string | null) => void
  setSearchQuery: (query: string) => void
  resetFilters: () => void
}

const initialState: FilterState = {
  category: null,
  platform: null,
  priceRange: [0, 200],
  rating: null,
  tag: null,
  searchQuery: ''
}

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setCategory: (category) => set({ category }),
  setPlatform: (platform) => set({ platform }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setRating: (rating) => set({ rating }),
  setTag: (tag) => set({ tag }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetFilters: () => set(initialState)
}))

