import React, { useState } from "react";
import threeDotMenu from "../../assets/images/svg/3dotsMenu.svg";

interface AnswerActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const AnswerActions: React.FC<AnswerActionsProps> = ({
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="answer-actions">
      <img
        src={threeDotMenu}
        alt="menu with 3 dots"
        onClick={() => setShowMenu(!showMenu)}
        className="answer-actions-trigger"
      />
      {showMenu && (
        <div className="answer-actions-menu">
          <button
            onClick={() => {
              onEdit();
              setShowMenu(false);
            }}
            className="answer-action-button edit"
          >
            Editar
          </button>
          <button
            onClick={() => {
              onDelete();
              setShowMenu(false);
            }}
            className="answer-action-button delete"
          >
            Deletar
          </button>
        </div>
      )}
    </div>
  );
};
