import type { Product } from '@/types/product.type'

import ProductCard from './product-card'

export default function ProductList({ data, title }: { data: Product[]; title?: string }) {
  return (
    <div className='my-10'>
      {title && <h1 className='font-bold text-5xl mb-10 text-center'>{title}</h1>}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
        {data.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}
