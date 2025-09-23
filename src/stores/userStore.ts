import { create } from "zustand";
import { api } from "../services/api";
import { User, UserState, UpdateProfileData } from "../types/userTypes";
import { useAuthModalStore } from "./authModalStore";
import axios from "axios";

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  isInitializing: true,
  profileUser: null,
  isLoadingProfile: false,
  followingUsers: new Set(),

  setUser: (user: User) => set({ currentUser: user, isInitializing: false }),

  fetchCurrentUser: async () => {
    set({ isInitializing: true });
    try {
      const response = await api.get<User>("/users/me");
      set({ currentUser: response.data, isInitializing: false });
    } catch (error: any) {
      if (error?.isHandledError) {
        return;
      }

      set({ currentUser: null, isInitializing: false });
    }
  },
  isFollowingUser: (userId: number) => get().followingUsers.has(userId),

  followUser: async (userId: number) => {
    try {
      await api.post(`/users/${userId}/follow`);
      set((state) => ({
        followingUsers: new Set(state.followingUsers).add(userId),
      }));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
        return;
      }
      throw err;
    }
  },

  unfollowUser: async (userId: number) => {
    await api.delete(`/users/${userId}/follow`);
    set((state) => {
      const newSet = new Set(state.followingUsers);
      newSet.delete(userId);
      return { followingUsers: newSet };
    });
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

  clearUser: () =>
    set({
      currentUser: null,
      isInitializing: false,
      followingUsers: new Set(),
    }),

  fetchUserProfile: async (username: string) => {
    set({ isLoadingProfile: true });

    const { currentUser } = get();

    if (currentUser?.username === username) {
      set({ profileUser: currentUser, isLoadingProfile: false });
      return currentUser;
    }

    try {
      const response = await api.get<User>(`/users/${username}`);
      set({ profileUser: response.data, isLoadingProfile: false });
      return response.data;
    } catch (error) {
      set({ profileUser: null, isLoadingProfile: false });
      throw error;
    }
  },

  clearProfileUser: () => set({ profileUser: null, isLoadingProfile: false }),
}));
