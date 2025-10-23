'use server';

import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';
import { LATEST_PRODUCTS_LIMIT } from '../constants';
import { Product } from '@/app/types';

export async function getLatestProducts(): Promise<Product[]> {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return data.map((product: { price: { toString: () => string }; rating: { toString: () => string } }) => ({
    ...convertToPlainObject(product),
    price: product.price.toString(),
    rating: product.rating.toString(),
  })) as Product[];
}
