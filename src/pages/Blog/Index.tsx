import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";


export const Blog: React.FC = () => {
    
    return (
        <div className="questions-container">
            <Header theme="blue" loggedIn={false}/>
            <div className="questions-inner-container">
                <div className="questions-area">
                    <div className="questions-title">
                        <h1>Todas as Perguntas</h1>
                        <CustomButton 
                            backgroundColor="#3348A4"
                            color="white"
                            fontWeight="500"
                            fontSize="18px"
                            text="Perguntar"
                            padding="8px 41px"
                        />
                    </div>
                    <div className="category-selection">
                        <a href="#">Novo</a>
                        <a href="#">Top</a>
                        <a href="#">Bounty</a>
                        <a href="#">Semana</a>
                        <a href="#">Mês</a>
                    </div>
                    <div className="questions-list">
                        <h1>WORK IN PROGRESS.</h1>
                    </div>  
                </div>

                <div className="topics-area">
                    <div className="recommended-topics">
                        <h2>Tópicos Recomendados</h2>
                        
                    </div>
                </div>
            </div>
            <Footer customStyle={{bottom: 0}}/>
        </div>
    );
    
};