import { auth } from '@/../auth'
import type { Metadata } from 'next'
import Link from 'next/link'

import DeleteDialog from '@/components/shared/delete-dialog'
import Pagination from '@/components/shared/pagination'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { deleteOrderById, getAllOrders } from '@/lib/actions/order.action'
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Admin Orders'
}

export default async function AdminOrdersPage(props: {
  searchParams: Promise<{ page: string; query: string }>
}) {
  const { page = '1', query: searchText } = await props.searchParams
  const session = await auth()
  if (session?.user?.role !== 'admin') throw new Error('Not authorized')
  const orders = await getAllOrders({
    page: Number(page),
    limit: 5,
    query: searchText || 'all'
  })
  return (
    <div className='space-y-2'>
      <div className='div flex items-center gap-3'>
        <h1 className='h2-bold'>Orders</h1>
        {searchText && (
          <div>
            Filtered by <i> &quot;{searchText}&quot;</i>
            <Link href='/admin/orders'>
              <Button
                variant='outline'
                size='sm'
              >
                Remove Filter
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className='div overflow-x-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>TOTAL</TableHead>
              <TableHead>PAID</TableHead>
              <TableHead>DELIVERED</TableHead>
              <TableHead className='text-right'>ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.data.map(order => (
              <TableRow key={order.id}>
                <TableCell>{formatId(order.id)}</TableCell>
                <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
                <TableCell>{order.user?.name || 'Deleted User'}</TableCell>
                <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                <TableCell>
                  {order.isPaid && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'Not Paid'}
                </TableCell>
                <TableCell>
                  {order.isDelivered && order.paidAt
                    ? formatDateTime(order.paidAt).dateTime
                    : 'Not Delivered'}
                </TableCell>
                <TableCell className='text-right'>
                  <Button>
                    <Link href={`/order/${order.id}`}>Details</Link>
                  </Button>
                  <DeleteDialog
                    id={order.id}
                    action={deleteOrderById}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {orders.totalPages > 1 && (
          <Pagination
            page={Number(page) || 1}
            totalPages={orders?.totalPages}
          />
        )}
      </div>
    </div>
  )
}
