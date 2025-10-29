import { z } from 'zod';
import {
  insertProductSchema,
  userAuthSchema,
  insertCartSchema,
  cartItemSchema,
  shippingAddressSchema,
  insertOrderSchema,
  insertOrderItemSchema,
  paymentResultSchema,
} from '../lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type User = z.infer<typeof userAuthSchema>;

// Seed data types (without auto-generated fields)
export type SeedProduct = Omit<Product, 'id'>;
export type SeedUser = Omit<User, 'id' | 'updatedAt' | 'createdAt'>;

export type Data = {
  products: SeedProduct[];
  users: SeedUser[];
  orders: Order[];
};

export type Cart = z.infer<typeof insertCartSchema>;

export type CartItem = z.infer<typeof cartItemSchema>;

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

export type OrderItem = z.infer<typeof insertOrderItemSchema>;

export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: boolean;
  paidAt: Date | null;
  isDelivered: boolean;
  deliveredAt: Date | null;
  orderitems: OrderItem[];
  user: { name: string | null; email: string | null };
};

export type PaymentResult = z.infer<typeof paymentResultSchema>;
