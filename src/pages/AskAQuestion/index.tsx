import { AltPostWriter } from "../../components/AltPostWriter";
import CustomButton from "../../components/CustomButton";
import { Header } from "../../components/Header";


export const AskAQuestion: React.FC = () => {
    return (
        <div className="askAquestion-container">
            <Header loggedIn={true} theme="base"/>
            <div className="askAquestion-wrapper">
                <div className="left-side">
                    <h1>Fazer uma pergunta</h1>
                    <div className="title-area">
                        <h6>Título</h6>
                        <p>Seja específico e imagine que está fazendo uma pergunta para outra pessoa.</p>
                        <input className="input-area" type="text" placeholder="Ex: Como fazer um Array no javascript" />
                    </div>
                    <div className="question-details">
                        <h6>Detalhes da pergunta</h6>
                        <p>Introduza o problema e desenvolva o que você colocou no tútulo. Mínimo de 20 caractéres.</p>
                        <AltPostWriter/>
                    </div>
                    <div className="question-details">
                        <h6>O que você já tentou e o que estava esperando que acontecesse?</h6>
                        <p>Descreva o que voce tentou, o que era para acontecer e o que realmente aconteceu (como o erro, por exemplo). Mínimo de 20 caractéres.</p>
                        <AltPostWriter/>
                    </div>
                    <div className="tag-area">
                        <h6>Tags</h6>
                        <p>Adicione até 5 tags para descrever sobre o que sua pergunta é.</p>
                        <input className="input-area" type="text" placeholder="Ex: javascript, array, front-end, etc" />
                    </div>
                    <div className="revision-message">
                        <p>Antes de postar a sua pergunta, faça uma revisão final.</p>
                    </div>
                    <div className="submit-question">
                        <CustomButton 
                                    text="Poste sua pergunta"
                                    padding="10px 24px"
                                    backgroundColor="#2DBA4F"
                                    color="white"
                                    fontSize="18px"
                                    fontWeight="500"
                                    borderRadius="8px"/>
                        <CustomButton text="Descartar pergunta" color="#BA2D2F"/>
                    </div>

                </div>
                <div className="right-side">
                    <div className="message-box">
                        <h1>Como escrever uma boa pergunta</h1>
                        <p>Você precisa perguntar algo? Esse formulário irá te ajudar durante o processo.</p>
                        
                    </div>
                </div>
            </div>
        </div>

    );
};

