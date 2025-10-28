import { getOrderById } from '@/lib/actions/order.action'
import { ShippingAddress } from '@/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import OrderDetailsTable from './order-details-table'
export const metadata: Metadata = {
  title: 'Order Details',
}
import { STATUS } from '@/lib/constants'

export default async function OrderDetailsPage(props: {
  params: Promise<{ id: string }>
}) {
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
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
    />
  )
}
