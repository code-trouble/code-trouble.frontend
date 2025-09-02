import { create } from "zustand";
import { api } from "../services/api";
import { useUserStore } from "./userStore";
import { AuthState } from "../types/authTypes";

export const useAuthStore = create<AuthState>((set, get) => ({
  isLoading: false,
  error: null,
  token: null,
  success: false,
  forgotPasswordSuccess: false,
  passwordResetSuccess: false,
  signUpSuccess: false,

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

  signUp: async (data) => {
    set({ isLoading: true, error: null, signUpSuccess: false });
    try {
      await api.post("/auth/register", data);
      set({ isLoading: false, signUpSuccess: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Falha ao cadastrar. Tente novamente";
      set({ isLoading: false, error: message });
    }
  },

  forgotPassword: async (data) => {
    set({ isLoading: true, error: null, forgotPasswordSuccess: false });
    try {
      await api.post("/auth/forgot-password", data);
      set({ isLoading: false, forgotPasswordSuccess: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Verifique se o email está correto";
      set({ isLoading: false, error: message });
    }
  },

  resetPassword: async (data) => {
    set({ isLoading: true, error: null, passwordResetSuccess: false });
    try {
      await api.post("/auth/reset-password", data);
      set({ isLoading: false, passwordResetSuccess: true });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Token inválçido ou expirado.";
      set({ isLoading: false, error: message });
    }
  },

  //resetting state
  reset: () => {
    set({
      isLoading: false,
      error: null,
      success: false,
      signUpSuccess: false,
      forgotPasswordSuccess: false,
      passwordResetSuccess: false,
    });
  },
}));
