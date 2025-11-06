'use client'

import { useCart } from '@/hooks/cart-action'
import { Loader, Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import type { Cart, CartItem } from '@/types'

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const { addItem, removeItem, isPending } = useCart()

  const existingItem = cart?.items.find(i => i.productId == item.productId)

  return existingItem ? (
    <div>
      <Button
        type='button'
        variant='outline'
        onClick={() => removeItem(item.productId)}
      >
        {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Minus className='h-4 w-4' />}
      </Button>
      <span className='px-2'>{existingItem.qty}</span>
      <Button
        type='button'
        onClick={() => addItem(item)}
      >
        {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus className='h-4 w-4' />}
      </Button>
    </div>
  ) : (
    <Button
      className='w-full'
      type='button'
      onClick={() => addItem(item)}
    >
      {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus />}
      Add to Cart
    </Button>
  )
}

export default AddToCart
