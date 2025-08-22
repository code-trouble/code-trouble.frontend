import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(5, "O nome deve ter ao menos 5 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const recoveryPasswordSchema = z
  .object({
    email: z.string().email("Email inválido"),
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A confirmação da senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"], // Aponta o erro para o campo `confirmPassword`
  });

export type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
