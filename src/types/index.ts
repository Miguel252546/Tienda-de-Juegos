export interface Product {
  id: string
  title: string
  slug: string
  categories: string[]
  platforms: string[]
  ageRating: string
  price: number
  originalPrice?: number
  stock: number
  ratingAvg: number
  ratingCount: number
  images: string[]
  shortDesc: string
  longDesc: string
  specs: {
    minRequirements: string[]
    recommendedRequirements: string[]
    features: string[]
  }
  tags: string[]
  releaseDate: string
  developer: string
  publisher: string
  isNew?: boolean
  isOnSale?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

export interface User {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  shippingAddress: {
    name: string
    address: string
    city: string
    zipCode: string
    country: string
  }
}

export interface FilterState {
  category: string | null
  platform: string | null
  priceRange: [number, number]
  rating: number | null
  tag: string | null
  searchQuery: string
}

