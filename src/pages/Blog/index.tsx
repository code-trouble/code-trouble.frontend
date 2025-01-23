import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";


export const Blog: React.FC = () => {
    
    return (
        <div className="blog-container">
            <Header theme="blue" loggedIn={false}/>
            <div className="blog-inner-container">
                <div className="blog-area">
                    <div className="blog-title">
                        <h1>Todos os Posts</h1>
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
                        <a href="#">Para Você</a>
                        <a href="#">Seguindo</a>
                        <a href="#">Design</a>
                        <a href="#">Desenvolvimento</a>
                        <a href="#">UX</a>
                        <a href="#">UI</a>
                    </div>
                    <div className="blog-list">
                        
                    </div>  
                </div>

                <div className="topics-area">
                    <div className="recommended-topics">
                        <h2>Tópicos Recomendados</h2>
                        
                    </div>
                </div>
            </div>
            <Footer customStyle={{bottom: 0, position: "fixed"}}/>
        </div>
    );
    
};