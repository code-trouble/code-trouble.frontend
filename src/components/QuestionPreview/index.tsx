import React, { useRef } from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/comments.svg";
import { Tag } from "../Tag";
import { useDisableTabInside } from "../../hooks/useDisableTabInside";
import { Question } from "../../types/questionTypes";

interface IQuestionsPreview {
  question: Question;
  onClick: () => void;
}

export const QuestionsPreview: React.FC<IQuestionsPreview> = ({
  question,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useDisableTabInside(containerRef);

  const descriptionHtml = question.body.description?.ops?.[0]?.insert || "";

  return (
    <div
      ref={containerRef}
      className="previewQuestion"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h1>{question.title}</h1>
      <div
        className="previewQuestion-description"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <div className="previewQuestion-bottom">
        <div className="previewQuestion-avatar-area">
          <Avatar
            sizes="small"
            name={question.author.username}
            src={question.author.avatarUrl}
            role="8 minutos atrás"
          />
          <div className="previewQuestion-comments">
            <p>4</p>
            <img src={comments} alt="ícone de comentário" />
          </div>
        </div>
        <div>
          <Tag tags={question.body.tags} />
        </div>
      </div>
    </div>
  );
};
