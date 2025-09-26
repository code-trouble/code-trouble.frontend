import { create } from "zustand";
import { api } from "../services/api";
import { User, UserState, UpdateProfileData } from "../types/userTypes";
import { useAuthModalStore } from "./authModalStore";
import axios from "axios";
import { toast } from "sonner";

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  isInitializing: true,
  profileUser: null,
  isLoadingProfile: false,
  followingUsers: new Set(),
  updatingFollowStatus: new Set<number>(),

  isUpdatingFollowStatus: (userId: number) =>
    get().updatingFollowStatus.has(userId),

  setUser: (user: User) => set({ currentUser: user, isInitializing: false }),

  fetchCurrentUser: async () => {
    set({ isInitializing: true });
    try {
      const response = await api.get<User>("/users/me");
      const user = response.data;
      const followingIds =
        user.following?.map((follow) => follow.followed_user_id) || [];
      const followingSet = new Set(followingIds);

      set({
        currentUser: response.data,
        isInitializing: false,
        followingUsers: followingSet,
      });
    } catch (error: any) {
      if (error?.isHandledError) {
        return;
      }

      set({
        currentUser: null,
        isInitializing: false,
        followingUsers: new Set(),
      });
    }
  },
  isFollowingUser: (userId: number) => get().followingUsers.has(userId),

  followUser: async (userId: number) => {
    set((state) => ({
      updatingFollowStatus: new Set(state.updatingFollowStatus).add(userId),
    }));

    try {
      await api.post(`/users/${userId}/follow`);
      set((state) => {
        const newFollowingUsers = new Set(state.followingUsers).add(userId);
        const newProfileUser =
          state.profileUser && state.profileUser.id === userId
            ? {
                ...state.profileUser,
                _count: {
                  ...state.profileUser._count!,
                  followers: (state.profileUser._count?.followers || 0) + 1,
                },
              }
            : state.profileUser;
        const newCurrentUser = state.currentUser
          ? {
              ...state.currentUser,
              _count: {
                ...state.currentUser._count!,
                following: (state.currentUser._count?.following || 0) + 1,
              },
            }
          : state.currentUser;
        return {
          followingUsers: newFollowingUsers,
          profileUser: newProfileUser,
          currentUser: newCurrentUser,
        };
      });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
        return;
      }
      throw err;
    } finally {
      set((state) => {
        const newSet = new Set(state.updatingFollowStatus);
        toast.success("O usuário foi seguido com sucesso!");

        newSet.delete(userId);
        return { updatingFollowStatus: newSet };
      });
    }
  },

  unfollowUser: async (userId: number) => {
    set((state) => ({
      updatingFollowStatus: new Set(state.updatingFollowStatus).add(userId),
    }));

    try {
      await api.delete(`/users/${userId}/follow`);
      set((state) => {
        const newFollowingUsers = new Set(state.followingUsers);
        newFollowingUsers.delete(userId);
        const newProfileUser =
          state.profileUser && state.profileUser.id === userId
            ? {
                ...state.profileUser,
                _count: {
                  ...state.profileUser._count!,
                  followers: Math.max(
                    0,
                    (state.profileUser._count?.followers || 0) - 1,
                  ),
                },
              }
            : state.profileUser;
        const newCurrentUser = state.currentUser
          ? {
              ...state.currentUser,
              _count: {
                ...state.currentUser._count!,
                following: Math.max(
                  0,
                  (state.currentUser._count?.following || 0) - 1,
                ),
              },
            }
          : state.currentUser;
        return {
          followingUsers: newFollowingUsers,
          profileUser: newProfileUser,
          currentUser: newCurrentUser,
        };
      });
    } finally {
      set((state) => {
        const newSet = new Set(state.updatingFollowStatus);
        toast.success("Deixou de seguir o usuário com sucesso!");
        newSet.delete(userId);
        return { updatingFollowStatus: newSet };
      });
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
