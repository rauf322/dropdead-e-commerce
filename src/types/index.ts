import { z } from 'zod'

import { paymentResultSchema } from '@/lib/validators'

export type PaymentResult = z.infer<typeof paymentResultSchema>

export type ActionResponse = {
  success: boolean
  message: string
}
