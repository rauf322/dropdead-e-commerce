import ShippingAddressForm from './shipping-address-form'
import { auth } from '@/../auth'
import { type ShippingAddress } from '@/types'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import CheckoutSteps from '@/components/shared/checkout-steps'

import { getMyCart } from '@/lib/actions/cart.action'
import { getUserById } from '@/lib/actions/user.actions'

export const metadata: Metadata = {
  title: 'Shipping Address'
}
async function ShippingAddressPage() {
  const cart = await getMyCart()
  if (!cart || cart.items.length === 0) redirect('/cart')
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error(`No user ID`)
  const user = await getUserById(userId)

  return (
    <div>
      <CheckoutSteps current={1} />
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </div>
  )
}

export default ShippingAddressPage
