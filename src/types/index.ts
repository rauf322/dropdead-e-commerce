import { z } from 'zod';
import {
  insertProductSchema,
  userAuthSchema,
  insertCartSchema,
  cartItemSchema,
} from '../lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type User = z.infer<typeof userAuthSchema>;

export type Order = {
  id: string;
  userId: string;
  items: OrderedItem[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
};

export type OrderedItem = {
  productId: string;
  quantity: number;
  price: number;
};

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
