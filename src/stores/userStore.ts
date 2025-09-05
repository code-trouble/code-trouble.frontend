import { create } from "zustand";
import { api } from "../services/api";
import { User, UserState, UpdateProfileData } from "../types/userTypes";

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

  updateProfile: async (data: UpdateProfileData) => {
    set({ isLoading: true });
    try {
      const response = await api.patch<User>("/users/me", data);

      set({ currentUser: response.data, isLoading: false });
    } catch (error) {
      console.error("Falha ao atualizar o perfil:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  updateUserInterests: async (tagIds: number[]) => {
    set({ isLoading: true });
    try {
      const response = await api.put<User>("/users/me/interests", { tagIds });
      // Atualiza o usuário com a resposta que inclui os novos interesses
      set({ currentUser: response.data, isLoading: false });
    } catch (error) {
      console.error("Falha ao atualizar interesses:", error);
      set({ isLoading: false });
      throw error;
    }
  },

  clearUser: () => set({ currentUser: null, isLoading: false }),
}));
