// src/hooks/useQuestions.ts
import { useCallback } from "react";
import { initialQuestions } from "../utils/initialQuestions";

const STORAGE_KEY = "questions";

// seed localStorage once on first load
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialQuestions));
}

export interface Answer {
  id: string;
  text: string;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  details?: string;
  tags?: string[];
  createdAt: string;
  answers?: Answer[];
}

function getStoredQuestions(): Question[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveQuestions(qs: Question[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(qs));
}

export function useQuestions() {
  const getAll = useCallback((): Question[] => {
    return getStoredQuestions();
  }, []);

  const getById = useCallback((id: string): Question | undefined => {
    return getStoredQuestions().find((q) => q.id === id);
  }, []);

  const add = useCallback((question: Question): void => {
    const all = getStoredQuestions();
    saveQuestions([question, ...all]);
  }, []);

  const remove = useCallback((id: string): void => {
    const all = getStoredQuestions();
    saveQuestions(all.filter((q) => q.id !== id));
  }, []);

  const deleteAnswer = useCallback(
    (questionId: string, answerId: string): void => {
      const all = getStoredQuestions();
      const idx = all.findIndex((q) => q.id === questionId);
      if (idx !== -1) {
        const q = all[idx];
        const updated = {
          ...q,
          answers: (q.answers || []).filter((a) => a.id !== answerId),
        };
        all[idx] = updated;
        saveQuestions(all);
      }
    },
    []
  );

  return { getAll, getById, add, remove, deleteAnswer };
}
