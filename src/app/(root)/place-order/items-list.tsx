import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import type { CartItemsCheckout } from '@/types'

export default function ItemsList({ cart }: { cart: CartItemsCheckout }) {
  return (
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
  )
}
