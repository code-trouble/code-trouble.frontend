import { create } from "zustand";

type ModalType = "signIn" | "signUp" | "recovery" | "forgot";

interface AuthModalState {
  isOpen: boolean;
  type: ModalType | null;
  recoveryToken?: string;

  openModal: (type: ModalType, recoveryToken?: string) => void;
  closeModal: () => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  type: null,
  recoveryToken: undefined,

  openModal: (type, recoveryToken) =>
    set({ isOpen: true, type, recoveryToken }),
  closeModal: () =>
    set({ isOpen: false, type: null, recoveryToken: undefined }),
}));
