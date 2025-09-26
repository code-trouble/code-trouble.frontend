import { create } from "zustand";
import { api } from "../services/api";
import { useUserStore } from "./userStore";
import { AuthState } from "../types/authTypes";

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  clearLocalState: () => set({ isLoading: false, error: null }),

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error(
        "Logout falhou no servidor, limpando o cliente mesmo assim.",
        err,
      );
    } finally {
      useUserStore.getState().clearUser();
      set({ isLoading: false, error: null });
    }
  },

  signIn: async (data) => {
    set({ isLoading: true, error: null });

    try {
      await api.post("/auth/login", data);

      await useUserStore.getState().fetchCurrentUser();
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Email ou senha inválidos.";
      set({ error: "Email ou senha inválidos." });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/register", data);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Falha ao cadastrar. Tente novamente";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  forgotPassword: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/forgot-password", data);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Verifique se o email está correto";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await api.post("/auth/reset-password", data);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Token inválido ou expirado.";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ isLoading: false });
    }
  },
}));
