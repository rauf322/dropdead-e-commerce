'use client'

import type { Cart, CartItem } from '@/types'
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

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

import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action'
import { formatCurrency } from '@/lib/utils'

export const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function removeItemFromCartHandler(productId: string) {
    startTransition(async () => {
      const res = await removeItemFromCart(productId)
      if (!res.success) {
        toast.error(res.message)

        return
      }
      toast.success(res.message)
    })
  }
  function addItemFromCartHandler(item: CartItem) {
    startTransition(async () => {
      const res = await addItemToCart(item)
      if (!res.success) {
        toast.error(res.message)

        return
      }
      toast.success(res.message)
    })
  }

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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className='text-center'>Quantity</TableHead>
                  <TableHead className='text-right'>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map(item => (
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
                        <span className='ml-2'>{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className='text-center'>
                      <div className='flex items-center justify-center gap-2'>
                        <Button
                          disabled={isPending}
                          variant='outline'
                          type='button'
                          onClick={() => removeItemFromCartHandler(item.productId)}
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin' />
                          ) : (
                            <Minus className='h-4 w-4' />
                          )}
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={isPending}
                          variant='outline'
                          type='button'
                          onClick={() => addItemFromCartHandler(item)}
                        >
                          {isPending ? (
                            <Loader className='w-4 h-4 animate-spin' />
                          ) : (
                            <Plus className='h-4 w-4' />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className='text-right'>${item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card className='mt-10 md:mt-0'>
            <CardContent className='p-4 gap-4'>
              <div className='pb-3 text-xl'>
                <h1>Subtotal: ({cart.items.reduce((acc, item) => acc + item.qty, 0)})</h1>
                <span className='font-bold'>{formatCurrency(cart.itemsPrice)}</span>
              </div>
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
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
