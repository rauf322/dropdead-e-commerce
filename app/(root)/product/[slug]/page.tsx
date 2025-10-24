import { getProductBySlug } from '@/app/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/app/loading';

async function ProductContent({ slug }: { slug: string }) {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <div>{slug}</div>;
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
