import React, { useRef } from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/comments.svg";
import { Tag } from "../Tag";
import { useDisableTabInside } from "../../hooks/useDisableTabInside";

const tags = ["localization", "sphinx", "read-the-docs"];

interface IQuestionsPreview {
  questionTitle: string;
  questionDescription: string;
  onClick: () => void;
}

export const QuestionsPreview: React.FC<IQuestionsPreview> = ({
  questionTitle,
  questionDescription,
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useDisableTabInside(containerRef);

  return (
    <div
      ref={containerRef}
      className="previewQuestion"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <h1>{questionTitle}</h1>
      <div
        className="previewQuestion-description"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        dangerouslySetInnerHTML={{ __html: questionDescription }}
      />
      <div className="previewQuestion-bottom">
        <div className="previewQuestion-avatar-area">
          <Avatar sizes="small" name="Joana Lima" role="8 minutos atrás" />
          <div className="previewQuestion-comments">
            <p>4</p>
            <img src={comments} alt="ícone de comentário" />
          </div>
        </div>
        <div>
          <Tag tags={tags} />
        </div>
      </div>
    </div>
  );
};
