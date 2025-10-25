'use client';

import { Cart, CartItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { toast } from 'sonner';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.action';
import { useTransition } from 'react';

const AddToCart = ({ item, cart }: { item: CartItem; cart?: Cart }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);
      if (!res.success) {
        toast.warning(res.message, {
          action: {
            label: 'Undo',
            onClick: () => console.log('Undo'),
          },
        });
      } else {
        toast.success(res.message, {
          action: {
            label: 'Go to Cart',
            onClick: () => router.push('/cart'),
          },
        });
      }
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast.success(res.message, {
        action: {
          label: 'Go to Cart',
          onClick: () => router.push('/cart'),
        },
      });
    });
  };

  const existingItem = cart?.items.find((i) => i.productId == item.productId);

  return existingItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='h-4 w-4' />
        )}
      </Button>
      <span className='px-2'>{existingItem.qty}</span>
      <Button type='button' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='h-4 w-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <Plus />}
      Add to Cart
    </Button>
  );
};

export default AddToCart;
