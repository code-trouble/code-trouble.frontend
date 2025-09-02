import React, { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";
import { SignIn, SignUp, ForgotPassword, RecoveryPassword } from "./Form";
import { logoCodePrimary } from "../../assets/images/svg/icons";
import { ProfessorCorrea } from "../../assets/images/svg/illustration";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "../../stores/authModalStore";

export const AuthModal: React.FC = () => {
  const { type: currentType, closeModal, openModal } = useAuthModalStore();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
    closeModal();
  }

  const handleClose = () => {
    closeModal();
  };

  const renderNames = () => {
    switch (currentType) {
      case "signIn":
        return {
          title: "Login",
          text: "Ainda não possui conta?",
          textDecoration: "Cadastrar",
        };
      case "signUp":
        return {
          title: "Cadastro",
          text: "Já possui uma conta?",
          textDecoration: "Entrar",
        };
      case "forgot":
        return {
          title: "Esqueceu a sua senha?",
          text: "Voltar ao",
          textDecoration: "Login",
        };
      case "recovery":
        return {
          title: "Recuperar senha",
          text: "Voltar ao",
          textDecoration: "Login",
        };
      default:
        return null;
    }
  };

  const renderForm = () => {
    switch (currentType) {
      case "signIn":
        return (
          <SignIn
            onForgot={() => openModal("forgot")}
            onSignInSuccess={() => navigateTo("/questions")}
          />
        );
      case "signUp":
        return <SignUp onSignUpSuccess={() => openModal("signIn")} />;
      case "forgot":
        return <ForgotPassword />;
      case "recovery":
        return <RecoveryPassword />;
      default:
        return <p>Tipo de formulário não selecionado</p>;
    }
  };

  const names = renderNames();
  const nextType = currentType === "signIn" ? "signUp" : "signIn";

  return (
    <div className="overlay" onClick={handleClose}>
      <FocusLock>
        <dialog onClick={(e) => e.stopPropagation()}>
          {windowWidth > 1070 && (
            <figure>
              <img
                className="logo"
                src={logoCodePrimary}
                alt="logo code trouble na cor verde"
              />
              <img
                className="mascote"
                src={ProfessorCorrea}
                alt="avatar do professor Corrêa"
              />
            </figure>
          )}
          <aside>
            <h1 className="modal-title">{names?.title}</h1>
            <main className="form-container">{renderForm()}</main>
            <section>
              <div className="option-container">
                <div className="option-wrapper">
                  <div className="line"></div>
                  <p className="option-text">ou</p>
                  <div className="line"></div>
                </div>
                <p>
                  {names?.text}{" "}
                  <button onClick={() => openModal(nextType)}>
                    {names?.textDecoration}
                  </button>
                </p>
              </div>
            </section>
          </aside>
        </dialog>
      </FocusLock>
    </div>
  );
};
