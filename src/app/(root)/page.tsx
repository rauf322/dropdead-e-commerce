import ProductList from '@/components/shared/product/product';
import { getLatestProducts } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '../loading';

async function Home() {
  const latestProducts = await getLatestProducts();

  if (!latestProducts) {
    notFound();
  }
  return <ProductList data={latestProducts} title='Product List' />;
}
const HomePage = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomePage;
