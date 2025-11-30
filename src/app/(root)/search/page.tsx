import type { Product } from '@/types/product.type'
import Link from 'next/link'

import ProductCard from '@/components/shared/product/product-card'
import { SearchFilters } from '@/components/shared/search-filters'
import { Button } from '@/components/ui/button'

import { getAllCategories, getAllProducts } from '@/lib/actions/product.actions'

const prices = [
  {
    name: '$1 to $25',
    value: '1-25'
  },
  {
    name: '25$ to $50',
    value: '25-50'
  },
  {
    name: '50$ to $100',
    value: '50-100'
  }
]

const ratings = [1, 2, 3, 4, 5]

const sorts = [
  {
    name: 'Newest',
    value: 'newest'
  },
  {
    name: 'Price: Low to High',
    value: 'lowest'
  },
  {
    name: 'Price: High to Low',
    value: 'highest'
  },
  {
    name: 'Customer Reviews',
    value: 'rating'
  }
]

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string
    price: string
    category: string
    rating: string
  }>
}) {
  const { q = 'all', category = 'all' } = await props.searchParams
  if (
    (q && q !== 'all' && q.trim() !== '') ||
    (category && category !== 'all' && category.trim() !== '')
  ) {
    return {
      title: `Search ${q !== 'all' ? q : ''} ${category !== 'all' ? category : ''}`.trim()
    }
  }
  return {
    title: 'Search Products'
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string
    category?: string
    price?: string
    rating?: string
    sort?: string
    page?: string
  }>
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1'
  } = await props.searchParams

  function getFilterUrl({
    c,
    s,
    p,
    r,
    pg
  }: {
    c?: string
    s?: string
    p?: string
    r?: string
    pg?: string
  }) {
    const params = { q, category, price, rating, sort, page }

    if (c) params.category = c
    if (p) params.price = p
    if (s) params.sort = s
    if (r) params.rating = r
    if (pg) params.page = pg

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const categories = await getAllCategories()

  const products = await getAllProducts({
    query: q,
    category,
    price: price,
    rating,
    page: Number(page),
    sort
  })
  return (
    <div className='grid md:grid-cols-5 md:gap-5'>
      <SearchFilters
        categories={categories}
        prices={prices}
        ratings={ratings}
        category={category}
        price={price}
        rating={rating}
        q={q}
        sort={sort}
        page={page}
      />
      <div className='md:col-span-4 space-y-4'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div>
            {products.data.length === 0 ? 'No' : products.data.length} Results
            {q !== 'all' && q !== '' && ' for "' + q + '"'}
            {category !== 'all' && ' in ' + category}
            {price !== 'all' && ' from $' + price}
            {rating !== 'all' && ' with ' + rating + ' stars & up'}
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2'>
            <span className='text-sm'>Sort by:</span>
            <div className='flex flex-wrap gap-2'>
              {sorts.map(s => (
                <Button
                  key={s.value}
                  variant={sort === s.value ? 'default' : 'outline'}
                  size='sm'
                  className={
                    sort === s.value
                      ? 'hover:bg-primary-foreground hover:text-primary transition-colors'
                      : 'hover:bg-foreground hover:text-background transition-colors'
                  }
                  asChild
                >
                  <Link href={getFilterUrl({ s: s.value })}>{s.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
        {products.totalPages > 1 && (
          <div className='flex justify-center gap-2'>
            {Number(page) > 1 && (
              <Link
                className='px-4 py-2 rounded border hover:bg-muted'
                href={getFilterUrl({ pg: (Number(page) - 1).toString() })}
              >
                Previous
              </Link>
            )}
            <span className='px-4 py-2'>
              Page {page} of {products.totalPages}
            </span>
            {Number(page) < products.totalPages && (
              <Link
                className='px-4 py-2 rounded border hover:bg-muted'
                href={getFilterUrl({ pg: (Number(page) + 1).toString() })}
              >
                Next
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
