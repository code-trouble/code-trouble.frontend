import React, { useState } from "react";
import code from "../../assets/images/svg/codeLogo.svg"
import codeBlue from "../../assets/images/svg/codeLogoBlue.svg"
import smallCode from "../../assets/images/svg/smCodeLogo.svg"
import smallCodeBlue from "../../assets/images/svg/smCodeLogoBlue.svg"
import burger from "../../assets/images/svg/burgerMenu.svg"
import closeX from "../../assets/images/svg/closeMenu.svg"
import home from "../../assets/images/svg/home.svg"
import questions from "../../assets/images/svg/questions.svg"
import notifications from "../../assets/images/svg/notifications.svg"
import blog from "../../assets/images/svg/blog.svg"
import sair from "../../assets/images/svg/sair.svg"
import { Avatar } from "../Avatar";
import { AuthModal } from "../AuthModal";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./searchbar";
import { makeElementAccessible } from "../../utils/makeElementAccessible"; // 👈 adicionado

interface IHeader {
  theme?: 'base' | 'blue';
  loggedIn?: boolean;
}

export const Header: React.FC<IHeader> = ({theme, loggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<null | 'signIn' | 'signUp'>(null);

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setModalType(null);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleModalOpen = () => setIsModalOpen(true);

  function navigateTo(path: string) {
    window.scrollTo(0, 0); 
    navigate(path);
  }

  return (
    <header className="header-container">
      <div className="logo-container"  style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
        <img 
          className="normal-logo" 
          src={theme === 'base' ? code : codeBlue} 
          alt="navbar Code Trouble logo"
        />

        <img 
          className="small-logo" 
          src={theme === 'base' ? smallCode : smallCodeBlue} 
          alt="navbar Code Trouble logo"
        />
      </div>
      
      <div className="nav-links">
        <span {...makeElementAccessible(() => {navigateTo("/")})}>Home</span>
        <span {...makeElementAccessible(() => {navigateTo("/blog")})}>Blog</span>
        <span {...makeElementAccessible(() => {navigateTo("/questions")})}>Questões</span>
      </div>

      <div className="searchBar">
        <SearchBar />
      </div>
    
      <div>
        {loggedIn ? (
          <div className="loggedInContent">
            <Avatar sizes="medium" />
            <img className="NotificationBell" src={notifications} />
          </div>
        ) : (
          <div className="authButtons">
            <button
              className={theme === 'base' ? "login" : "loginBlue"}
              {...makeElementAccessible(() => setModalType('signIn'), 'button')}
            >
              Login
            </button>
            <button
              className={theme === 'base' ? "cadastro" : "cadastroBlue"}
              {...makeElementAccessible(() => setModalType('signUp'), 'button')}
            >
              Cadastro
            </button>
          </div>
        )}
        {modalType && (
          <AuthModal type={modalType} onClose={handleCloseModal} />
        )}
      </div>

      {/* HAMBURGUER MENU */}
      <div className="burguer-div"  {...makeElementAccessible(toggleMenu, 'button')}>
        <img className="hamburger" src={burger} alt="hamburger menu"/>
      
        {menuOpen && (
          <>
            <div
              className={`background-overlay ${menuOpen ? "visible" : ""}`}
              onClick={toggleMenu}
            ></div>
            <div className={`hamburger-menu ${menuOpen ? "open" : ""}`} onClick={(e) => e.stopPropagation()}>
              <div className="auth-buttons">
              {loggedIn ? (
                <div className="BurgerloggedInContent">
                  <Avatar sizes="medium"/>
                  <div className="burgerLoggedText">
                    <h1>Joana Lima</h1> 
                    <p className={theme === 'base' ? "verPerfil" : "verPerfilBlue"}>Ver Perfil</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="auth-col">
                    <button
                      className={theme === 'base' ? "login" : "loginBlue"}
                      onClick={() => setModalType('signIn')}
                    >
                      Login
                    </button>
                    <button
                      className={theme === 'base' ? "cadastro" : "cadastroBlue"}
                      onClick={() => setModalType('signUp')}
                    >
                      Cadastro
                    </button>
                  </div>
                  {modalType && (
                    <AuthModal type={modalType} onClose={handleCloseModal} />
                  )}
                </div>
              )}
                <img
                  src={closeX}
                  alt="close hamburguer menu"
                  {...makeElementAccessible(toggleMenu, "button")}
                />

              </div>
              <div className="nav-links-column">
                <span className="icon-with-a" {...makeElementAccessible(() => {navigateTo("/")})}>
                  <img src={home} alt="navigate to the home page" /> Home
                </span>
                <span className="icon-with-a" {...makeElementAccessible(() => {navigateTo("/questions")})}>
                  <img src={questions} alt="navigate to the questions page" /> Perguntas
                </span>
                <span className="icon-with-a" {...makeElementAccessible(() => {navigateTo("/blog")})}>
                  <img src={blog} alt="navigate to the blog page" /> Blog
                </span>
                {loggedIn ? (
                  <a className="icon-with-a sair" onClick={handleModalOpen} href="#">
                    <img src={sair} alt="log off the account" /> Sair
                  </a>
                ): ( 
                  ""
                )}
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h2 className="modal-title-content">Deseja sair?</h2>
                      <p className="modal-text-content">Para voltar a postar no blog ou escrever perguntas e respostas, você precisará entrar novamente.</p>
                      <div className="modal-buttons">
                        <button className="voltar-button" onClick={() => setIsModalOpen(false)}>
                          Voltar
                        </button>
                        <button className="sair-button">
                          Sair
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
