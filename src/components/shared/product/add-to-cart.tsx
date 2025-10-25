'use client';

import { CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { addItemToCart } from '@/lib/actions/cart.action';

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();
  const handleAddToCart = async () => {
    const res = await addItemToCart(item);

    if (!res.success) {
      toast.warning('Item could not be added to cart', {
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo'),
        },
      });
    } else {
      toast.success(`${item.name} added to cart`, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart'),
        },
      });
    }
  };
  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
