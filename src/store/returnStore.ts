import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import type {
  ReturnRequest,
  ReturnStatus,
} from '@/types/return';

type ReturnStore = {
  returns: ReturnRequest[];

  createReturn: (
    returnRequest: Omit<
      ReturnRequest,
      'id' | 'date'
    >
  ) => void;

  getReturn: (
    id: string
  ) => ReturnRequest | undefined;

  updateReturnStatus: (
    id: string,
    status: ReturnStatus
  ) => void;
};

export const useReturnStore =
  create<ReturnStore>()(
    persist(
      (set, get) => ({
        returns: [],

        createReturn: (returnRequest) => {
          const savedReturn: ReturnRequest = {
            ...returnRequest,
            id: `RET-${Date.now()}`,
            date: new Date().toISOString(),
          };

          set((state) => ({
            returns: [
              savedReturn,
              ...state.returns,
            ],
          }));
        },

        getReturn: (id) => {
          return get().returns.find(
            (returnRequest) =>
              returnRequest.id === id
          );
        },

        updateReturnStatus: (
          id,
          status
        ) => {
          set((state) => ({
            returns: state.returns.map(
              (returnRequest) =>
                returnRequest.id === id
                  ? {
                      ...returnRequest,
                      status,
                    }
                  : returnRequest
            ),
          }));
        },
      }),
      {
        name: 'mini-store-returns',
      }
    )
  );