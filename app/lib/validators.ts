import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

//Schema for inserting a new product

const currency = z.string().refine((value) => {
  const formatted = formatNumberWithDecimal(Number(value));
  return /^\d+(\.\d{2})?$/.test(formatted);
}, 'Price must have two 2 decimals');

export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name suppose to be at least 3 characters'),
  slug: z.string().min(3, 'Slug suppose to be at least 3 characters'),
  category: z.string().min(3, 'Category suppose to be at least 3 characters'),
  brand: z.string().min(3, 'Brand suppose to be at least 3 characters'),
  description: z
    .string()
    .min(3, 'Description suppose to be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
