import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";
import { SingUpProps } from "../../../types/authTypes";

export const SignUp: React.FC<SingUpProps> = ({ onSignUpSuccess }) => {
  const { signUp, isLoading, error, success, reset } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (success) {
      toast.success("Cadastro realizado com sucesso!");
      onSignUpSuccess();

      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [success, error, reset, onSignUpSuccess]);

  const onSubmit = (data: SignUpFormData) => {
    signUp(data);
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
      </button>
    </form>
  );
};
