'use client'

import type { Product } from '@/types/product.type'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const ProductCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false)
  const maxLength = 50
  const truncatedName = product.name.length > maxLength 
    ? product.name.substring(0, maxLength) + '...' 
    : product.name

  return (
    <Card className='w-full max-w-sm group relative'>
      <CardHeader className='p-0 items-center flex flex-col align-center justify-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <Heart
        className='absolute top-4 right-4 transition-all group-hover:opacity-100 opacity-0 cursor-pointer'
        fill={isHovered ? 'currentColor' : 'none'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <CardContent className='p-4 grid gap-2 mx-auto'>
        <h2 className='text-base font-medium text-center' title={product.name}>
          {truncatedName}
        </h2>
        <p className='text-lg font-semibold text-center'>
          ${product.price}
        </p>
      </CardContent>
    </Card>
  )
}

export default ProductCard
