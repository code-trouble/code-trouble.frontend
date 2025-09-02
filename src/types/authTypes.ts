import {
  ForgotPasswordFormData,
  RecoveryPasswordAPIData,
  SignInFormData,
  SignUpFormData,
} from "../schema/authSchema";

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  token: string | null;

  signUp: (data: SignUpFormData) => Promise<void>;
  signIn: (data: SignInFormData) => Promise<void>;
  forgotPassword: (data: ForgotPasswordFormData) => Promise<void>;
  resetPassword: (data: RecoveryPasswordAPIData) => Promise<void>;

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
