import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { accountInterface } from '../types/accounts.type';



type UserStore = {
  user: accountInterface | null;
  setUser: (userData: NonNullable<accountInterface>) => void;
  clearUser: () => void;
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', 
    }
  )
);

export default useUserStore;

