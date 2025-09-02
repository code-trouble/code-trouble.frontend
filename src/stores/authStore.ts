import { create } from "zustand";
import { api } from "../services/api";
import { useUserStore } from "./userStore";
import { AuthState } from "../types/authTypes";

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  error: null,
  token: null,

  setToken: (t) => {
    if (t) localStorage.setItem("authToken", t);
    else localStorage.removeItem("authToken");
    set({ token: t });
  },

  hydrateFromStorage: () => {
    const t = localStorage.getItem("authToken");
    set({ token: t });
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({ token: null, isLoading: false, error: null });
    useUserStore.getState().clearUser();
  },

  signIn: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", data);
      const { access_token } = response.data;
      get().setToken(access_token);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Email ou senha inválidos.";
      set({ error: message });
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
