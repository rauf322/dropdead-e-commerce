import z from 'zod'

import type { insertProductSchema } from '@/lib/validators'

export type Product = z.infer<typeof insertProductSchema> & {
  id: string
  rating: string
  numReviews: number
  createdAt: Date
}
export type SeedProduct = Omit<Product, 'id'>
