import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";
import { SignInProps } from "../../../types/authTypes";
import { useAuthModalStore } from "../../../stores/authModalStore";

export const SignIn: React.FC<SignInProps> = ({ onForgot }) => {
  const { signIn, isLoading, error: authError } = useAuthStore();
  const { closeModal } = useAuthModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await signIn(data);
      toast.success("Login realizado com sucesso!");
      closeModal();
    } catch (err: any) {
      console.log(err);
      toast.error("Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <section>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="Digite seu email"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </section>
        <section>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="***********"
            disabled={isLoading}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </section>
        <button className="btn-link" onClick={onForgot} type="button">
          Esqueceu a senha?
        </button>
      </div>
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? "Entrando. . ." : "Entrar"}
      </button>
      {authError && <p>{authError}</p>}
    </form>
  );
};
