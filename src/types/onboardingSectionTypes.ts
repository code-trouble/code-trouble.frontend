interface ProfileDetails {
  display_name: string;
  pronouns: string;
  bio: string;
}

export interface SocialLinks {
  linkedin: string;
  github: string;
  dribbble: string;
  behance: string;
}

export interface onboardingSectionProps {
  sectionTitle: string;
  sectionDescription: string;
  sectionContent: React.ReactNode;
}

export interface OnboardingState {
  interestTagIds: Set<number>;
  profileDetails: ProfileDetails;
  socialLinks: SocialLinks;

  setInterests: (updateIds: Set<number>) => void;
  updateProfileDetail: (field: keyof ProfileDetails, value: string) => void;
  updateSocialLink: (field: keyof SocialLinks, value: string) => void;

  resetOnboardingState: () => void;
}
