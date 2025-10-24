'use client';

import { Product as ProductType } from '@/app/types/index';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product }: { product: ProductType }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className='w-full max-w-sm group relative'>
      <CardHeader className='p-0 items-center flex flex-col align-center justify-center '>
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            height={300}
            width={300}
            priority={true}
          />
        </Link>
      </CardHeader>
      <Heart
        className='absolute transition-all group-hover:opacity-100 opacity-0 ml-5 cursor-pointer'
        fill={isHovered ? 'currentColor' : 'none'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      <CardContent className='p-4 grid gap-4 mx-auto'>
        <h2 className='text-xl transition-all opacity-0 group-hover:opacity-100 m-b-6'>
          {product.name}
        </h2>
        <p className='text-l transition-all opacity-0 group-hover:opacity-100 text-center'>
          ${product.price}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
