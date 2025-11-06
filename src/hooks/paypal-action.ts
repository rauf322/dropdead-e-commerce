import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { toast } from 'sonner'

import { approvePayPalOrder, createPayPalOrder } from '@/lib/actions/order.action'

export default function usePaypal() {
  const [{ isPending, isRejected }] = usePayPalScriptReducer()

  async function createOrder(id: string) {
    const res = await createPayPalOrder(id)
    if (!res.success) {
      toast.error(res.message)
    }
    return res.data
  }

  async function approveOrder(data: { orderID: string }, id: string) {
    const res = await approvePayPalOrder(id, data)
    if (res.success) {
      toast.success(res.message)
    } else if (!res.success) {
      toast.error(res.message)
    }
  }

  return {
    createOrder,
    approveOrder,
    PayPalButtons,
    isPending,
    isRejected
  }
}
