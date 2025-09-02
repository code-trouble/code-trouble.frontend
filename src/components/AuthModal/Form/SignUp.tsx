import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";
import { SingUpProps } from "../../../types/authTypes";

export const SignUp: React.FC<SingUpProps> = ({ onSignUpSuccess }) => {
  const { signUp, isLoading, error: authError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await signUp(data);
      toast.success("Cadastro realizado com sucesso!");
      onSignUpSuccess();
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Ocorreu um erro desconhecido");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <section>
          <label htmlFor="social-name">Nome Social/Username</label>
          <input
            type="text"
            id="social-name"
            {...register("username")}
            placeholder="Digite seu nome"
            disabled={isLoading}
          />
          {errors.username && (
            <p className="error-message">{errors.username?.message}</p>
          )}
        </section>
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
      </div>
      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
        {authError && <p>{authError}</p>}
      </button>
    </form>
  );
};
