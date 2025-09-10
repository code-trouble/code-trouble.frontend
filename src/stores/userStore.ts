import { create } from "zustand";
import { api } from "../services/api";
import { User, UserState, UpdateProfileData } from "../types/userTypes";

export const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  isInitializing: true,

  setUser: (user: User) => set({ currentUser: user, isInitializing: false }),

  fetchCurrentUser: async () => {
    set({ isInitializing: true });
    try {
      const response = await api.get<User>("/users/me");
      set({ currentUser: response.data, isInitializing: false });
    } catch (error) {
      set({ currentUser: null, isInitializing: false });
      throw error;
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    try {
      const response = await api.patch<User>("/users/me", data);

      set({ currentUser: response.data });
    } catch (error) {
      console.error("Falha ao atualizar o perfil:", error);
      throw error;
    }
  },

  updateUserInterests: async (tagIds: number[]) => {
    try {
      const response = await api.put<User>("/users/me/interests", { tagIds });
      set({ currentUser: response.data });
    } catch (error) {
      console.error("Falha ao atualizar interesses:", error);
      throw error;
    }
  },

  clearUser: () => set({ currentUser: null, isInitializing: false }),
}));
