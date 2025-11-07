import z from 'zod'

import { shippingAddressSchema, userAuthSchema } from '@/lib/validators'

export type User = z.infer<typeof userAuthSchema>

export type SeedUser = Omit<User, 'id' | 'updatedAt' | 'createdAt'>

export type ShippingAddress = z.infer<typeof shippingAddressSchema>
