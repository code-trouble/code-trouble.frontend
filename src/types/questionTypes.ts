export interface Question {
  id: number;
  title: string;
  body: {
    description: any;
    details: any;
    tags: string[];
  };
  kind: string;
  created_at: string;
  author: {
    id: number;
    username: string;
    avatarUrl: string;
  };
}

export interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  isLoading: boolean;
  error: string | null;

  fetchAllQuestions: () => Promise<void>;
  fetchQuestionsById: (id: string) => Promise<void>;
}
