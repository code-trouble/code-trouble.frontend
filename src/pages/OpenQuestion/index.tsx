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

        <button
          onClick={() => {
            remove(question.id);
            navigate("/questions");
          }}
          style={{ marginLeft: 16 }}
        >
          Excluir pergunta
        </button>
      </div>

      <Footer />
    </div>
  );
};
