interface InterestTag {
  id: number;
  name: string;
}

interface UserInterest {
  user_id: number;
  tag_id: number;
  tag: InterestTag;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  display_name: string | null;
  pronouns: string | null;
  bio: string | null;
  avatarUrl: string;
  banner_url: string | null;
  social_links: {
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  } | null;

  user_interests: UserInterest[];
}

export type UpdateProfileData = Partial<{
  display_name: string;
  pronouns: string;
  bio: string;
  avatar_url: string;
  banner_url: string;
  social_links: {
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
}>;

export interface UserState {
  currentUser: User | null;
  isInitializing: boolean;
  profileUser: User | null;
  isLoadingProfile: boolean;
  fetchCurrentUser: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  updateUserInterests: (tagIds: number[]) => Promise<void>;
  clearUser: () => void;
  setUser: (user: User) => void;

  fetchUserProfile: (username: string) => Promise<User>;
  clearProfileUser: () => void;
}
