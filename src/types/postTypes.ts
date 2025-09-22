export interface Post {
  id: number;
  title: string; // Remove the optional - both articles and questions have titles
  body: any; // This should handle both Quill content and { description, details, tags }
  kind: "article" | "question" | "answer";
  created_at: string;
  updated_at?: string;
  author_id: number;
  parent_id?: number;
  author: {
    id: number;
    username: string;
    display_name?: string;
    avatar_url: string;
  };
  commentCount?: number;
  likeCount?: number;
  isLikedByUser?: boolean;
  tags?: { id: number; name: string }[];
}

export interface PostFilters {
  kind?: "article" | "question" | "answer";
  limit?: number;
  page?: number;
  author_id?: number;
  parent_id?: number;
}

export interface PostPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PostState {
  title: string;
  body: any;
  kind: "article" | "question" | "answer";
  isLoading: boolean;
  error: string | null;
  success: boolean;
  isEditMode: boolean;
  editingPostId: number | null;

  posts: Post[];
  articles: Post[];
  questions: Post[];
  currentPost: Post | null;
  currentQuestion: Post | null;
  currentArticle: Post | null;
  isLoadingPosts: boolean;
  pagination: PostPagination | null;

  setTitle: (title: string) => void;
  setBody: (body: any) => void;
  setKind: (kind: "article" | "question" | "answer") => void;
  reset: () => void;
  createPost: () => Promise<Post>;
  updatePost: (id: number, data: Partial<Post>) => Promise<Post>;
  deletePost: (id: number) => Promise<void>;

  fetchAllPosts: (filters?: PostFilters) => Promise<void>;
  fetchAllArticles: () => Promise<void>;
  fetchAllQuestions: () => Promise<void>;
  fetchPostById: (id: string) => Promise<Post>;
  fetchArticleById: (id: string) => Promise<Post>;
  fetchQuestionsById: (id: string) => Promise<Post>;

  loadPostForEdit: (post: Post) => void;
  isPostOwner: (post: Post, currentUserId?: number) => boolean;
}

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
    avatar_url: string;
  };
}
