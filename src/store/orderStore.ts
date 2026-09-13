import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import type {
  Order,
  OrderStatus,
} from '@/types/order';

type OrderStore = {
  orders: Order[];

  createOrder: (order: Order) => void;

  getOrder: (id: string) => Order | undefined;

  updateOrderStatus: (
    id: string,
    status: OrderStatus
  ) => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrder: (id) => {
        return get().orders.find(
          (order) => order.id === id
        );
      },

      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id
              ? {
                  ...order,
                  status,
                }
              : order
          ),
        }));
      },
    }),
    {
      name: 'mini-store-orders',
    }
  )
);