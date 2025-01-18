import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import { Tag } from "../../components/Tag";

import filterSettings from "../../assets/images/svg/filterSettings.svg";


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
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-checkbox-list">
                                <p>Filtrar por</p>
                                <div className="inputs">
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Sem respostas</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox"/>
                                        <label>Sem resposta aceitada</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Com Bounty</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-checkbox-list">
                                <p>Classificado por</p>
                                <div className="inputs secondCol">
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Mais recentes</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Atividade Recente</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Mais respostas</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Bounty prestes á expirar</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-checkbox-list">
                                <p>Classificado por</p>
                                <div className="inputs">
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>Minhas Tags seguidas</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="checkbox" />
                                        <label>As seguintes Tags</label>
                                    </div>
                                    <div className="checkbox-div">
                                        <input type="text" placeholder="ex; javascript, python, sql....." />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="modal-buttons">
                                <CustomButton 
                                    backgroundColor="#3348A4"
                                    color="#FAFCFE"
                                    fontWeight="400"
                                    fontSize="16px"
                                    text="Aplicar Filtro"
                                    padding="8px 12.5px"
                                />
                                <CustomButton 
                                    backgroundColor="white"
                                    color="#3348A4"
                                    fontWeight="400"
                                    fontSize="16px"
                                    text="Salvar filtro customizado"
                                    padding="8px 12.5px"
                                    border="1px solid #3348A4"
                                />
                            </div>
                                <CustomButton 
                                    backgroundColor="transparent"
                                    color="#BA2D2F"
                                    fontWeight="400"
                                    fontSize="16px"
                                    text="Cancelar"
                                />
                        </div>
                    </div>    
                </div>
            )}
        </div>
    );
    
};