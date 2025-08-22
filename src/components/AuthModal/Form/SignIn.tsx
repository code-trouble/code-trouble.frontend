import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "../../../schema/authSchema";
import { SignInProps } from "../../../interfaces/authProps";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";

export const SignIn: React.FC<SignInProps> = ({
  onForgot,
  onSignInSuccess,
}) => {
  const { signIn, isLoading, error, success, reset } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (success) {
      toast.success("Login realizado com sucesso!");
      onSignInSuccess();

      reset();
    }
    if (error) {
      toast.error(error);
      reset();
    }
  }, [success, error, reset, onSignInSuccess]);

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    signIn(data);
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
    </form>
  );
};
