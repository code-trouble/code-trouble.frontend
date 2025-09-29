import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../../../schema/authSchema";
import { useAuthStore } from "../../../stores/authStore";
import { toast } from "sonner";
import { SingUpProps } from "../../../types/authTypes";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "../../../stores/authModalStore";
import { eyeOff, eyeOn } from "../../../assets/images/svg";

export const SignUp: React.FC<SingUpProps> = () => {
  const { signUp, signIn, isLoading, error: authError } = useAuthStore();
  const { closeModal } = useAuthModalStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState("CapsLock"));
  };

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    try {
      await signUp(data);

      await signIn({
        email: data.email,
        password: data.password,
      });
      closeModal();
      navigate("/onboarding");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message || "Ocorreu um erro desconhecido");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-wrapper">
        <section>
          <label htmlFor="social-name">Username</label>
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
              {visible ? (
                <img src={eyeOff} alt="" />
              ) : (
                <img src={eyeOn} alt="" />
              )}{" "}
            </button>
          </div>
          {capsLock && (
            <div className="capslock-indicator">Caps Lock ativado</div>
          )}
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
