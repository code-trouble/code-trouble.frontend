import { z } from "zod";

const emailValidation = z
  .string()
  .email("Email inválido")
  .refine((email) => {
    const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/;
    return strictEmailRegex.test(email);
  }, "Formato de email inválido");

export const signUpSchema = z.object({
  username: z.string().min(5, "O nome deve ter ao menos 5 caracteres"),
  email: emailValidation,
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export const signInSchema = z.object({
  email: emailValidation,
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export const forgotPasswordSchema = z.object({
  email: emailValidation,
});

export const recoveryPasswordSchema = z
  .object({
    email: emailValidation,
    newPassword: z
      .string()
      .min(8, "A nova senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "A confirmação da senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type RecoveryPasswordFormData = z.infer<typeof recoveryPasswordSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
