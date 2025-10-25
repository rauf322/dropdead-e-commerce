import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductImages from '@/components/shared/product/product-images';
import AddToCart from '@/components/shared/product/add-to-cart';

async function ProductContent({ slug }: { slug: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 4000));

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-5'>
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
            <p>
              {product.rating} of {product.numReviews} Reviews
            </p>
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
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        price: product.price,
                        qty: 1,
                        image: product.images[0],
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

const ProductDetailsPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;

  return (
    <Suspense fallback={<Loading />}>
      <ProductContent slug={slug} />
    </Suspense>
  );
};

export default ProductDetailsPage;
