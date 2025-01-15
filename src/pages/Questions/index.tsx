import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";


export const Questions: React.FC = () => {
    
    return (
        <div className="questions-container">
            <Header theme="base" loggedIn={true}/>
            <div className="questions-inner-container">
                <div className="questions-area">
                    <div className="questions-title">
                        <h1>Todas as Perguntas</h1>
                        <CustomButton 
                            backgroundColor="#2DBA4F"
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
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
                        <QuestionsPreview/>
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