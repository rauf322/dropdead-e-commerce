import { auth } from '@/../auth'
import { type ShippingAddress } from '@/types/user.type'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOrderById } from '@/lib/actions/order.action'
import { STATUS } from '@/lib/constants'

import OrderDetailsTable from './order-details-table'

export const metadata: Metadata = {
  title: 'Order Details'
}

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const order = await getOrderById(id)
  const session = await auth()

  if (
    !order ||
    order.user?.name == null ||
    order.user?.email == null ||
    !STATUS.includes(order.status)
  ) {
    notFound()
  }

  return (
    <OrderDetailsTable
      isAdmin={session?.user?.role === 'admin' ? true : false}
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
    />
  )
}
