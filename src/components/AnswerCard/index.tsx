import React from "react";
import { Avatar } from "../Avatar";
import parse from "html-react-parser";
import { formatDate } from "../../utils/formatDate";
import { AnswerActions } from "../AnswerActions";
import { Post } from "../../types/postTypes";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

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
  const convertDelta = (body: any): string => {
    if (!body) return "";

    // Se for delta do Quill
    if (body.ops) {
      try {
        const converter = new QuillDeltaToHtmlConverter(body.ops, {
          inlineStyles: true,
        });
        return converter.convert();
      } catch (err) {
        console.error("Erro ao converter Delta:", err);
        return "";
      }
    }

    // Se for string simples (resposta antiga)
    if (typeof body === "string") return body;

    // Caso seja algum outro objeto estranho do Quill, tenta extrair ops -> texto puro
    if (body.text?.ops && Array.isArray(body.text.ops)) {
      return body.text.ops.map((op: any) => op.insert).join("");
    }

    // Fallback genérico: vazio
    return "";
  };

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

      <div className="answerText">{parse(convertDelta(answer.body))}</div>

      {answer.author.id === currentUserId && (
        <AnswerActions
          onEdit={() => onEdit?.(answer)}
          onDelete={() => onDelete?.(answer.id)}
        />
      )}
    </div>
  );
};
