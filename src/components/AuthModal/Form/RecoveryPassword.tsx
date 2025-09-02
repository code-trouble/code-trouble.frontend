import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  RecoveryPasswordFormData,
  recoveryPasswordSchema,
} from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { toast } from "sonner";

export const RecoveryPassword: React.FC = () => {
  const { resetPassword, isLoading, error: authError } = useAuthStore();
  const { recoveryToken, openModal } = useAuthModalStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecoveryPasswordFormData>({
    resolver: zodResolver(recoveryPasswordSchema),
  });

  const onSubmit: SubmitHandler<RecoveryPasswordFormData> = async (data) => {
    if (!recoveryToken) {
      console.error("Token de recuperação não encontrado!");
      toast.error("Token de recuperação não encontrado!");
      return;
    }

    const apiPayload = {
      newPassword: data.newPassword,
      token: recoveryToken,
    };

    try {
      await resetPassword(apiPayload);
      toast.success("Sua senha foi alterada com sucesso!");
      openModal("signIn");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Ocorreu um erro desconhecido");
    }
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        {/* <section>
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
        </section> */}
        <section>
          <label htmlFor="new-password">Nova Senha</label>
          <input
            type="password"
            id="new-password"
            {...register("newPassword")}
            placeholder="***********"
          />
          {errors.newPassword && (
            <p className="error-message">{errors.newPassword.message}</p>
          )}
        </section>
        <section>
          <label htmlFor="confirm-password">Confirme a Senha</label>
          <input
            type="password"
            id="confirm-password"
            {...register("confirmPassword")}
            placeholder="***********"
          />
          {errors.confirmPassword && (
            <p className="error-message">{errors.confirmPassword.message}</p>
          )}
        </section>
      </div>
      <button type="submit" className="btn-submit">
        {isLoading ? "Enviando. . ." : "Enviar"}
        {authError && <p>{authError}</p>}
      </button>
    </form>
  );
};
