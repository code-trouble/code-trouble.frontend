import { useAuthStore } from "../stores/authStore";
import { useUserStore } from "../stores/userStore";
import { api } from "./api";

export function initApiLayer() {
  const resId = api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) {
        useUserStore.getState().clearUser();
        useAuthStore.getState().clearLocalState();
      }

      return Promise.reject(error);
    },
  );

  return () => {
    api.interceptors.response.eject(resId);
  };
}
