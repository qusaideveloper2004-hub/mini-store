import {create} from 'zustand';
import {persist} from 'zustand/middleware';

type User = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
};

type AuthStore = {
  user: User | null;

  login: (user: User) => void;

  updateProfile: (data: Partial<User>) => void;

  updatePassword: (
    currentPassword: string,
    newPassword: string
  ) => boolean;

  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: (user) => {
        set({user});
      },

      updateProfile: (data) => {
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                ...data,
              }
            : null,
        }));
      },

      updatePassword: (
        currentPassword,
        newPassword
      ) => {
        const user = get().user;

        if (!user) {
          return false;
        }

        if (user.password !== currentPassword) {
          return false;
        }

        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                password: newPassword,
              }
            : null,
        }));

        return true;
      },

      logout: () => {
        set({user: null});
      },
    }),
    {
      name: 'mini-store-auth',
    }
  )
);