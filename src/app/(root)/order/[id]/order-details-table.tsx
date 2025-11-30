'use client'

import { type Order } from '@/types/order.type'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import Image from 'next/image'
import Link from 'next/link'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { PayPalButtonsWrapper } from '@/components/shared/paypal-modal/paypalButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { deliverOrder, updateOrderToPaidCOD } from '@/lib/actions/order.action'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'

import StripePaymentForm from './stripe-payment'
import StripePayment from './stripe-payment'

export default function OrderDetailsTable({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret
}: {
  order: Order
  paypalClientId: string
  isAdmin: boolean
  stripeClientSecret: string | null
}) {
  const {
    shippingAddress,
    orderitems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    isPaid,
    paidAt,
    deliveredAt
  } = order

  function MarkAsPaidButton() {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await updateOrderToPaidCOD(order.id)
            if (res.success) {
              toast.success('Order marked as paid')
            } else {
              toast.error(res.message || 'Failed to mark order as paid')
            }
          })
        }
      >
        {isPending ? 'Processing...' : 'Mark As Paid'}
      </Button>
    )
  }

  function MarkAsDeliveredButton() {
    const [isPending, startTransition] = useTransition()
    return (
      <Button
        type='button'
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const res = await deliverOrder(order.id)
            if (res.success) {
              toast.success('Order marked as delivered')
            } else {
              toast.error(res.message || 'Failed to mark order as delivered')
            }
          })
        }
      >
        {isPending ? 'Processing...' : 'Mark As Delivered'}
      </Button>
    )
  }
  return (
    <>
      <h1 className='py-4 text-2xl'>Order {formatId(order.id)}</h1>
      <div className='div grid md:grid-cols-3 md:gap-5 gap-2'>
        <div className='col-span-2 space-4-y overflow-x-auto'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p className='mb-3'>{paymentMethod}</p>
              {isPaid ? (
                <Badge variant='secondary'>Paid at {formatDateTime(paidAt!).dateTime}</Badge>
              ) : (
                <Badge variant='destructive'>Not paid</Badge>
              )}
            </CardContent>
          </Card>
          <Card className='my-2'>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className='mb-3'>
                {shippingAddress.streetAddress}, {shippingAddress.city}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
              {isDelivered ? (
                <Badge variant='secondary'>
                  Delivered at {formatDateTime(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant='destructive'>Not Delivered</Badge>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Order Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderitems.map(item => (
                    <TableRow key={item.slug}>
                      <TableCell>
                        <Link
                          href={`/product/${item.slug}`}
                          className='flex items-center'
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          <span className='px-2'>{item.name}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className='px-2'>{item.qty}</span>
                      </TableCell>
                      <TableCell>
                        <span className='text-right'>${item.price}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        <div className='md:col-span-1 col-span-2 '>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(totalPrice)}</div>
              </div>
              {/*PayPal Payment*/}
              {!isPaid && paymentMethod === 'PayPal' && (
                <div style={{ colorScheme: 'none' }}>
                  <PayPalScriptProvider options={{ clientId: paypalClientId }}>
                    <PayPalButtonsWrapper order={order} />
                  </PayPalScriptProvider>
                </div>
              )}
              {!isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
                <StripePayment
                  priceInCents={Number(order.totalPrice) * 100}
                  orderId={order.id}
                  clientSecret={stripeClientSecret}
                />
              )}
              {/*Cash on Delivery*/}
              <div className='flex flex-col gap-2'>
                {isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && <MarkAsPaidButton />}
                {isAdmin && !isDelivered && <MarkAsDeliveredButton />}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
