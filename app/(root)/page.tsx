import ProductList from '@/app/components/shared/product/product';
import { sampleData } from '@/db/sampleData';

const HomePage = async () => {
  return (
    <div>
      <ProductList data={sampleData.products} title='Product List' />
    </div>
  );
};

export default HomePage;
