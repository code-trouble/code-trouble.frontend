import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AltPostWriter } from "../../components/AltPostWriter";
import CustomButton from "../../components/CustomButton";
import correa from "../../assets/images/svg/mascote sp 1.svg";
import { TagSelector } from "../../components/TagSelector";
import { usePostStore } from "../../stores/postStore";

export const AskAQuestion: React.FC = () => {
  const navigate = useNavigate();
  const {
    createPost,
    setTitle: setStoreTitle,
    setBody,
    setKind,
    isLoading,
    error,
    reset,
  } = usePostStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState({});
  const [details, setDetails] = useState({});
  const [tags, setTags] = useState<string[]>([]);

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Combine description and details into a single body
    const combinedBody = {
      description,
      details,
      tags,
    };

    try {
      // Set the store values first
      setStoreTitle(title);
      setBody(combinedBody);
      setKind("question");

      // Then create the post (no arguments needed)
      const newPost = await createPost();

      // Reset form and store
      setTitle("");
      setDescription({});
      setDetails({});
      setTags([]);
      reset();

      navigateTo(`/questions/${newPost.id}`);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  }

  function handleDiscard() {
    // Reset form state
    setTitle("");
    setDescription({});
    setDetails({});
    setTags([]);
    reset();

    navigateTo("/questions");
  }

  return (
    <div className="askAquestion-container">
      <form onSubmit={handleSubmit} className="askAquestion-wrapper">
        <div className="left-side">
          <h1>Fazer uma pergunta</h1>
          <div className="message-box">
            <h1>Como escrever uma boa pergunta</h1>
            <p>
              Você precisa perguntar algo? Esse formulário irá te ajudar durante
              o processo.
            </p>
            <ul>
              <span className="tittle-span">Passos a se seguir:</span>
              <li>
                Resuma sua questão em um título curto, que retrate bem o que
                precisa.
              </li>
              <li>Descreva seu problema com mais detalhes.</li>
              <li>
                Descreva o que você já tentou e o que espera que aconteça.
              </li>
              <li>
                Adicione <span>tags</span> para que sua pergunta seja entregue
                para os membros certos da comunidade.
              </li>
              <li>Revise sua pergunta antes de postar.</li>
              <li>E pronto, agora só postar!</li>
            </ul>
          </div>
          <div className="title-area">
            <h6>Título</h6>
            <p>
              Seja específico e imagine que está fazendo uma pergunta para outra
              pessoa.
            </p>
            <input
              className="input-area"
              type="text"
              placeholder="Ex: Como fazer um Array no javascript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="message-box second-box">
            <h1>Escrevendo um bom título</h1>
            <div className="imageMessage-box">
              <img src={correa} alt="profile image for the information area" />
              <div className="text-div">
                <p>O título da sua pergunta deve resumir bem o seu problema.</p>
                <p>
                  Lembre-se sempre de usar palavras-chave, para a sua pergunta
                  ter mais chance de aparecer em pesquisas dos usuários.
                </p>
              </div>
            </div>
          </div>
          <div className="question-details">
            <h6>Detalhes da pergunta</h6>
            <p>
              Introduza o problema e desenvolva o que você colocou no título.
              Mínimo de 20 caracteres.
            </p>
            <AltPostWriter value={description} onChange={setDescription} />
          </div>
          <div className="question-details">
            <h6>
              O que você já tentou e o que estava esperando que acontecesse?
            </h6>
            <p>
              Descreva o que você tentou, o que era para acontecer e o que
              realmente aconteceu (como o erro, por exemplo). Mínimo de 20
              caracteres.
            </p>
            <AltPostWriter value={details} onChange={setDetails} />
          </div>
          <div className="message-box second-box">
            <h1>Revise antes de postar</h1>
            <div className="imageMessage-box">
              <img src={correa} alt="profile image for the information area" />
              <div className="text-div">
                <p>
                  Agora que está pronto para postar sua pergunta, releia do
                  começo ao fim. Ela faz sentido?
                </p>
                <p>
                  Adicione quaisquer detalhes que possa ter esquecido e releia
                  novamente. Agora é um bom momento for ter certeza de que o
                  título ainda descreve bem o seu problema.
                </p>
              </div>
            </div>
          </div>
          <div className="tag-area">
            <h6>Tags</h6>
            <p>
              Adicione até 5 tags para descrever sobre o que sua pergunta é.
            </p>
            <TagSelector selectedTags={tags} onChange={setTags} />
          </div>
          <div className="revision-message">
            <p>Antes de postar a sua pergunta, faça uma revisão final.</p>
          </div>

          {error && (
            <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
          )}

          <div className="submit-question">
            <CustomButton
              text={isLoading ? "Enviando..." : "Poste sua pergunta"}
              type="submit"
              padding="10px 24px"
              backgroundColor="#2DBA4F"
              color="white"
              fontSize="18px"
              fontWeight="500"
              borderRadius="8px"
              customId="posteButton"
              disabled={isLoading}
            />
            <CustomButton
              text="Descartar pergunta"
              color="#BA2D2F"
              onClick={handleDiscard}
            />
          </div>
        </div>
        <div className="right-side">
          <div className="message-box">
            <h1>Como escrever uma boa pergunta</h1>
            <p>
              Você precisa perguntar algo? Esse formulário irá te ajudar durante
              o processo.
            </p>
            <ul>
              <span className="tittle-span">Passos a se seguir:</span>
              <li>
                Resuma sua questão em um título curto, que retrate bem o que
                precisa.
              </li>
              <li>Descreva seu problema com mais detalhes.</li>
              <li>
                Descreva o que você já tentou e o que espera que aconteça.
              </li>
              <li>
                Adicione <span>tags</span> para que sua pergunta seja entregue
                para os membros certos da comunidade.
              </li>
              <li>Revise sua pergunta antes de postar.</li>
              <li>E pronto, agora só postar!</li>
            </ul>
          </div>
          <div className="message-box second-box">
            <h1>Escrevendo um bom título</h1>
            <div className="imageMessage-box">
              <img src={correa} alt="profile image for the information area" />
              <div className="text-div">
                <p>O título da sua pergunta deve resumir bem o seu problema.</p>
                <p>
                  Lembre-se sempre de usar palavras-chave, para a sua pergunta
                  ter mais chance de aparecer em pesquisas dos usuários.
                </p>
              </div>
            </div>
          </div>
          <div className="message-box second-box">
            <h1>Revise antes de postar</h1>
            <div className="imageMessage-box">
              <img src={correa} alt="profile image for the information area" />
              <div className="text-div">
                <p>
                  Agora que está pronto para postar sua pergunta, releia do
                  começo ao fim. Ela faz sentido?
                </p>
                <p>
                  Adicione quaisquer detalhes que possa ter esquecido e releia
                  novamente. Agora é um bom momento para ter certeza de que o
                  título ainda descreve bem o seu problema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
