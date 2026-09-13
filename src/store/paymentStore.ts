import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type PaymentMethod = {
  id: string;
  cardholderName: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  brand: string;
  isDefault: boolean;
};

type PaymentStore = {
  payments: PaymentMethod[];

  addPayment: (payment: PaymentMethod) => void;

  deletePayment: (id: string) => void;

  setDefaultPayment: (id: string) => void;
};

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set) => ({
      payments: [],

      addPayment: (payment) => {
        set((state) => ({
          payments: [
            ...state.payments,
            payment,
          ],
        }));
      },

      deletePayment: (id) => {
        set((state) => ({
          payments: state.payments.filter(
            (payment) => payment.id !== id
          ),
        }));
      },

      setDefaultPayment: (id) => {
        set((state) => ({
          payments: state.payments.map(
            (payment) => ({
              ...payment,
              isDefault:
                payment.id === id,
            })
          ),
        }));
      },
    }),
    {
      name: 'mini-store-payments',
    }
  )
);