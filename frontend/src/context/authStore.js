import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      email: null,
      setEmail: (email) => set({ email }),
    }),
    {
      name: "auth-storage", // Storage key
      getStorage: () => localStorage, 
    }
  )
);

export default useAuthStore;
