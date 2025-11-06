'use client'

import usePaypal from '@/hooks/paypal-action'
import type { OnApproveData } from '@paypal/paypal-js'

import type { Order } from '@/types'

export function PayPalButtonsWrapper({ order }: { order: Order }) {
  const { isPending, isRejected, PayPalButtons, createOrder, approveOrder } = usePaypal()

  const PrintLoadingState = () => {
    let status = ''
    if (isPending) {
      status = 'Loading PayPal...'
    } else if (isRejected) {
      status = 'Error Loading PayPal'
    }
    return status
  }

  return (
    <>
      <PrintLoadingState />
      <PayPalButtons
        createOrder={() => createOrder(order.id)}
        onApprove={(data: OnApproveData) => approveOrder(data, order.id)}
      />
    </>
  )
}
