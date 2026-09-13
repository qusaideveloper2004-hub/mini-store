import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import type {Product} from '@/types/product';

type WishlistStore = {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
};

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],

      addToWishlist: (product) => {
        set((state) => {
          const exists = state.items.some(
            (item) => item.id === product.id
          );

          if (exists) {
            return state;
          }

          return {
            items: [...state.items, product],
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => item.id !== productId
          ),
        }));
      },
    }),
    {
      name: 'mini-store-wishlist',
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as Partial<WishlistStore>;

        return {
          items: (state.items ?? []).map((product) => ({
            ...product,
            id: product.id ?? 0,
            title: product.title ?? 'Product',
            price: product.price ?? 0,
            image: product.image ?? '',
            discountPercentage: product.discountPercentage ?? 0,
            rating: product.rating ?? 0,
            reviews: product.reviews ?? [],
            images: product.images ?? [product.image],
            stock: product.stock ?? 0,
            availabilityStatus: product.availabilityStatus ?? 'Unknown',
          })),
        };
      },
    }
  )
);