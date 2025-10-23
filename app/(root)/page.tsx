import ProductList from '@/app/components/shared/product/product';
import { getLatestProducts } from '@/app/lib/actions/product.actions';

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <ProductList data={latestProducts} title='Product List' />
    </div>
  );
};

export default HomePage;
