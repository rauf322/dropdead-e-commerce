import { notFound } from 'next/navigation'

import ProductList from '@/components/shared/product/product'
import ProductCarousel from '@/components/shared/product/product-carousel'
import ViewAllProductsButton from '@/components/view-all-products-button'

import { getFeaturedProducts, getLatestProducts } from '@/lib/actions/product.actions'

const HomePage = async () => {
  const latestProducts = await getLatestProducts()
  const featuredProduct = await getFeaturedProducts()

  if (!latestProducts) {
    notFound()
  }
  return (
    <>
      {featuredProduct && featuredProduct.length > 0 && <ProductCarousel data={featuredProduct} />}
      <ProductList
        data={latestProducts}
        title='Product List'
      />
      <ViewAllProductsButton />
    </>
  )
}

export default HomePage
