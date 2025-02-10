import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { Tag } from "../../components/Tag";


export const Blog: React.FC = () => {
    
    const tags = ["Design", "Programação", "Arte", "Ciência de Dados", "Tecnologia"];


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
                    <div className="category-selection-blue">
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

                <div className="right-side">
                    <div className="community-choices">
                        <h2>Escolhas da Comunidade</h2>
                    </div>

                    <div className="topics-area">
                        <div className="recommended-topics">
                            <h2>Tópicos Recomendados</h2>
                            <div className="tag-group">
                                <Tag tags={tags} />
                            </div>
                            <span>Ver mais tópicos</span>
                        </div>
                    </div>

                    <div className="who-to-follow">
                        <h2>Quem Seguir</h2>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
    
};