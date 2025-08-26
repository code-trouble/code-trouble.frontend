import { create } from "zustand";
import { api } from "../services/api";
import { Question, QuestionState } from "../types/questionTypes";

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  currentQuestion: null,
  isLoading: false,
  error: null,

  fetchAllQuestions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Question[]>("/posts?kind=question");
      set({ questions: response.data, isLoading: false });
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Erro ao buscar perguntas.";
      set({ isLoading: false, error: message });
    }
  },

  fetchQuestionsById: async (id: string) => {
    set({ isLoading: true, error: null, currentQuestion: null });
    try {
      const response = await api.get<Question>(`/posts/${id}`);
      set({ currentQuestion: response.data, isLoading: false });
    } catch (err: any) {
      const message = err.response?.data?.message || "Pergunta não encontrada.";
      set({ isLoading: false, error: message });
    }
  },
}));
