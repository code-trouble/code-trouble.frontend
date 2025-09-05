import { create } from "zustand";
import { Tag, TagState } from "../types/tagTypes";
import { api } from "../services/api";

export const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  isLoading: false,
  error: null,

  fetchTags: async () => {
    if (get().tags.length > 0 || get().isLoading) {
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Tag[]>("/tags");
      set({ tags: response.data, isLoading: false });
    } catch (err: any) {
      const message = err.message || "Failed to fetch tags";
      set({ error: message, isLoading: false });
    }
  },
}));
