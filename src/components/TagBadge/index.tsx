import { XIcon } from "../../assets/images/svg";
import { Tag } from "../../types/tagTypes";

interface TagBadgeProps {
  tag: Tag;
  isActive?: boolean;
  onClick?: (tagId: number) => void;
}

export const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  isActive,
  onClick,
}) => {
  const className = `tag-item ${isActive ? "active" : "inactive"}`;

  return (
    <button
      onClick={() => onClick && onClick(tag.id)}
      className={`tag-item ${className}`}
      type="button"
    >
      {tag.name} {isActive ? <img src={XIcon} alt="remove tag icon" /> : null}
    </button>
  );
};
