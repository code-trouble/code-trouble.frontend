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
  isLoadingAnswer: false,
  error: null,
  success: false,
  isEditMode: false,
  editingPostId: null,
};

export const usePostStore = create<PostState>((set, get) => ({
  ...initialCreationState,
  questionsList: [],
  articlesList: [],
  answersList: [],
  userPosts: [],
  currentPost: null,
  isLoadingPosts: true,
  pagination: null,
  isLiking: false,

  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setKind: (kind) => set({ kind }),
  reset: () => set({ ...initialCreationState }),
  clearPosts: () =>
    set({
      questionsList: [],
      articlesList: [],
      answersList: [],
      currentPost: null,
    }),

  createPost: async (overrides?: {
    kind?: "question" | "article" | "answer";
    title?: string;
    body?: any;
    parent_id?: number;
  }) => {
    const state = get();

    const postData = {
      kind: overrides?.kind ?? state.kind,
      title: overrides?.title ?? state.title,
      body: overrides?.body ?? state.body,
      parent_id: overrides?.parent_id,
    };

    const isAnswer = postData.kind === "answer";
    const loadingKey = isAnswer ? "isLoadingAnswer" : "isLoading";

    set({ [loadingKey]: true, error: null, success: false });

    try {
      const response = await api.post("/posts", postData);
      set({ [loadingKey]: false, success: true });
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
        set({ [loadingKey]: false });
        return;
      }
      const message = err.response?.data?.message || "Erro ao criar post";
      set({ [loadingKey]: false, error: message });
      throw err;
    }
  },

  updatePost: async (id: number, data: Partial<Post>) => {
    const isAnswer = data.kind === "answer";
    const loadingKey = isAnswer ? "isLoadingAnswer" : "isLoading";

    set({ [loadingKey]: true, error: null });

    try {
      const response = await api.put(`/posts/${id}`, data);
      const updatedPost = response.data;

      set((state) => {
        const updates: any = {
          [loadingKey]: false,
          success: true,
        };

        // Update in the appropriate list
        if (updatedPost.kind === "question") {
          updates.questionsList = state.questionsList.map((p) =>
            p.id === id ? updatedPost : p,
          );
        } else if (updatedPost.kind === "article") {
          updates.articlesList = state.articlesList.map((p) =>
            p.id === id ? updatedPost : p,
          );
        } else if (updatedPost.kind === "answer") {
          updates.answersList = state.answersList.map((p) =>
            p.id === id ? updatedPost : p,
          );
        }

        // Update currentPost if it's the same
        if (state.currentPost?.id === id) {
          updates.currentPost = updatedPost;
        }

        // Update answer in currentPost's answers array if applicable
        if (state.currentPost?.answers) {
          updates.currentPost = {
            ...state.currentPost,
            answers: state.currentPost.answers.map((a) =>
              a.id === id ? updatedPost : a,
            ),
          };
        }

        return updates;
      });

      return updatedPost;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
      }
      const message = err.response?.data?.message || "Erro ao atualizar post";
      set({ [loadingKey]: false, error: message });
      throw err;
    }
  },

  deletePost: async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);

      set((state) => ({
        questionsList: state.questionsList.filter((p) => p.id !== id),
        articlesList: state.articlesList.filter((p) => p.id !== id),
        answersList: state.answersList.filter((p) => p.id !== id),
        currentPost: state.currentPost?.id === id ? null : state.currentPost,
        ...(state.currentPost?.answers && {
          currentPost: {
            ...state.currentPost,
            answers: state.currentPost.answers.filter((a) => a.id !== id),
          },
        }),
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

      // Determine which list to update based on kind filter
      const updates: any = {
        pagination: response.data.pagination,
        isLoadingPosts: false,
      };

      if (filters?.kind === "question") {
        updates.questionsList = response.data.data;
      } else if (filters?.kind === "article") {
        updates.articlesList = response.data.data;
      } else if (filters?.kind === "answer") {
        updates.answersList = response.data.data;
      } else {
        // No kind specified - default to questions
        updates.questionsList = response.data.data;
      }

      set(updates);
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao buscar posts";
      set({ isLoadingPosts: false, error: message });
      throw err;
    }
  },

  fetchPostById: async (id: string) => {
    const postId = Number(id);
    if (isNaN(postId)) {
      set({ isLoadingPosts: false, error: "ID de post inválido." });
      return;
    }

    set({ isLoadingPosts: true, error: null, currentPost: null });
    try {
      const response = await api.get(`/posts/${postId}`);
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

  fetchUserPosts: async (
    userId: number,
    kind?: "article" | "question" | "answer",
  ) => {
    set({ isLoadingPosts: true, error: null });

    try {
      const params: Record<string, any> = { author_id: userId };
      if (kind) params.kind = kind;

      const response = await api.get("/posts", { params });

      set({
        userPosts: response.data.data,
        isLoadingPosts: false,
        pagination: response.data.pagination || null,
      });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Erro ao buscar posts do usuário";
      console.error("Erro ao buscar posts do usuário:", err);
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

      set((state) => {
        const updatePost = (post: Post) =>
          post.id === postId
            ? { ...post, likeCount: likeCount, isLikedByUser: liked }
            : post;

        return {
          questionsList: state.questionsList.map(updatePost),
          articlesList: state.articlesList.map(updatePost),
          answersList: state.answersList.map(updatePost),
          currentPost:
            state.currentPost?.id === postId
              ? {
                  ...state.currentPost,
                  likeCount: likeCount,
                  isLikedByUser: liked,
                }
              : state.currentPost,
        };
      });

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

  createAnswer: async (questionId: number, body: any) => {
    return get().createPost({
      kind: "answer",
      body: body,
      parent_id: questionId,
    });
  },

  acceptAnswer: async (questionId: number, answerId: number) => {
    try {
      await api.post(`/posts/${questionId}/accept-answer/${answerId}`);

      set((state) => {
        if (state.currentPost?.id === questionId && state.currentPost.answers) {
          return {
            currentPost: {
              ...state.currentPost,
              acceptedAnswerId: answerId,
              answers: state.currentPost.answers.map((a) => ({
                ...a,
                isAccepted: a.id === answerId,
              })),
            },
          };
        }
        return state;
      });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        useAuthModalStore.getState().openModal("signIn");
      }
      throw err;
    }
  },
}));
