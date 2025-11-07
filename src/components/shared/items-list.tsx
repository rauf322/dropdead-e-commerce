'use client'

import type { CartItemsCheckout } from '@/types/cart.type'
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

import { Card } from '../ui/card'
import AddToCart from './cart/add-to-cart'

export default function ItemsList({ cart, title }: { cart: CartItemsCheckout; title?: string }) {
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
                  <AddToCart
                    item={item}
                    cart={cart}
                  />
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
