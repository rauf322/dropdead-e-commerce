'use server';

import { CartItem } from '@/types';

export async function addItemCart(data: CartItem) {
  return {
    success: true,
    message: 'Ietem added to cart',
  };
}
