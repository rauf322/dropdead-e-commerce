'use client'

import { useCart } from '@/hooks/cart-action'
import { Loader, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { formatCurrency } from '@/lib/utils'

import type { CartItemsCheckout } from '@/types'

import { Button } from '../ui/button'
import { Card } from '../ui/card'

export default function ItemsList({
  cart,
  title
}: {
  cart: Partial<CartItemsCheckout>
  title?: string
}) {
  const { removeItem, addItem, isItemLoading } = useCart()
  return (
    <Card className='p-5'>
      {title && <h2 className='text-xl pb-4'>Order Items</h2>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead className='text-center'>Quantity</TableHead>
            <TableHead className='text-right'>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.items?.map(item => {
            const isLoading = isItemLoading(item.productId)
            return (
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
                      disabled={isLoading}
                      variant='outline'
                      type='button'
                      onClick={() => removeItem(item.productId)}
                    >
                      {isLoading ? (
                        <Loader className='w-4 h-4 animate-spin' />
                      ) : (
                        <Minus className='h-4 w-4' />
                      )}
                    </Button>
                    <span>{item.qty}</span>
                    <Button
                      disabled={isLoading}
                      variant='outline'
                      type='button'
                      onClick={() => addItem(item)}
                    >
                      {isLoading ? (
                        <Loader className='w-4 h-4 animate-spin' />
                      ) : (
                        <Plus className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  ${formatCurrency(Number(item.price) * Number(item.qty))}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}
