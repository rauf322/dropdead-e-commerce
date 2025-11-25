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

import { deleteProdcutById, getAllProducts } from '@/lib/actions/product.actions'

export default async function AdminProductsPage(props: {
  searchParams: Promise<{
    page: string
    query: string
    category: string
  }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page || 1)
  const searchQuery = searchParams.query || ''
  const category = searchParams.category || ''

  const products = await getAllProducts({
    query: searchQuery,
    page,
    category
  })
  console.log(products)
  return (
    <div className='space-y-2'>
      <div className='div flex-between'>
        <div className='h1 h2-bold'>Products</div>
        <Button
          asChild
          variant='default'
        >
          <Link href='/admin/products/create'>Create Product</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead className='text-right'>PRICE</TableHead>
            <TableHead>CATEGORY</TableHead>
            <TableHead>STOCK</TableHead>
            <TableHead>RATING</TableHead>
            <TableHead className='w-[100px]'>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.data.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className='text-right'>{product.price}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.rating}</TableCell>
              <TableCell className='flex gap-1'>
                <Button
                  asChild
                  variant='outline'
                >
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                </Button>
                <DeleteDialog
                  id={product.id}
                  action={deleteProdcutById}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {products?.totalPages && products.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={products.totalPages}
        />
      )}
    </div>
  )
}
