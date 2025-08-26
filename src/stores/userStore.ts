import { create } from "zustand";
import { api } from "../services/api";
import { User, UserState } from "../types/userTypes";

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isLoading: true,

  fetchCurrentUser: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<User>("/users/me");
      set({ currentUser: response.data, isLoading: false });
    } catch (error) {
      set({ currentUser: null, isLoading: false });
    }
  },

  clearUser: () => set({ currentUser: null, isLoading: false }),
}));
