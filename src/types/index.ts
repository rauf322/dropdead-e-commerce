import { z } from 'zod'

import { paymentResultSchema } from '@/lib/validators'

export type PaymentResult = z.infer<typeof paymentResultSchema>

export type OnlyStringObject<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never
}[keyof T]

export type ActionResponse = {
  success: boolean
  message: string
}
