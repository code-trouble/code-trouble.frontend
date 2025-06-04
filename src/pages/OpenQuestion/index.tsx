// src/pages/OpenQuestion.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
// import DOMPurify plus its Config type
import DOMPurify, { Config as PurifyConfig } from "dompurify";

// Quill’s Snow theme for all the ql-… styles
import "quill/dist/quill.snow.css";

import { useQuestions, Question } from "../../hooks/useQuestions";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Tag } from "../../components/Tag";
import { formatDate } from "../../utils/formatDate";


import comments from '../../assets/images/svg/greenComments.svg'
import upvotes from '../../assets/images/svg/greenUpvote.svg'
import addToFavorite from '../../assets/images/svg/addToFavorite.svg'
import threeDotMenu from '../../assets/images/svg/3dotsMenu.svg'
import { Avatar } from "../../components/Avatar";

export const OpenQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getById, remove } = useQuestions();
  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    if (!id) return navigate("/questions");
    const q = getById(id);
    if (!q) return navigate("/questions");
    setQuestion(q);
  }, [id, getById, navigate]);

  if (!question) return null;
  const tags = question.tags ?? [];

  // only allow the extra attributes Quill emits
  const purifyConfig: PurifyConfig = {
    ADD_ATTR: ["class", "src", "href", "alt"],
  };

  // sanitize() returns string | TrustedHTML, so cast back to string
  const cleanDesc = DOMPurify.sanitize(
    question.description,
    purifyConfig
  ) as string;
  const cleanDetails = question.details
    ? (DOMPurify.sanitize(question.details, purifyConfig) as string)
    : "";

  return (
    <div className="open-question-container">
      <Header loggedIn theme="base" />

      <div className="open-question-inner-container">
        <div className="title-wrapper">
          <h1>{question.title}</h1>
          <p><span className="mutedCriado">Criado</span> {formatDate(question.createdAt)}</p>
        </div>

        {tags.length > 0 && (
            <div className="tagList-area">
                <Tag tags={tags} />
            </div>
        )}

        {/* Quill wrapper so code-blocks, bold, etc. all get their theme CSS */}
        <div className="question-description ql-container ql-snow">
          <div className="ql-editor">{parse(cleanDesc)}</div>
        </div>

        {question.details && (
          <section>
            <div className="question-details ql-container ql-snow">
              <div className="ql-editor">{parse(cleanDetails)}</div>
            </div>
          </section>
        )}
        <div className="bottomGroupDiv">
          <div className="commentsNlikes">
            <p><img src={upvotes} alt="upvotes" />120k </p>
            <p><img src={comments} alt="comments" />302 </p>
          </div>
          <div className="favoritesNoptions">
            <img src={addToFavorite} alt="add to favorites" />
            <img src={threeDotMenu} alt="menu with 3 dots" />
          </div>
        </div>
        <div className="questionCreator">
          <p>Criador(a) da pergunta</p>
          <div className="followUser">
            <Avatar sizes="large" name="Joana Lima" role="" src=""/> 
            <div className="followButton">
                <span className="dot"/>
                <p>Seguir</p>
            </div>
          </div>
        </div>
        <div className="answersArea">
          <div className="upperAnswers">
            <p>1 Resposta</p>
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

          <div className="answerDisplayBlock">
              <div className="answerUserArea">
                <Avatar sizes="large" name="Olivia Ryes"/>
              </div>
              <div className="answerText">

              </div>
          </div>
        </div>





        {/* <button
          onClick={() => {
            remove(question.id);
            navigate("/questions");
          }}
          style={{ marginLeft: 16 }}
        >
          Excluir pergunta
        </button> */} 
      </div>

      <Footer />
    </div>
  );
};
