import { Header } from "../../components/Header";
import { PostWriter } from "../../components/PostWriter";


export const AskAQuestion: React.FC = () => {
    return (
        <div className="askAquestion-container">
            <Header loggedIn={true} theme="base"/>
            <div className="left-side">
                <h1>Fazer uma pergunta</h1>
                <div className="title-area">
                    <h6>Título</h6>
                    <p>Seja específico e imagine que está fazendo uma pergunta para outra pessoa.</p>
                    <input type="text" placeholder="Ex: Como fazer um Array no javascript" />
                </div>
                <div className="question-details">
                    <h6>Detalhes da pergunta</h6>
                    <p>Introduza o problema e desenvolva o que você colocou no tútulo. Mínimo de 20 caractéres.</p>
                    <PostWriter layout="q&a"/>
                </div>
                <div className="question-details">
                    <h6>Detalhes da pergunta</h6>
                    <p>Introduza o problema e desenvolva o que você colocou no tútulo. Mínimo de 20 caractéres.</p>
                    <PostWriter layout="q&a"/>
                </div>

            </div>
            <div className="right-side">

            </div>
        </div>
    );
};
