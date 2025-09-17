import React from "react";

interface ITagSearcher {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export const TagSearcher: React.FC<ITagSearcher> = ({ onTagClick, tags }) => {
  return (
    <div className="tag-list">
      {tags.map((tag, index) => (
        <button
          key={index}
          className="tag-item"
          onClick={(e) => {
            e.stopPropagation();
            onTagClick && onTagClick(tag);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
