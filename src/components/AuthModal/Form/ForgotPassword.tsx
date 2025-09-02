import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";

export const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormData> = async (data) => {
    try {
      await forgotPassword(data);
      toast.success("Email enviado com sucesso.");
      setIsSubmitted(true);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Ocorreu um erro desconhecido");
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
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </section>
        <p className="info-text">
          {isSubmitted
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
