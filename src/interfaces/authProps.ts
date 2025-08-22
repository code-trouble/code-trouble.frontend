import { SignInFormData, SignUpFormData } from "../schema/authSchema";

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;

  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (data: SignInFormData) => Promise<void>;
  reset: () => void;

  setToken: (t: string | null) => void;
  hydrateFromStorage: () => void;
  logout: () => void;
}

export interface SingUpProps {
  onSignUpSuccess: () => void;
}

export interface SignInProps {
  onSignInSuccess: () => void;
  onForgot: () => void;
}
