import React, { useRef } from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/comments.svg";
import { useDisableTabInside } from "../../hooks/useDisableTabInside";
import { formatDate } from "../../utils/formatDate";
import { TagSearcher } from "../TagSearcher";
import { Post } from "../../types/postTypes";
import { GreenUpvote } from "../../assets/images/svg";

interface IQuestionsPreview {
  question: Post;
  onClick: () => void;
  onAvatarClick?: () => void;
  onTagClick?: (tag: string) => void;
}

export const QuestionsPreview: React.FC<IQuestionsPreview> = ({
  question,
  onClick,
  onAvatarClick,
  onTagClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useDisableTabInside(containerRef);

  const descriptionHtml = question.body.description?.ops?.[0]?.insert || "";

  const handleAvatarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAvatarClick?.();
  };

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
        <div
          className="previewQuestion-avatar-area"
          onClick={handleAvatarClick}
        >
          <Avatar
            sizes="small"
            name={question.author.username}
            src={question.author.avatar_url}
            role={formatDate(question.created_at)}
          />
          <div className="previewQuestion-likes">
            <p>{question.likeCount}</p>
            <img src={GreenUpvote} alt="ícone de comentário" />
          </div>
          <div className="previewQuestion-comments">
            <p>{question.commentCount || 0}</p>
            <img src={comments} alt="ícone de comentário" />
          </div>
        </div>
        <div>
          <TagSearcher tags={question.body.tags} onTagClick={onTagClick} />
        </div>
      </div>
    </div>
  );
};
