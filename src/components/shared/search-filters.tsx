'use client'

import { FilterIcon } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

type SearchFiltersProps = {
  categories: Array<{ category: string; _count: number }>
  prices: Array<{ name: string; value: string }>
  ratings: number[]
  category: string
  price: string
  rating: string
  q: string
  sort: string
  page: string
}

export function SearchFilters({
  categories,
  prices,
  ratings,
  category,
  price,
  rating,
  q,
  sort,
  page
}: SearchFiltersProps) {
  function getFilterUrl({
    c,
    p,
    r
  }: {
    c?: string
    p?: string
    r?: string
  }) {
    const params = { q, category, price, rating, sort, page }

    if (c) params.category = c
    if (p) params.price = p
    if (r) params.rating = r

    return `/search?${new URLSearchParams(params).toString()}`
  }

  const FilterContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <div className={`text-xl mb-2 mt-3 font-semibold ${isMobile ? 'text-center' : ''}`}>
        Department
      </div>
      <div>
        <ul className={`space-y-2 ${isMobile ? 'text-center' : ''}`}>
          <li>
            <Link
              className={`${category === 'all ' || (category === '' && 'font-bold')} hover:underline`}
              href={getFilterUrl({ c: 'all' })}
            >
              Any
            </Link>
          </li>
          {categories.map(x => (
            <li key={x.category}>
              <Link
                className={`${category === x.category && 'font-bold'} hover:underline`}
                href={getFilterUrl({ c: x.category })}
              >
                {x.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`text-xl mb-2 mt-3 font-semibold ${isMobile ? 'text-center' : ''}`}>
        Price
      </div>
      <div>
        <ul className={`space-y-2 ${isMobile ? 'text-center' : ''}`}>
          <li>
            <Link
              className={`${price === 'all ' && 'font-bold'} hover:underline`}
              href={getFilterUrl({ p: 'all' })}
            >
              Any
            </Link>
          </li>
          {prices.map(p => (
            <li key={p.value}>
              <Link
                className={`${price === p.value && 'font-bold'} hover:underline`}
                href={getFilterUrl({ p: p.value })}
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`text-xl mb-2 mt-3 font-semibold ${isMobile ? 'text-center' : ''}`}>
        Customer Review
      </div>
      <div>
        <ul className={`space-y-2 ${isMobile ? 'text-center' : ''}`}>
          <li>
            <Link
              className={`${rating === 'all' && 'font-bold'} hover:underline`}
              href={getFilterUrl({ r: 'all' })}
            >
              Any
            </Link>
          </li>
          {ratings.map(r => (
            <li key={r}>
              <Link
                className={`${rating === r.toString() && 'font-bold'} hover:underline`}
                href={getFilterUrl({ r: r.toString() })}
              >
                {r} stars & up
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            className='md:hidden mb-4 w-full'
          >
            <FilterIcon className='mr-2 h-4 w-4' />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle className='text-center'>Filters</SheetTitle>
          </SheetHeader>
          <div className='mt-4'>
            <FilterContent isMobile={true} />
          </div>
        </SheetContent>
      </Sheet>

      <div className='hidden md:block filter-links'>
        <FilterContent isMobile={false} />
      </div>
    </>
  )
}
