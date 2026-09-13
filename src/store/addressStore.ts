import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

type AddressStore = {
  addresses: Address[];

  addAddress: (address: Address) => void;

  updateAddress: (
    id: string,
    data: Partial<Address>
  ) => void;

  deleteAddress: (id: string) => void;

  setDefaultAddress: (id: string) => void;
};

export const useAddressStore = create<AddressStore>()(
  persist(
    (set) => ({
      addresses: [],

      addAddress: (address) => {
        set((state) => ({
          addresses: [
            ...state.addresses,
            address,
          ],
        }));
      },

      updateAddress: (id, data) => {
        set((state) => ({
          addresses: state.addresses.map((address) =>
            address.id === id
              ? {
                  ...address,
                  ...data,
                }
              : address
          ),
        }));
      },

      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter(
            (address) => address.id !== id
          ),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((address) => ({
            ...address,
            isDefault: address.id === id,
          })),
        }));
      },
    }),
    {
      name: 'mini-store-addresses',
    }
  )
);