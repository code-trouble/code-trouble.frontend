import { useCallback, useEffect, useState } from "react";
import { AddToFavorite, ThreeDotsMenu } from "../../assets/images/svg";
import { blueComment, blueHeart } from "../../assets/images/svg/icons";
import { Avatar } from "../../components/Avatar";
import { TagList } from "../../components/Tag";
import { usePostStore } from "../../stores/postStore";
import { useNavigate, useParams } from "react-router-dom";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { OpenQuestionSkeleton } from "../../skeletons/OpenQuestionSkeleton";
import parse from "html-react-parser";
import DOMPurify, { Config as PurifyConfig } from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import "quill/dist/quill.snow.css";
import { useUserStore } from "../../stores/userStore";
import { usePostActions } from "../../hooks/usePostActions";
import MoreArticlesSection from "../../components/MoreArticlesSection";

export const OpenArticle: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    fetchPostById,
    currentPost: article,
    isLoadingPosts,
    error,
    isPostOwner,
  } = usePostStore();

  const {
    currentUser,
    profileUser,

    fetchUserProfile,
  } = useUserStore();

  const { handleDelete, handleEdit } = usePostActions();

  const convertDelta = (delta: any): string => {
    if (!delta || !delta.ops) return "";
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    });
    return converter.convert();
  };

  const fetchPost = useCallback(async () => {
    if (id) {
      await fetchPostById(id);
    } else {
      navigate("/blog");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    if (!isLoadingPosts && article) {
      document.querySelectorAll("pre").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [article, isLoadingPosts]);

  useEffect(() => {
    if (article?.author?.username) {
      fetchUserProfile(article.author.username);
    }
  }, [article?.author?.username]);

  const postOwner = profileUser;

  const purifyConfig: PurifyConfig = {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["class", "src", "href", "alt", "target"],
  };

  if (error || !article || isLoadingPosts) return <OpenQuestionSkeleton />;

  const tags = article.body?.tags || [];
  const bodyHtml = convertDelta(article.body.content);
  const cleanBody = DOMPurify.sanitize(bodyHtml, purifyConfig);

  return (
    <div className="open-article-wrapper">
      <div className="open-article-content">
        {/* Title + subtitle */}
        <div className="text-block">
          <h1>{article.title}</h1>
          <p>{article.body?.description || "Sem descrição"}</p>
        </div>

        {/* Author + follow */}
        <div className="socials-block">
          <Avatar
            name={article.author?.username}
            sizes="large"
            src={article.author?.avatar_url}
            onClick={() => navigate(`/${article.author?.username}`)}
          />
          <button>Seguir</button>
        </div>

        {/* Likes / favorites / tags */}
        <div className="post-details">
          <div className="likes-and-actions">
            <div className="likes-comments">
              <p>
                <img src={blueHeart} alt="likes" />
                {article.likeCount || 0}
              </p>
              <p>
                <img src={blueComment} alt="comments" />
                {article.commentCount || 0}
              </p>
            </div>

            <div
              className="favorites-and-options"
              style={{ position: "relative" }}
            >
              <img src={AddToFavorite} alt="add to favorites" />
              {isPostOwner(article, currentUser?.id) && (
                <div>
                  <img
                    onClick={() => setShowMenu((prev) => !prev)}
                    src={ThreeDotsMenu}
                    alt="menu with 3 dots"
                    style={{ cursor: "pointer" }}
                  />

                  {showMenu && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        background: "white",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        minWidth: "120px",
                      }}
                    >
                      <button
                        onClick={() => handleEdit(article)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "8px 16px",
                          border: "none",
                          background: "none",
                          textAlign: "left",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(article.id, {
                            redirectPath: "/blog",
                          })
                        }
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "8px 16px",
                          border: "none",
                          background: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          color: "red",
                        }}
                      >
                        Deletar
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="tagList-area">
            {tags.length > 0 ? (
              <TagList tags={tags} />
            ) : (
              <code>(sem tags)</code>
            )}
          </div>
        </div>

        <div className="delta-render-area">
          <div className="ql-container ql-snow">
            <div className="ql-editor">{parse(cleanBody)}</div>
          </div>
        </div>
      </div>

      <div className="open-article-extras">
        <div className="extras-wrapper">
          <div className="user-avatar">
            <img
              src={article.author.avatar_url}
              alt="foto de perfil do autor"
            />
          </div>
          <div className="user-information">
            <div className="escrito-por">
              <h1>
                Escrito por <strong>{article.author.display_name}</strong>{" "}
              </h1>
              <button>Seguir</button>
            </div>
            <span>{postOwner?._count?.followers} seguidores</span>

            <p>{postOwner?.bio}</p>
          </div>
          <div className="artigo-author-info">
            <div className="text-display">
              <h1>Mais artigos de {article.author.display_name}</h1>
              <p>
                E outros com{" "}
                {(article.body.tags as string[]).map((tag) => (
                  <strong key={tag}>
                    {" "}
                    <span>{tag}</span>
                  </strong>
                ))}{" "}
              </p>
            </div>
          </div>
          <div className="mais-artigos">
            <MoreArticlesSection
              authorId={article.author_id}
              currentArticleId={article.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
