import { auth } from '@/../auth'
import Loading from '@/app/loading'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import AddToCart from '@/components/shared/cart/add-to-cart'
import ProductImages from '@/components/shared/product/product-images'
import Rating from '@/components/shared/rating'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { getMyCart } from '@/lib/actions/cart.action'
import { getProductBySlug } from '@/lib/actions/product.actions'

import ReviewList from './review-list'

async function ProductContent({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug)
  const cart = await getMyCart()
  if (!product) notFound()

  const session = await auth()
  const userId = session?.user.id

  return (
    <>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5 '>
          {/*Images column*/}
          <div className='col-span-2'>
            <ProductImages images={product.images} />
          </div>
          {/*Details Column*/}
          <div className='col-span-2 p-5'>
            <p className='mb-5'>
              {product.brand} {product.category}
            </p>
            <h1 className='h3-bold'>{product.name}</h1>
            <Rating value={Number(product.rating)} />
            <p>{product.numReviews} reviews</p>
            <div className='flex flex-col gap-3 sm:flex-row items-left mt-10'>
              <Badge className='text-xl w-24 rounded-full bg-gray-500 text-white'>
                ${product.price}
              </Badge>
            </div>
            <div className='mt-10'>
              <p className='font-semibold'>Description</p>
              <p>{product.description}</p>
            </div>
          </div>
          {/*Action column*/}
          <div>
            <Card>
              <CardContent className='p-4'>
                <div className='mb-2 justify-between flex'>
                  <div>Price</div>
                  <div>
                    <h1> ${product.price}</h1>
                  </div>
                </div>
                <div className='mb-2 flex justify-between'>
                  <div>Status</div>
                  {product.stock > 0 ? (
                    <Badge variant='outline'> In Stock</Badge>
                  ) : (
                    <Badge variant='destructive'>Out of Stock</Badge>
                  )}
                </div>
                {product.stock > 0 && (
                  <div className='flex justify-center'>
                    <AddToCart
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images[0]
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className='mt-10'>
        <h2 className='h2-bold'>Customer Reviews</h2>
        <ReviewList
          userId={userId || ''}
          productId={product.id}
          productSlug={product.slug}
        />
      </section>
    </>
  )
}

const ProductDetailsPage = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params

  return (
    <Suspense fallback={<Loading />}>
      <ProductContent slug={slug} />
    </Suspense>
  )
}

export default ProductDetailsPage
