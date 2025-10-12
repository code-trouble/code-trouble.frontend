import React from "react";
import { Avatar } from "../Avatar";
import parse from "html-react-parser";
import { formatDate } from "../../utils/formatDate";
import { AnswerActions } from "../AnswerActions";
import { Post } from "../../types/postTypes";
import { useQuillToHtml } from "../../hooks/useDeltaToHtml";

interface AnswerCardProps {
  answer: Post;
  currentUserId?: number | null;
  onEdit?: (answer: Post) => void;
  onDelete?: (id: number) => void | Promise<void>;
}

export const AnswerCard: React.FC<AnswerCardProps> = ({
  answer,
  currentUserId,
  onEdit,
  onDelete,
}) => {
  const { convertBody } = useQuillToHtml();

  return (
    <div className="answerDisplayBlock">
      <div className="answerUserArea">
        <Avatar
          sizes="large"
          src={answer.author.avatar_url}
          name={answer.author.display_name}
        />
        <p>
          <span className="mutedCriado">
            Criado
            <br /> {formatDate(answer.created_at)}
          </span>
        </p>
      </div>

      <div className="answerText">{parse(convertBody(answer.body))}</div>

      {answer.author.id === currentUserId && (
        <AnswerActions
          onEdit={() => onEdit?.(answer)}
          onDelete={() => onDelete?.(answer.id)}
        />
      )}
    </div>
  );
};
