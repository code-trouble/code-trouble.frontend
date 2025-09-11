import React, { useEffect, useRef, useState } from "react";
import { Avatar } from "../Avatar";
import { AuthModal } from "../AuthModal";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./searchbar";
import { makeElementAccessible } from "../../utils/makeElementAccessible";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "sonner";
import { useUserStore } from "../../stores/userStore";
import { useAuthModalStore } from "../../stores/authModalStore";
import {
  CodeLogo,
  CodeLogoBlue,
  SmCodeLogoBlue,
  SmCodeLogo,
  CloseMenu,
  BurgerMenu,
  Home,
  Notifications,
  Questions,
  Blog,
  Sair,
} from "../../assets/images/svg";

interface IHeader {
  theme?: "base" | "blue";
}

export const Header: React.FC<IHeader> = ({ theme }) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const loggedIn = !!currentUser;

  const { logout } = useAuthStore();
  const { isOpen, openModal } = useAuthModalStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const handleModalOpen = () => setIsModalOpen(true);

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  return (
    <header className="header-container">
      <div
        className="logo-container"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <img
          className="normal-logo"
          src={theme === "base" ? CodeLogo : CodeLogoBlue}
          alt="navbar Code Trouble logo"
        />

        <img
          className="small-logo"
          src={theme === "base" ? SmCodeLogo : SmCodeLogoBlue}
          alt="navbar Code Trouble logo"
        />
      </div>

      <div className="nav-links">
        <span
          {...makeElementAccessible(() => {
            navigateTo("/");
          })}
        >
          Home
        </span>
        <span
          {...makeElementAccessible(() => {
            navigateTo("/blog");
          })}
        >
          Blog
        </span>
        <span
          {...makeElementAccessible(() => {
            navigateTo("/questions");
          })}
        >
          Questões
        </span>
      </div>

      <div className="searchBar">
        <SearchBar />
      </div>

      <div>
        {loggedIn ? (
          <div className="loggedInContent">
            <button
              className="AvatarButton"
              aria-haspopup="menu"
              aria-expanded={userMenuOpen}
              onClick={() => setUserMenuOpen((v) => !v)}
            >
              <Avatar src={currentUser?.avatarUrl as string} sizes="medium" />
            </button>
            <img className="NotificationBell" src={Notifications} />
            {userMenuOpen && (
              <div className="UserDropdown" role="menu">
                <button
                  className="UserDropdownItem"
                  onClick={() => {
                    setUserMenuOpen(false);
                    navigate(`/${currentUser.username}`);
                  }}
                >
                  Ver Perfil
                </button>
                <button
                  className="UserDropdownItem"
                  onClick={() => {
                    setUserMenuOpen(false);
                    setIsModalOpen(true);
                    logout();
                    toast.message("Logout realizado.");
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="authButtons">
            <button
              className={theme === "base" ? "login" : "loginBlue"}
              {...makeElementAccessible(() => openModal("signIn"), "button")}
            >
              Login
            </button>
            <button
              className={theme === "base" ? "cadastro" : "cadastroBlue"}
              {...makeElementAccessible(() => openModal("signUp"), "button")}
            >
              Cadastro
            </button>
          </div>
        )}
        {isOpen && <AuthModal />}
      </div>

      {/* HAMBURGUER MENU */}
      <div
        className="burguer-div"
        {...makeElementAccessible(toggleMenu, "button")}
      >
        <img className="hamburger" src={BurgerMenu} alt="hamburger menu" />

        {menuOpen && (
          <>
            <div
              className={`background-overlay ${menuOpen ? "visible" : ""}`}
              onClick={toggleMenu}
            ></div>
            <div
              className={`hamburger-menu ${menuOpen ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="auth-buttons">
                {loggedIn ? (
                  <div className="BurgerloggedInContent">
                    <Avatar sizes="medium" />
                    <div className="burgerLoggedText">
                      <h1>Joana Lima</h1>
                      <p
                        className={
                          theme === "base" ? "verPerfil" : "verPerfilBlue"
                        }
                      >
                        Ver Perfil
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="auth-col">
                      <button
                        className={theme === "base" ? "login" : "loginBlue"}
                        onClick={() => openModal("signIn")}
                      >
                        Login
                      </button>
                      <button
                        className={
                          theme === "base" ? "cadastro" : "cadastroBlue"
                        }
                        onClick={() => openModal("signUp")}
                      >
                        Cadastro
                      </button>
                    </div>
                    {isOpen && <AuthModal />}
                  </div>
                )}
                <img
                  src={CloseMenu}
                  alt="close hamburguer menu"
                  {...makeElementAccessible(toggleMenu, "button")}
                />
              </div>
              <div className="nav-links-column">
                <span
                  className="icon-with-a"
                  {...makeElementAccessible(() => {
                    navigateTo("/");
                  })}
                >
                  <img src={Home} alt="navigate to the home page" /> Home
                </span>
                <span
                  className="icon-with-a"
                  {...makeElementAccessible(() => {
                    navigateTo("/questions");
                  })}
                >
                  <img src={Questions} alt="navigate to the questions page" />{" "}
                  Perguntas
                </span>
                <span
                  className="icon-with-a"
                  {...makeElementAccessible(() => {
                    navigateTo("/blog");
                  })}
                >
                  <img src={Blog} alt="navigate to the blog page" /> Blog
                </span>
                {loggedIn ? (
                  <a
                    className="icon-with-a sair"
                    onClick={() => handleModalOpen()}
                    href="#"
                  >
                    <img src={Sair} alt="log off the account" /> Sair
                  </a>
                ) : (
                  ""
                )}
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h2 className="modal-title-content">Deseja sair?</h2>
                      <p className="modal-text-content">
                        Para voltar a postar no blog ou escrever perguntas e
                        respostas, você precisará entrar novamente.
                      </p>
                      <div className="modal-buttons">
                        <button
                          className="voltar-button"
                          onClick={() => setIsModalOpen(false)}
                        >
                          Voltar
                        </button>
                        <button
                          className="sair-button"
                          onClick={() => {
                            logout();
                            setIsModalOpen(false);
                            toast.message("Logout realizado.");
                          }}
                        >
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
