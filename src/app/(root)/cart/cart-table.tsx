'use client'

import { ArrowRight, Loader } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import ItemsList from '@/components/shared/items-list'
import Summary from '@/components/shared/summary'
import { Button } from '@/components/ui/button'

import type { Cart } from '@/types'

export const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <>
      <div className='py-4 h2-bold'>Shopping Cart</div>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go Shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'>
            <ItemsList cart={cart} />
          </div>
          <Summary
            cart={cart}
            title={'Subtotal'}
            amount={String(cart.items.reduce((acc, item) => acc + item.qty, 0))}
            titles={['Total']}
            orderKeys={['itemsPrice']}
            action={
              <Button
                className='w-full'
                disabled={isPending}
                onClick={() => startTransition(() => router.push('/shipping-address'))}
              >
                {isPending ? (
                  <Loader className='w-4 h-4 animate-spin' />
                ) : (
                  <ArrowRight className='w-4 h-4' />
                )}
                Proceed to Checkout
              </Button>
            }
          />
        </div>
      )}
    </>
  )
}
