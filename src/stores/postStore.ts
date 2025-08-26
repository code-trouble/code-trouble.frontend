import { create } from "zustand";
import { api } from "../services/api";
import { PostCreationState } from "../types/postTypes";

const initialState = {
  title: "",
  body: {},
  kind: "question" as const,
  isLoading: false,
  error: null,
  success: false,
};

export const usePostStore = create<PostCreationState>((set, get) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setBody: (body) => set({ body }),
  setKind: (kind) => set({ kind }),

  reset: () => set(initialState),

  createPost: async () => {
    const { title, body, kind } = get();
    set({ isLoading: true, error: null, success: false });

    try {
      const postData = { kind, title, body };
      const response = await api.post("/posts", postData);
      set({ isLoading: false, success: true });
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Erro ao criar post";
      set({ isLoading: false, error: message });
      throw err;
    }
  },
}));
