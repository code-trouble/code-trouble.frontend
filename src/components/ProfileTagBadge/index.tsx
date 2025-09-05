import { Tag } from "../../types/tagTypes";

interface TagBadgeProps {
  tag: Tag;
  onClick?: (tagId: number) => void;
}

export const ProfileTagBadge: React.FC<TagBadgeProps> = ({ tag, onClick }) => {
  return (
    <button
      onClick={() => onClick && onClick(tag.id)}
      className={`tag-item active`}
      type="button"
    >
      {tag.name}
    </button>
  );
};
