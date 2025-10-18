import React, { useState, useEffect } from "react";
import CustomButton from "../../components/CustomButton";
import { Avatar } from "../../components/Avatar";
import { BlogPostPreview } from "../../components/BlogPostPreview";
import { Pagination } from "../../components/QuestionsPagination";
import { useNavigate } from "react-router-dom";
import { useTagStore } from "../../stores/tagStore";
import { TagSearcher } from "../../components/TagSearcher";
import { QuestionsSkeleton } from "../../skeletons/QuestionsPageSkeleton";
import { usePostStore } from "../../stores/postStore";

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const {
    tags,
    isLoading: tagsLoading,
    error: tagsError,
    fetchTags,
  } = useTagStore();

  const {
    articlesList: articles,
    isLoadingPosts: articlesLoading,
    error: articlesError,
    fetchAllPosts,
  } = usePostStore();

  useEffect(() => {
    fetchAllPosts({ kind: "article" });
    fetchTags();
  }, [fetchAllPosts, fetchTags]);

  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const displayedPosts = articles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  type QuillOp = {
    insert?: string | { image?: string };
  };

  type ArticleBody = {
    content?: { ops?: QuillOp[] };
  };

  const getFirstImage = (body: ArticleBody): string | null => {
    const ops = body?.content?.ops || [];

    const imageOp = ops.find((op) => {
      // Só considera ops cujo insert seja um objeto com a propriedade image
      return typeof op.insert === "object" && "image" in op.insert;
    });

    if (imageOp && typeof imageOp.insert === "object") {
      return imageOp.insert.image || null;
    }

    return null;
  };

  const TOPICS_LIMIT = 5;
  const displayedTags = showAllTopics
    ? tags.map((tag) => tag.name)
    : tags.slice(0, TOPICS_LIMIT).map((tag) => tag.name);
  const toggleTopics = () => setShowAllTopics((prev) => !prev);

  const getArticleDescription = (body: any): string => {
    if (body?.content?.ops) {
      return (
        body.content.ops
          .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
          .join("")
          .trim()
          .slice(0, 100) + (body.content.ops.join("").length > 70 ? "..." : "")
      );
    }
    return "Sem descrição disponível";
  };

  const hasImage = (body: any): boolean => {
    if (body?.content?.ops) {
      return body.content.ops.some(
        (op: any) => typeof op.insert === "object" && op.insert?.image,
      );
    }
    return false;
  };

  const tagNames = displayedTags;

  const handleTagClick = (tagName: string) => {
    console.log("Tag clicked:", tagName);
  };

  if (articlesLoading || displayedPosts.length < 0) {
    return <QuestionsSkeleton />;
  }

  return (
    <div className="blog-container">
      <div className="blog-inner-container">
        <div className="paginationWrapper">
          <div className="blog-area">
            <div className="blog-title">
              <h1>Todos os Posts</h1>
              <CustomButton
                backgroundColor="#3348A4"
                color="white"
                fontWeight="500"
                fontSize="18px"
                text="Escrever"
                padding="8px 41px"
                customId="writeAPostButton"
                onClick={() => {
                  navigateTo("/write-a-post");
                }}
              />
            </div>
            <div className="category-selection-blue">
              <a href="#">Para Você</a>
              <a href="#">Seguindo</a>
              <a href="#">Design</a>
              <a href="#">Desenvolvimento</a>
              <a href="#">UX</a>
              <a href="#">UI</a>
            </div>

            {articlesError && articlesLoading ? (
              <div style={{ color: "red", padding: "1rem" }}>
                {articlesError}
              </div>
            ) : (
              ""
            )}

            {articlesLoading ? (
              <div style={{ padding: "2rem", textAlign: "center" }}>
                Carregando artigos...
              </div>
            ) : (
              <>
                <div className="blog-list">
                  {displayedPosts.length > 0 ? (
                    displayedPosts.map((article) => {
                      const firstImage = getFirstImage(article.body);

                      return (
                        <BlogPostPreview
                          article={article}
                          key={article.id}
                          blogPostTitle={article.title || "untitled"}
                          blogPostDescription={getArticleDescription(
                            article.body,
                          )}
                          onClick={() => navigateTo(`/blog/${article.id}`)}
                          image={!!firstImage}
                          imgSrc={firstImage || ""}
                        />
                      );
                    })
                  ) : (
                    <div style={{ padding: "2rem", textAlign: "center" }}>
                      Nenhum artigo encontrado.
                    </div>
                  )}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    activeColor="#3348A4"
                    customId="blogPagination"
                  />
                )}
              </>
            )}
          </div>
        </div>

        <div className="right-side">
          <div className="first-two">
            <div className="community-choices">
              <h2>Escolhas da Comunidade</h2>
              <div className="community-choice">
                <Avatar sizes="medium" name="Joana Lima" />
                <p>Porque Designer Merece mais</p>
              </div>
              <div className="community-choice">
                <Avatar sizes="medium" name="Joana Lima" />
                <p>Pix agora ou agora?</p>
              </div>
              <div className="community-choice">
                <Avatar sizes="medium" name="Joana Lima" />
                <p>Porque dev não merece mais</p>
              </div>
              <a href="">Ver lista completa</a>
            </div>
            <div className="topics-area">
              <div className="recommended-topics">
                <h2>Tópicos Recomendados</h2>
                {tagsError && (
                  <div
                    style={{
                      color: "red",
                      fontSize: "14px",
                      marginBottom: "10px",
                    }}
                  >
                    {tagsError}
                  </div>
                )}
                {tagsLoading ? (
                  <div>Carregando tags...</div>
                ) : tagNames.length > 0 ? (
                  <>
                    <div className="tag-group">
                      <TagSearcher
                        onTagClick={handleTagClick}
                        tags={tagNames}
                      />
                    </div>
                    <span onClick={toggleTopics}>
                      {showAllTopics ? "Ver menos tópicos" : "Ver mais tópicos"}
                    </span>
                  </>
                ) : (
                  <div>Nenhuma tag encontrada.</div>
                )}
              </div>
            </div>
          </div>
          <div className="who-to-follow">
            <h2>Quem Seguir</h2>
            <div className="follow-area">
              <div className="follow-block">
                <div className="follow-info">
                  <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                  <CustomButton
                    padding="4.5px 12px"
                    text="Seguir"
                    border="2px solid #3348A4"
                    color="#3348A4"
                    borderRadius="75px"
                  />
                </div>
                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
              </div>
              <div className="follow-block">
                <div className="follow-info">
                  <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                  <CustomButton
                    padding="4.5px 12px"
                    text="Seguir"
                    border="2px solid #3348A4"
                    color="#3348A4"
                    borderRadius="75px"
                  />
                </div>
                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
              </div>
              <div className="follow-block">
                <div className="follow-info">
                  <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                  <CustomButton
                    padding="4.5px 12px"
                    text="Seguir"
                    border="2px solid #3348A4"
                    color="#3348A4"
                    borderRadius="75px"
                  />
                </div>
                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
              </div>
              <a href="">Ver mais sugestões</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
