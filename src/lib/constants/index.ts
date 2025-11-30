export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'AI Store'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'A modern built-in AI store'
export const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000'
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT || 4)

export const signInDefaultValues = {
  email: '',
  password: ''
}

export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const shippingAddressDefaultValues = {
  fullName: '',
  streetAddress: '',
  city: '',
  postalCode: '',
  country: ''
}

export const PAYMENT_METHODS = ['PayPal', 'Stripe', 'CashOnDelivery']

export const STATUS = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']

export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 12

export const SUMMARY_TITLE = ['Items', 'Tax', 'Shipping', 'Total']
export const ORDER_CHECKOUT_KEYS = [
  'itemsPrice',
  'taxPrice',
  'shippingPrice',
  'totalPrice'
] as const

export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null
}

export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(',')
  : ['user', 'admin']

export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0
}
