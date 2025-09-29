import { create } from "zustand";
import axios from "axios";
import { api } from "../services/api";
import { useAuthModalStore } from "./authModalStore";
import { Post, PostState, PostFilters } from "../types/postTypes";

const initialCreationState = {
  title: "",
  body: {},
  kind: "question" as const,
  isLoading: false,
  error: null,
  success: false,
  isEditMode: false,
  editingPostId: null,
};

export const usePostStore = create<PostState>((set, get) => ({
  ...initialCreationState,
  postList: [],
  currentPost: null,
  isLoadingPosts: false,
  pagination: null,
  isLiking: false,

  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setKind: (kind) => set({ kind }),
  reset: () => set({ ...initialCreationState }),
  clearPosts: () => set({ postList: [], currentPost: null }),

  createPost: async () => {
    const { title, body, kind } = get();
    set({ isLoading: true, error: null, success: false });

    try {
      const postData = { kind, title, body };
      const response = await api.post("/posts", postData);
      set({ isLoading: false, success: true });
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
        set({ isLoading: false });
        return;
      }
      const message = err.response?.data?.message || "Erro ao criar post";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  updatePost: async (id: number, data: Partial<Post>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put(`/posts/${id}`, data);
      const updatedPost = response.data;

      set((state) => ({
        postList: state.postList.map((p) => (p.id === id ? updatedPost : p)),
        currentPost:
          state.currentPost?.id === id ? updatedPost : state.currentPost,
        isLoading: false,
        success: true,
      }));

      return updatedPost;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
      }
      const message = err.response?.data?.message || "Erro ao atualizar post";
      set({ isLoading: false, error: message });
      throw err;
    }
  },

  deletePost: async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      set((state) => ({
        postList: state.postList.filter((p) => p.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
      }));
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
        return;
      }
      throw err;
    }
  },

  fetchAllPosts: async (filters?: PostFilters) => {
    set({ isLoadingPosts: true, error: null });
    try {
      const params = new URLSearchParams();
      if (filters?.kind) params.append("kind", filters.kind);
      if (filters?.limit) params.append("limit", filters.limit.toString());
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.author_id)
        params.append("author_id", filters.author_id.toString());
      if (filters?.parent_id)
        params.append("parent_id", filters.parent_id.toString());

      const response = await api.get(`/posts?${params.toString()}`);
      set({
        postList: response.data.data,
        pagination: response.data.pagination,
        isLoadingPosts: false,
      });
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao buscar posts";
      set({ isLoadingPosts: false, error: message });
      throw err;
    }
  },

  fetchPostById: async (id: string) => {
    set({ isLoadingPosts: true, error: null, currentPost: null });
    try {
      const response = await api.get(`/posts/${id}`);
      set({
        currentPost: response.data,
        isLoadingPosts: false,
      });
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Post não encontrado.";
      set({ isLoadingPosts: false, error: message });
      throw err;
    }
  },

  toggleLike: async (postId: number) => {
    if (get().isLiking) return;

    set({ isLiking: true });
    try {
      const response = await api.post(`/posts/${postId}/like`);
      const { liked, likeCount } = response.data;

      set((state) => ({
        postList: state.postList.map((post) =>
          post.id === postId
            ? { ...post, likeCount: likeCount, isLikedByUser: liked }
            : post,
        ),
        currentPost:
          state.currentPost?.id === postId
            ? {
                ...state.currentPost,
                likeCount: likeCount,
                isLikedByUser: liked,
              }
            : state.currentPost,
      }));

      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
      }
      throw err;
    } finally {
      set({ isLiking: false });
    }
  },

  loadPostForEdit: (post: Post) => {
    set({
      title: post.title || "",
      body: post.body,
      kind: post.kind,
      isEditMode: true,
      editingPostId: post.id,
      success: false,
      error: null,
    });
  },

  isPostOwner: (post: Post, currentUserId?: number) => {
    return currentUserId ? post.author_id === currentUserId : false;
  },
}));
