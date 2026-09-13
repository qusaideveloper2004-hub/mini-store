export type ReturnStatus =
  | 'requested'
  | 'approved'
  | 'rejected'
  | 'completed';

export type ReturnItem = {
  productId: number;
  title: string;
  image: string;
  price: number;
};

export type ReturnRequest = {
  id: string;
  orderId: string;
  item: ReturnItem;
  quantity: number;
  reason: string;
  date: string;
  status: ReturnStatus;
};