export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type OrderItem = {
  productId: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
};