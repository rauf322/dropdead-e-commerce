import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';
import { PAYMENT_METHODS } from './constants';

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
  description: z.string().min(3, 'Description suppose to be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters '),
  city: z.string().min(3, 'City must be at least 3 characters '),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters '),
  country: z.string().min(3, 'Couhtry must be at least 3 characters '),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const userAuthSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.email().optional(),
  emailVerified: z.date().nullable().optional(),
  image: z.string().optional(),
  password: z.string().optional(),
  address: shippingAddressSchema.optional(),
  role: z.enum(['user', 'admin']).default('user'),
  paymentMethod: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

//Schema for sign-in user

export const signInFormShema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const signUpFormShema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data: z.infer<typeof signUpFormShema>) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  price: currency,
  qty: z.number().int().nonnegative('Quantity must be a positive'),
  image: z.string().min(1, 'Image is required'),
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, 'SessionCartId is required'),
  userId: z.string().optional().nullable(),
});

export const paymentMethodSchema = z.object({
  type: z.enum(PAYMENT_METHODS, 'Not supported payment method'),
});

export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currency,
  taxPrice: currency,
  shippingPrice: currency,
  totalPrice: currency,
  paymentMethod: z.enum(PAYMENT_METHODS, 'Not supported payment method'),
  shippingAddress: shippingAddressSchema,
  status: z.enum(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const),
});

//Schema for insering order item

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});
