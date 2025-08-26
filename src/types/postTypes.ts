export interface PostCreationState {
  title: string;
  body: any;
  kind: "article" | "question";

  isLoading: boolean;
  error: string | null;
  success: boolean;

  setTitle: (title: string) => void;
  setBody: (body: any) => void;
  setKind: (kind: "article" | "question") => void;
  reset: () => void;
  createPost: () => Promise<any>;
}
