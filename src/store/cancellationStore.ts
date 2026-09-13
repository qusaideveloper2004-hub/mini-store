import {create} from 'zustand';
import {persist} from 'zustand/middleware';

import type {
  CancellationRequest,
  CancellationStatus,
} from '@/types/cancellation';

type CancellationStore = {
  cancellations: CancellationRequest[];

  createCancellation: (
    cancellation: CancellationRequest
  ) => void;

  getCancellation: (
    id: string
  ) => CancellationRequest | undefined;

  updateCancellationStatus: (
    id: string,
    status: CancellationStatus
  ) => void;
};

export const useCancellationStore =
  create<CancellationStore>()(
    persist(
      (set, get) => ({
        cancellations: [],

        createCancellation: (
          cancellation
        ) => {
          set((state) => ({
            cancellations: [
              cancellation,
              ...state.cancellations,
            ],
          }));
        },

        getCancellation: (id) => {
          return get().cancellations.find(
            (cancellation) =>
              cancellation.id === id
          );
        },

        updateCancellationStatus: (
          id,
          status
        ) => {
          set((state) => ({
            cancellations:
              state.cancellations.map(
                (cancellation) =>
                  cancellation.id === id
                    ? {
                        ...cancellation,
                        status,
                      }
                    : cancellation
              ),
          }));
        },
      }),
      {
        name: 'mini-store-cancellations',
      }
    )
  );