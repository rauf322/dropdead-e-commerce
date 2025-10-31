import PaymentMethodForm from './payment-method-form'
import { auth } from '@/../auth'
import { type Metadata } from 'next'

import CheckoutSteps from '@/components/shared/checkout-steps'

import { getUserById } from '@/lib/actions/user.actions'

export const metadata: Metadata = {
  title: 'Select payment method'
}

export default async function PaymentMethodPage() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) throw new Error('User not found')

  const user = await getUserById(userId)

  return (
    <div>
      <CheckoutSteps current={2} />
      <PaymentMethodForm prefetchedPaymentMethod={user.paymentMethod ? user.paymentMethod : null} />
    </div>
  )
}
