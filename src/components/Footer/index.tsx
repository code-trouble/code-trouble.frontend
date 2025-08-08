import React from "react";
import {
  discord,
  email,
  github,
  instagram,
  linkedIn,
  logoCodePrimaryFull,
  whatsApp,
} from "../../assets/images/svg/icons";
import { useNavigate } from "react-router-dom";
import { makeElementAccessible } from "../../utils/makeElementAccessible";

interface IFooter {
  customStyle?: React.CSSProperties;
}

export const Footer: React.FC<IFooter> = ({ customStyle }) => {
  const navigate = useNavigate();

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  return (
    <footer className="footer-container" style={customStyle}>
      <img className="footer-logo" src={logoCodePrimaryFull} alt="logo da code trouble completo" />
      <main>
        <nav className="exploreNav">
          <h1>Explore</h1>
          <span {...makeElementAccessible(() => navigateTo("/"))}>Home</span>
          <span {...makeElementAccessible(() => navigateTo("/blog"))}>Blog</span>
          <span {...makeElementAccessible(() => navigateTo("/questions"))}>Questões</span>
        </nav>

        <section className="contactSection">
          <nav className="contactNav">
            <h1>Entre em Contato</h1>
            <a href="">
              <img src={whatsApp} alt="logo do whatsapp" />
              <p>(11) 9 4996-3686</p>
            </a>
            <a href="">
              <img src={email} alt="icone de mensagem email" />
              <p>suportededomingo@outlook.com</p>
            </a>
          </nav>

          <nav className="lowerContactNav">
            <h1>Nossas Redes & Comunidades</h1>
            <div className="social-medias">
              <a href="">
                <img src={discord} alt="logo do discord" />
              </a>
              <a href="">
                <img src={github} alt="logo do github" />
              </a>
              <a href="">
                <img src={instagram} alt="logo do instagram" />
              </a>
              <a href="">
                <img src={linkedIn} alt="logo do linkedIn" />
              </a>
            </div>
          </nav>
        </section>

        <div className="footer-contact">
          <div className="updatesText">
            <h1>Receba Atualizações</h1>
            <p>Se Inscreva na nossa NewsLetter.</p>
          </div>
          <form className="footer-messageForm">
            <input className="footerInput" placeholder="Digite seu email" type="email" />
            <button type="submit">Registrar-se</button>
          </form>
        </div>
      </main>

      <div className="footer-bottom">
        <p>
          <span>© 2024.</span> All Rights Reserved.
        </p>
        <p>
          Designed By <span>Suporte de Domingo</span>
        </p>
      </div>
    </footer>
  );
};
