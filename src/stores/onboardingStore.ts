import { create } from "zustand";
import { OnboardingState } from "../types/onboardingSectionTypes";

const initialState = {
  interestTagIds: new Set<number>(),
  profileDetails: {
    display_name: "",
    pronouns: "not_specified",
    bio: "",
  },
  socialLinks: {
    linkedin: "",
    github: "",
    dribbble: "",
    behance: "",
  },
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,

  setInterests: (ids) => set({ interestTagIds: ids }),

  updateProfileDetail: (field, value) =>
    set((state) => ({
      profileDetails: {
        ...state.profileDetails,
        [field]: value,
      },
    })),

  updateSocialLink: (field, value) =>
    set((state) => ({
      socialLinks: {
        ...state.socialLinks,
        [field]: value,
      },
    })),

  resetOnboardingState: () => set(initialState),
}));
