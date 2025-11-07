import type { CartItem } from '@/types/cart.type'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action'

export function useCart() {
  const [isPending, startTransition] = useTransition()
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set())
  const router = useRouter()
  console.log(loadingItems)

  async function removeItem(productId: string) {
    setLoadingItems(prev => new Set(prev).add(productId))
    startTransition(async () => {
      const res = await removeItemFromCart(productId)
      setLoadingItems(prev => {
        const next = new Set(prev)
        next.delete(productId)
        return next
      })
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
    setLoadingItems(prev => new Set(prev).add(item.productId))
    startTransition(async () => {
      const res = await addItemToCart(item)
      setLoadingItems(prev => {
        const next = new Set(prev)
        next.delete(item.productId)
        return next
      })
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

  const isItemLoading = (productId: string) => loadingItems.has(productId)

  return { removeItem, addItem, isPending, isItemLoading, startTransition }
}
