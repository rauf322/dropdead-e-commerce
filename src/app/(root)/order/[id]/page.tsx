import OrderDetailsTable from './order-details-table'
import { type ShippingAddress } from '@/types'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getOrderById } from '@/lib/actions/order.action'
import { STATUS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Order Details'
}

export default async function OrderDetailsPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params

  const order = await getOrderById(id)

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
      order={{
        ...order,
        shippingAddress: order.shippingAddress as ShippingAddress
      }}
      paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
    />
  )
}
