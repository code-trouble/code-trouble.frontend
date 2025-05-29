import { useCallback } from "react";

export interface Question {
    id: string;
    title: string;
    description: string;
    details?: string;
    tags?: string[];
    createdAt: string;
}

const STORAGE_KEY = "questions";

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
        return getStoredQuestions().find(q => q.id === id);
    }, []);

    const add = useCallback((question: Question): void => {
        const all = getStoredQuestions();
        saveQuestions([question, ...all]);
    }, []);

    const remove = useCallback((id: string): void => {
        const all = getStoredQuestions();
        saveQuestions(all.filter(q => q.id !== id));
    }, []);

    return { getAll, getById, add, remove };
}
