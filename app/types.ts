export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  description: string;
  isFeatured: boolean;
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
