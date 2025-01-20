import React from "react";
import CustomButton from "../CustomButton";


interface IQuestionsFilterModal {
    onClick: () => void;
}

export const QuestionsFilterModal: React.FC<IQuestionsFilterModal> = ({onClick}) => {
    return (
                <div className="modal-overlay" onClick={onClick}>
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

  );
};
