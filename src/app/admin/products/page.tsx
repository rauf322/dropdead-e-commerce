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
  const { page = '1', query: searchText, category } = await props.searchParams

  const products = await getAllProducts({
    query: searchText,
    page: Number(page),
    category
  })
  return (
    <div className='space-y-2'>
      <div className='div flex-between'>
        <div className='div flex items-center gap-3'>
          <h1 className='h2-bold'>Products</h1>
          {searchText && (
            <div>
              Filtered by <i> &quot;{searchText}&quot;</i>
              <Link href='/admin/products'>
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
      {products.totalPages > 1 && (
        <Pagination
          page={Number(page)}
          totalPages={products.totalPages}
        />
      )}
    </div>
  )
}
