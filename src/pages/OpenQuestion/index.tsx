import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify, { Config as PurifyConfig } from "dompurify";
import "quill/dist/quill.snow.css";
import { Tag } from "../../components/Tag";
import { formatDate } from "../../utils/formatDate";
import comments from "../../assets/images/svg/greenComments.svg";
import upvotes from "../../assets/images/svg/greenUpvote.svg";
import addToFavorite from "../../assets/images/svg/addToFavorite.svg";
import threeDotMenu from "../../assets/images/svg/3dotsMenu.svg";
import { Avatar } from "../../components/Avatar";
import { AltPostWriter } from "../../components/AltPostWriter";
import CustomButton from "../../components/CustomButton";
import { useQuestionStore } from "../../stores/questionStore";

export const OpenQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentQuestion: question,
    isLoading,
    error,
    fetchQuestionsById,
  } = useQuestionStore();

  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchQuestionsById(id);
    } else {
      navigate("/questions");
    }
  }, [id, fetchQuestionsById, navigate]);

  const purifyConfig: PurifyConfig = {
    ADD_ATTR: ["class", "src", "href", "alt"],
  };

  const convertDeltaToHtml = (delta: any): string => {
    if (!delta) return "";
    if (typeof delta === "string") return delta;
    if (delta.ops) {
      return delta.ops
        .map((op: any) => {
          let text = op.insert || "";
          if (op.attributes) {
            if (op.attributes.bold) text = `<strong>${text}</strong>`;
            if (op.attributes.italic) text = `<em>${text}</em>`;
            if (op.attributes["code-block"])
              text = `<pre><code>${text}</code></pre>`;
          }
          return text.replace(/\n/g, "<br>");
        })
        .join("");
    }
    return String(delta);
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Answer posting not implemented yet:", answer);
    setAnswer("");
  };

  if (isLoading) {
    return (
      <div className="open-question-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          Carregando pergunta...
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="open-question-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p style={{ color: "red" }}>{error || "Pergunta não encontrada"}</p>
          <button onClick={() => navigate("/questions")}>
            Voltar para perguntas
          </button>
        </div>
      </div>
    );
  }

  const tags = question.body.tags || [];
  const descriptionHtml = convertDeltaToHtml(question.body.description);
  const detailsHtml = convertDeltaToHtml(question.body.details);

  const cleanDesc = DOMPurify.sanitize(descriptionHtml, purifyConfig) as string;
  const cleanDetails = detailsHtml
    ? (DOMPurify.sanitize(detailsHtml, purifyConfig) as string)
    : "";

  return (
    <div className="open-question-container">
      <div className="open-question-inner-container">
        <div className="title-wrapper">
          <h1>{question.title}</h1>
          <p>
            <span className="mutedCriado">Criado</span>{" "}
            {formatDate(question.created_at)}
          </p>
        </div>
        {tags.length > 0 && (
          <div className="tagList-area">
            <Tag tags={tags} />
          </div>
        )}
        <div className="question-description ql-container ql-snow">
          <div className="ql-editor">{parse(cleanDesc)}</div>
        </div>
        {cleanDetails && (
          <section>
            <div className="open-question-details ql-container ql-snow">
              <div className="ql-editor">{parse(cleanDetails)}</div>
            </div>
          </section>
        )}
        <div className="bottomGroupDiv">
          <div className="commentsNlikes">
            <p>
              <img src={upvotes} alt="upvotes" />
              120k
            </p>
            <p>
              <img src={comments} alt="comments" />
              {answers.length}
            </p>
          </div>
          <div className="favoritesNoptions">
            <img src={addToFavorite} alt="add to favorites" />
            <img src={threeDotMenu} alt="menu with 3 dots" />
          </div>
        </div>
        <div className="questionCreator">
          <p>Criador(a) da pergunta</p>
          <div className="followUser">
            <Avatar
              sizes="large"
              name={question.author.username}
              role=""
              src={question.author.avatarUrl}
            />
            <div className="followButton">
              <span className="dot" />
              <p>Seguir</p>
            </div>
          </div>
        </div>
        <div className="answersArea">
          <div className="upperAnswers">
            <p>
              {answers.length} Resposta{answers.length !== 1 && "s"}
            </p>
            <div className="filterAnswers">
              <p>Ordenar por:</p>
              <div className="filterAnswersDropdown">
                <select className="order-select">
                  <option value="newest">Mais recentes</option>
                  <option value="oldest">Mais antigas</option>
                  <option value="top">Mais curtidas</option>
                </select>
              </div>
            </div>
          </div>
          {answers.length === 0 ? (
            <div className="answerDisplayBlock">
              <div className="answerUserArea">
                <Avatar sizes="large" name="Sem respostas" />
                <p>
                  <span className="mutedCriado">Nenhuma resposta ainda</span>
                </p>
              </div>
              <div className="answerText">
                <p>Seja o primeiro a responder esta pergunta!</p>
              </div>
            </div>
          ) : (
            answers.map((ans) => (
              <div key={ans.id} className="answerDisplayBlock">
                <div className="answerUserArea">
                  <Avatar sizes="large" name="Olivia Ryes" />
                  <p>
                    <span className="mutedCriado">
                      Criado
                      <br /> {formatDate(ans.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="answerText">
                  <div className="ql-container ql-snow">
                    <div className="ql-editor">
                      {parse(
                        DOMPurify.sanitize(ans.text, purifyConfig) as string,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <form className="answerForm" onSubmit={handlePostAnswer}>
            <h1>Responder</h1>
            <AltPostWriter onChange={setAnswer} value={answer} />
            <CustomButton
              type="submit"
              text="Poste sua resposta"
              padding="10px 24px"
              color="white"
              backgroundColor="#2DBA4F"
              fontSize="18px"
              fontWeight="500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
