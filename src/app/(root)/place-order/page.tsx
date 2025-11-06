import { auth } from '@/../auth'
import { type Metadata } from 'next'
import { redirect } from 'next/navigation'

import CheckoutSteps from '@/components/shared/checkout-steps'

import { getMyCart } from '@/lib/actions/cart.action'
import { getUserById } from '@/lib/actions/user.actions'

import { type CartItemsCheckout, type ShippingAddress } from '@/types'

import AddressField from './addrress-field'
import ItemsList from './items-list'
import PaymentMethod from './payment-method'
import Summary from './summary'

export const metadata: Metadata = {
  title: 'Place Order'
}

export default async function PlaceOrderPage() {
  const cart: CartItemsCheckout | undefined = await getMyCart()
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) throw new Error('User not found')
  const user = await getUserById(userId)
  if (!cart || cart.items.length === 0) redirect('/cart')
  if (!user.address) redirect('/shipping-address')
  if (!user.paymentMethod) redirect('/payment-method')

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='md:col-span-2 overflow-x-auto space-y-4'>
          <AddressField userAddress={user.address as ShippingAddress} />
          <PaymentMethod paymentMethod={user.paymentMethod} />
          <ItemsList cart={cart} />
        </div>
        <Summary cart={cart} />
      </div>
    </>
  )
}
