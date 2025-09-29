import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormData, signInSchema } from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";
import { SignInProps } from "../../../types/authTypes";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { ClipLoader } from "react-spinners";
import { Eye, EyeOff } from "lucide-react";

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

  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

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

          <div className="password-input-wrapper">
            <input
              className="password-input"
              type={visible ? "text" : "password"}
              id="password"
              {...register("password")}
              placeholder="***********"
              disabled={isLoading}
              onKeyDown={handleKeyDown}
              onBlur={() => setCapsLock(false)}
            />
            <button
              type="button"
              className="toggle-password-visibility"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "Esconder senha" : "Mostrar senha"}
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {capsLock && (
            <div className="capslock-indicator">Caps Lock ativado</div>
          )}

          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </section>

        <button className="btn-link" onClick={onForgot} type="button">
          Esqueceu a senha?
        </button>
      </div>

      <button type="submit" className="btn-submit" disabled={isLoading}>
        {isLoading ? (
          <>
            Entrando
            <ClipLoader size={20} color="#ffffff" />
          </>
        ) : (
          "Entrar"
        )}
      </button>
      {authError && <p>{authError}</p>}
    </form>
  );
};
