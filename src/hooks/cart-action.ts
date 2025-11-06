import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action'

import type { CartItem } from '@/types'

export function useCart() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function removeItem(productId: string) {
    startTransition(async () => {
      const res = await removeItemFromCart(productId)
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart')
        }
      })
    })
  }

  async function addItem(item: CartItem) {
    startTransition(async () => {
      const res = await addItemToCart(item)
      if (!res.success) {
        toast.warning(res.message, {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo')
          }
        })
        return
      }
      toast.success(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart')
        }
      })
    })
  }
  return { removeItem, addItem, isPending, startTransition }
}
