import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import { Tag } from "../../components/Tag";
import filterSettings from "../../assets/images/svg/filterSettings.svg";
import { QuestionsFilterModal } from "../../components/QuestionsFilterModal";


const tags = ["Design", "Programação", "Arte", "Ciência de Dados", "Tecnologia"]

export const Questions: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    };
    
    return (
        <div className="questions-container">
            <Header theme="base" loggedIn={false}/>
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
                        <QuestionsPreview
                            questionTitle="Sphinx PDF build failing on reathedocs for Russian translation"
                            questionDescription="PDF build of Sphinx’s own documentation are failing for Russian translation (example build). .readthedocs.yml is set to vuild HTML and then PDFm and its in the second step the failure arises lorem ipsum dolor sit amet lorem ipsum dolor adsasdasd  "
                        />
                        <QuestionsPreview
                            questionTitle="Inconsistent results between custom function using terra and a simplified version to calculate global statistic of a raster"
                            questionDescription="I am running an access poverty analysis on a raster of travel times. Using a slightly altered version of the Fpster-Greer-Throbecke ondex woth exponent Alpha = 0, the following equality holds: here lorem ipsum dolor sit amet lorem ipsum dolor sit amet"
                        />
                        <QuestionsPreview
                            questionTitle="How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)"
                            questionDescription="How can i intercept (and modify) outgoing Sql statements using Quarkus and Hivernate Reactive? I tried to do so bby implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                        />
                        <QuestionsPreview
                            questionTitle="How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)"
                            questionDescription="How can i intercept (and modify) outgoing Sql statements using Quarkus and Hivernate Reactive? I tried to do so bby implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                        />
                        <QuestionsPreview
                            questionTitle="How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)"
                            questionDescription="How can i intercept (and modify) outgoing Sql statements using Quarkus and Hivernate Reactive? I tried to do so bby implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                        />
                        <QuestionsPreview
                            questionTitle="How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)"
                            questionDescription="How can i intercept (and modify) outgoing Sql statements using Quarkus and Hivernate Reactive? I tried to do so bby implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit ametlorem ipsum dolor sit amet"
                        />
                    </div>  
                </div>
                <div className="right-side">
                    <div className="topics-area">
                        <div className="recommended-topics">
                            <h2>Tópicos Recomendados</h2>
                            <div className="tag-group">
                                <Tag tags={tags} />
                            </div>
                            <span>Ver mais tópicos</span>
                        </div>
                    </div>
                    <div className="custom-filters">
                        <h2>Filtros Customizados</h2>
                        <span onClick={toggleModal}>
                            <img src={filterSettings} alt="filter settings icon"/>
                            Criar Filtro Customizado
                        </span>
                    </div>
                </div>
            </div>
            <Footer customStyle={{bottom: 0}}/>
            {isModalOpen && (
                <QuestionsFilterModal onClick={toggleModal}/>
            )}
        </div>
    );
    
};