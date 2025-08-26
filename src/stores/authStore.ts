import { create } from "zustand";
import { api } from "../services/api";
import { useUserStore } from "./userStore";
import { AuthState } from "../types/authTypes";

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  error: null,
  success: false,
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
    set({ token: null, isLoading: false, error: null, success: false });
    useUserStore.getState().clearUser();
  },

  signUp: async (data) => {
    set({ isLoading: true, error: null, success: false });
    try {
      await api.post("/auth/register", data);
      set({ isLoading: false, success: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Falha ao cadastrar. Tente novamente";
      set({ isLoading: false, error: message });
    }
  },

  reset: () => {
    set({ isLoading: false, error: null, success: false });
  },

  signIn: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", data);
      const { access_token } = response.data;
      get().setToken(access_token);
      set({ isLoading: false, success: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Email ou senha inválidos.";
      set({ isLoading: false, error: message });
    }
  },
}));
