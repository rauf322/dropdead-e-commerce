import Loading from '@/app/loading';
import { Product } from '@/app/types/index';
import ProductCard from './product-card';

const ProductList = ({ data, title }: { data: Product[]; title?: string }) => {
  if (data.length == 0) {
    return <Loading />;
  }
  return (
    <div className='my-10'>
      {title && (
        <h1 className='font-bold text-5xl mb-10 text-center'>{title}</h1>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
