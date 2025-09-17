import React from "react";
import xIcon from "../../assets/images/svg/xIcon.svg";

interface ITag {
  tags: string[];
  onTagRemove?: (tag: string) => void;
  disabled?: boolean;
  icon?: boolean;
}

export const TagList: React.FC<ITag> = ({
  tags,
  onTagRemove,
  disabled,
  icon,
}) => {
  return (
    <div className="tag-list">
      {tags.map((tag, index) => (
        <button
          disabled={disabled}
          key={index}
          className="tag-item"
          onClick={(e) => {
            e.stopPropagation();
            onTagRemove && onTagRemove(tag);
          }}
        >
          {tag} {onTagRemove && ""}
          {icon ? <img src={xIcon} alt="remove tag icon" /> : null}
        </button>
      ))}
    </div>
  );
};
