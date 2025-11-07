import { z } from 'zod'

import { cartItemSchema, insertOrderSchema, paymentResultSchema } from '@/lib/validators'

export type OrderItem = z.infer<typeof cartItemSchema>

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string
  createdAt: Date
  isPaid: boolean
  paidAt: Date | null
  isDelivered: boolean
  deliveredAt: Date | null
  orderitems: OrderItem[]
  user: { name: string | null; email: string | null }
  paymentResult?: z.infer<typeof paymentResultSchema>
}

export type SeedOrder = Omit<Order, 'paymentResult'>
