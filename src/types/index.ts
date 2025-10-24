import { z } from 'zod';
import { insertProductSchema } from '../lib/validators';

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
};

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

export type Data = {
  products: Product[];
  users: User[];
  orders: Order[];
};
