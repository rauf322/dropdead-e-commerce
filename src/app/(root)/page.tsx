import { notFound } from 'next/navigation'

import ProductList from '@/components/shared/product/product'

import { getLatestProducts } from '@/lib/actions/product.actions'

const HomePage = async () => {
  const latestProducts = await getLatestProducts()

  if (!latestProducts) {
    notFound()
  }
  return (
    <ProductList
      data={latestProducts}
      title='Product List'
    />
  )
}

export default HomePage
