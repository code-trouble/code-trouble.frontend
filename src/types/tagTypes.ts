export interface Tag {
  id: number;
  name: string;
}

export interface TagState {
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
}
