import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";

export const ForgotPassword: React.FC = () => {
  const { forgotPassword, forgotPasswordSuccess, reset, isLoading, error } =
    useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    if (forgotPasswordSuccess) {
      toast.success("Email enviado com sucesso.");
    }
    if (error) {
      toast.error(error);
    }

    return () => {
      if (forgotPasswordSuccess || error) {
        reset();
      }
    };
  }, [forgotPasswordSuccess, error, reset]);

  const onSubmit = (data: ForgotPasswordFormData) => {
    forgotPassword(data);
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
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </section>
        <p className="info-text">
          {forgotPasswordSuccess
            ? "Se o endereço de email está correto, um link para recuperação foi enviado!"
            : `Enviaremos um e-mail para a recuperação de sua senha.`}
        </p>
      </div>
      <button type="submit" className="btn-submit">
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};
