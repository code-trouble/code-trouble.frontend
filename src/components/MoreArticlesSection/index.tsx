import { useEffect } from "react";
import { usePostStore } from "../../stores/postStore";
import MoreArticlesPreview from "../MoreArticlesPreview";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

interface MoreArticlesSectionProps {
  currentArticleId: number;
  authorId: number;
}

const MoreArticlesSection: React.FC<MoreArticlesSectionProps> = ({
  currentArticleId,
  authorId,
}) => {
  const { fetchUserPosts, userPosts, isLoadingPosts } = usePostStore();
  const navigate = useNavigate();
  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  useEffect(() => {
    if (authorId) {
      fetchUserPosts(authorId, "article");
    }
  }, [authorId, fetchUserPosts]);

  const filteredArticles = userPosts
    .filter((article) => article.id !== currentArticleId)
    .slice(0, 2);

  if (isLoadingPosts) {
    return <div>Loading...</div>;
  }

  if (filteredArticles.length === 0) {
    return null;
  }

  return (
    <div className="more-articles-section">
      <div className="articles-list">
        {filteredArticles.map((article) => (
          <MoreArticlesPreview
            key={article.id}
            title={article.title}
            imgSrc={article.body?.coverImage} // Adjust based on your data structure
            author={article.author?.display_name || article.author?.username}
            authorPfp={article.author?.avatar_url}
            articleLikes={article.likeCount?.toString() || "0"}
            articleComments={article.commentCount?.toString() || "0"}
            date={formatDate(article.created_at)}
            tags={article.body?.tags?.join(", ") || ""} // Join tags if array
            onClick={() => navigateTo(`/blog/${article.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreArticlesSection;
