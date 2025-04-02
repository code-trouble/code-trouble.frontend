import React, { useState } from "react";
import { Header } from "../../components/Header";
import messageBox from "../../assets/images/svg/messageBox.svg"
import CustomButton from "../../components/CustomButton";
import buttonArrow from "../../assets/images/svg/buttonArrow.svg"
import { StackedCards } from "../../components/StackedCards";
import { Footer } from "../../components/Footer";
import { AuthModal } from "../../components/AuthModal";
import { useNavigate } from "react-router-dom";


export const LandingPage: React.FC = () => {
  const [modalType, setModalType] = useState<null | "signIn" | "signUp">(null);

  const navigate = useNavigate();

  const handleOpenModal = (type: "signIn" | "signUp") => {
    setModalType(type);
  };

  const handleCloseModal = () => {
    setModalType(null);
  };



  return (
    <div className="landing-page-container">
        <Header theme="base" loggedIn={false}/>
        <div className="landingContainer">
          <div className="upperHero">
            <div className="">
              <div className="heroTextContent">
                <h1 className="heroTextH1">Todo <span className="green-middle-line">Dev precisa</span> de ajuda de vez em quando.</h1>
                <p className="heroTextPItalic">Na sua máquina não funciona?</p>
                <p className="heroTextP">Aqui é o lugar certo pra trocar ideia, fazer perguntas, buscar soluções e
                  desbravar código com a galera
                </p>
              </div>
              <div className="customButtonWrapper">
                <CustomButton  
                  text="Cadastro"
                  backgroundColor="#2DBA4F"  
                  padding="8px 90px"
                  color="white"
                  fontSize="18px"
                  fontWeight="500"
                  onClick={() => handleOpenModal("signUp")}
                  customId="CadastroButton"
                />
                <CustomButton 
                  text="Visitar a comunidade"
                  backgroundColor="transparent"  
                  padding="9.5px 0px"
                  color="#3348A4"
                  fontSize="16px"
                  fontWeight="400"
                  icon={buttonArrow}
                  customId="VisitarComunidade"
                />

              </div>
            </div>
            <div className="messageBox">
              <img src={messageBox} alt="chatting bubble image"/>
            </div>
          </div>

          <div className="lowerHero">
            <div className="StackCardBlock">
              <StackedCards/>
            </div>

            <div className="lowerHeroRigthText">
              <div className="lowerHeroTextContent">
                <h1 className="lowerHeroH1">Conheça nosso blog, feito por <span className="dev-blue-line">Devs</span> para <span className="dev-blue-line">Devs</span></h1>
                <p className="lowerHeroPItalic">Leia artigos da sua área de interesse.</p>
                <p className="lowerHeroP">Os melhores artigos vão além das respostas, guiando você em cada descoberta</p>
              </div>
              <div className="lowerCustomButton">
                <CustomButton
                  text="Visitar Blog"
                  backgroundColor="#3348A4"  
                  padding="8px 80px"
                  color="white"
                  fontSize="18px"
                  fontWeight="500"
                  customId="VisitarBlog"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/blog");
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {modalType && <AuthModal type={modalType} onClose={handleCloseModal} />}
        <Footer/>
    </div>
  );
};
