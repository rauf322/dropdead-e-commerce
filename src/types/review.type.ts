import type { insertReviewSchema } from '@/lib/validators'
import type { z } from 'zod'

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string
  createdAt: Date
  isVerifiedPurchase?: boolean
  user?: {
    name: string | null
    image?: string | null
  }
}
