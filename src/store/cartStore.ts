import {create} from "zustand";
import {persist} from "zustand/middleware";

import type {Product} from "@/types/product";

type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const safeQuantity = Number.isFinite(quantity)
          ? Math.min(Math.max(1, Math.floor(quantity)), Math.max(1, product.stock))
          : 1;

        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: Math.min(
                        item.quantity + safeQuantity,
                        Math.max(1, item.stock)
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                quantity: safeQuantity,
              },
            ],
          };
        });
      },

      increaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + 1, Math.max(1, item.stock)),
                }
              : item
          ),
        }));
      },

      decreaseQuantity: (productId) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item
          ),
        }));
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        }));
      },

      clearCart: () => {
        set({items: []});
      },
    }),
    {
      name: "mini-store-cart",
    }
  )
);
