'use client';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <Image
        src={images[current]}
        alt='product image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center rounded-xl'
      />
      {images.length > 1 && (
        <div className='flex flex-row gap-2 align-center justify-center'>
          {images.map((img, index) => {
            return (
              <Image
                src={img}
                onClick={() => setCurrent(index)}
                key={index}
                alt={`product image ${index}`}
                width={100}
                height={100}
                className={cn(
                  'min-h-[50px] rounded-xl mt-10 object-cover object-center border mr-2 cursor-pointer',
                  'hover:border-foreground',
                  current === index && 'border-foreground',
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductImages;
