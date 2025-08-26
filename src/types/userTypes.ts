export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  avatarUrl?: String;
};

export type UserState = {
  currentUser: User | null;
  isLoading: boolean;
  fetchCurrentUser: () => Promise<void>;
  clearUser: () => void;
};
