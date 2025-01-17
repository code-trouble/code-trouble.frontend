import React, { useState } from "react";
import code from "../../assets/images/svg/codeLogo.svg"
import codeBlue from "../../assets/images/svg/codeLogoBlue.svg"
import smallCode from "../../assets/images/svg/smCodeLogo.svg"
import smallCodeBlue from "../../assets/images/svg/smCodeLogoBlue.svg"
import lupa from "../../assets/images/svg/lupaGlass.svg"
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
        alt="code-logo"
        />

        <img 
        className="small-logo" 
        src={theme === 'base' ? smallCode : smallCodeBlue} 
        alt="code-logo"
        />
      </div>
      
      <div className="nav-links">
        <span onClick={() => {navigateTo("/")}}>Home</span>
        <span onClick={() => {navigateTo("/blog")}}>Blog</span>
        <span onClick={() => {navigateTo("/questions")}}>Questões</span>
      </div>

      <div className="searchBar">
        <img  src={lupa} alt="lupa"/>
        <input type="text" placeholder="Pesquisar"/>
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
            )}
            {modalType && (
                <AuthModal type={modalType} onClose={handleCloseModal} />
            )}
        </div>

      {/* HAMBURGUER MENU */}
      <div className="burguer-div" onClick={toggleMenu}>
        <img className="hamburger" src={burger} alt="burger menu"/>
      
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
                <img src={closeX} alt="" onClick={toggleMenu} />
              </div>
              <div className="nav-links-column">
                <a className="icon-with-a" href="#">
                  <img src={home} alt="" /> Home
                </a>
                <a className="icon-with-a" href="#">
                  <img src={questions} alt="" /> Perguntas
                </a>
                <a className="icon-with-a" href="#">
                  <img src={blog} alt="" /> Blog
                </a>
                {loggedIn ? (
                  <a className="icon-with-a sair" onClick={handleModalOpen} href="#">
                    <img src={sair} alt="" /> Sair
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
