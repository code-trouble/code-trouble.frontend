import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useUserStore } from "../../stores/userStore";
import MoreArticlesPreview from "../MoreArticlesPreview";
import { formatDate } from "../../utils/formatDate";

interface ArticleSummary {
  id: number;
  title: string;
  description: string;
  author: string;
  authorPfp: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  imgSrc: string;
}

interface MoreArticlesSectionProps {
  currentArticleId: number;
  authorId: number;
}

// type QuillOp = {
//   insert?: string | { image?: string };
// };

// type ArticleBody = {
//   content?: { ops?: QuillOp[] };
// };

// const getFirstImage = (body: ArticleBody): string | null => {
//   const ops = body?.content?.ops || [];

//   const imageOp = ops.find((op) => {
//     // Só considera ops cujo insert seja um objeto com a propriedade image
//     return typeof op.insert === "object" && "image" in op.insert;
//   });

//   if (imageOp && typeof imageOp.insert === "object") {
//     return imageOp.insert.image || null;
//   }

//   return null;
// };

const MoreArticlesSection: React.FC<MoreArticlesSectionProps> = ({
  currentArticleId,
  authorId,
}) => {
  const profileUser = useUserStore((state) => state.profileUser);
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/posts", {
          params: {
            author_id: authorId,
            kind: "article",
          },
        });

        const filtered = response.data.data
          .filter((a: any) => a.id !== currentArticleId)
          .slice(0, 2)
          .map((a: any) => ({
            id: a.id,
            title: a.title,
            description: a.body?.description || "",
            author: profileUser?.display_name || "",
            authorPfp: profileUser?.avatar_url || "",
            likeCount: a.likeCount || 0,
            commentCount: a.commentCount || 0,
            createdAt: a.created_at,
          }));

        setArticles(filtered);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [authorId, currentArticleId, profileUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="more-articles-section">
      <div className="articles-list">
        {articles.map((article) => (
          <MoreArticlesPreview
            imgSrc={article.imgSrc}
            key={article.id}
            author={article.author}
            authorPfp={article.authorPfp}
            articleLikes={article.likeCount.toString()}
            articleComments={article.commentCount.toString()}
            date={formatDate(article.createdAt)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoreArticlesSection;
