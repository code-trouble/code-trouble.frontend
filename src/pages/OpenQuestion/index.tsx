import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify, { Config as PurifyConfig } from "dompurify";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import "quill/dist/quill.snow.css";
import { TagList } from "../../components/Tag";
import { formatDate } from "../../utils/formatDate";
import comments from "../../assets/images/svg/greenComments.svg";
import addToFavorite from "../../assets/images/svg/addToFavorite.svg";
import threeDotMenu from "../../assets/images/svg/3dotsMenu.svg";
import { Avatar } from "../../components/Avatar";
import { AltPostWriter } from "../../components/AltPostWriter";
import CustomButton from "../../components/CustomButton";
import { OpenQuestionSkeleton } from "../../skeletons/OpenQuestionSkeleton";
import { ClipLoader } from "react-spinners";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import { useUserStore } from "../../stores/userStore";
import { usePostStore } from "../../stores/postStore";
import { usePostActions } from "../../hooks/usePostActions";
import { upvote } from "../../assets/images/png";

export const OpenQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentPost: question,
    isLoadingPosts,
    error,
    isPostOwner,
    fetchPostById: fetchQuestionsById,
    toggleLike,
    isLiking,
  } = usePostStore();

  const {
    isFollowingUser,
    currentUser,
    followUser,
    unfollowUser,
    isUpdatingFollowStatus,
  } = useUserStore();

  const { handleDelete, handleEdit } = usePostActions();

  const [answer, setAnswer] = useState("");
  const [answers] = useState<any[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (id) {
      fetchQuestionsById(id);
    } else {
      navigate("/questions");
    }
  }, [id, fetchQuestionsById, navigate]);

  useEffect(() => {
    if (!isLoadingPosts && question) {
      document.querySelectorAll("pre").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [question, isLoadingPosts]);

  const purifyConfig: PurifyConfig = {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["class", "src", "href", "alt", "target"],
  };

  const convertDelta = (delta: any): string => {
    if (!delta || !delta.ops) return "";
    const converter = new QuillDeltaToHtmlConverter(delta.ops, {
      inlineStyles: true,
    });
    return converter.convert();
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Answer posting not implemented yet:", answer);
    setAnswer("");
  };

  const onDelete = () => {
    if (!question) return;
    handleDelete(question?.id, "/questions");
    setShowMenu(false);
  };

  const onEdit = () => {
    if (!question) return;
    handleEdit(question);
    setShowMenu(false);
  };

  if (isLoadingPosts) {
    return <OpenQuestionSkeleton />;
  }

  if (error || !question) {
    return (
      <div className="open-question-container">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <button onClick={() => navigate("/questions")}>
            Voltar para perguntas
          </button>
        </div>
      </div>
    );
  }

  const handleLikeClick = async (postId: number) => {
    try {
      await toggleLike(postId);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const tags = question.body.tags || [];
  const descriptionHtml = convertDelta(question.body.description);
  const detailsHtml = convertDelta(question.body.details);

  const cleanDesc = DOMPurify.sanitize(descriptionHtml, purifyConfig);
  const cleanDetails = detailsHtml
    ? DOMPurify.sanitize(detailsHtml, purifyConfig)
    : "";

  const questionAuthor = question.author.id;

  const isFollowing = isFollowingUser(questionAuthor);
  const handleFollow = () => {
    if (question.author.id) {
      isFollowing ? unfollowUser(questionAuthor) : followUser(questionAuthor);
    }
  };

  const isLoadingFollow = isUpdatingFollowStatus(questionAuthor || 0);

  return (
    <div className="open-question-container">
      <div className="open-question-inner-container">
        <div className="title-wrapper">
          <h1>{question.title}</h1>
          <p>
            <span className="mutedCriado">Criado</span>{" "}
            {formatDate(question.created_at)}
          </p>
        </div>
        <div className="tagList-area">
          {tags.length > 0 ? <TagList tags={tags} /> : <code> (sem tags)</code>}
        </div>
        <div className="question-description ql-container ql-snow">
          <div className="ql-editor">{parse(cleanDesc)}</div>
        </div>
        {cleanDetails && (
          <section>
            <div className="open-question-details ql-container ql-snow">
              <div className="ql-editor">{parse(cleanDetails)}</div>
            </div>
          </section>
        )}
        <div className="bottomGroupDiv">
          <div className="commentsNlikes">
            <button
              disabled={isLiking}
              onClick={() => {
                handleLikeClick(question.id);
              }}
              className="like-button"
            >
              <img
                src={upvote}
                alt="upvotes"
                className={question.isLikedByUser ? "liked" : ""}
              />
              <p>{question.likeCount}</p>
            </button>
            <p>
              <img src={comments} alt="comments" />
              {answers.length || 0}
            </p>
          </div>
          <div className="favoritesNoptions">
            <img src={addToFavorite} alt="add to favorites" />
            {isPostOwner(question, currentUser?.id) && (
              <div style={{ position: "relative" }}>
                <img
                  src={threeDotMenu}
                  alt="menu with 3 dots"
                  onClick={() => setShowMenu(!showMenu)}
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
                      onClick={onEdit}
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
                      onClick={onDelete}
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
        <div className="questionCreator">
          <p>Criador(a) da pergunta</p>
          <div className="followUser">
            <Avatar
              sizes="large"
              name={question.author.username}
              role=""
              src={question.author.avatar_url}
              onClick={() => navigate(`/${question.author.username}`)}
            />
            <div className="followButton">
              {question.author.id == currentUser?.id ? (
                ""
              ) : (
                <>
                  <span className="dot" />
                  <p
                    onClick={!isLoadingFollow ? handleFollow : undefined}
                    style={{ cursor: isLoadingFollow ? "default" : "pointer" }}
                  >
                    {isLoadingFollow ? (
                      <ClipLoader color="#2DBA4F" size={15} />
                    ) : isFollowing ? (
                      "Seguindo"
                    ) : (
                      "Seguir"
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="answersArea">
          <div className="upperAnswers">
            <p>
              {answers.length} Resposta{answers.length !== 1 && "s"}
            </p>
            <div className="filterAnswers">
              <p>Ordenar por:</p>
              <div className="filterAnswersDropdown">
                <select className="order-select">
                  <option value="newest">Mais recentes</option>
                  <option value="oldest">Mais antigas</option>
                  <option value="top">Mais curtidas</option>
                </select>
              </div>
            </div>
          </div>
          {answers.length === 0 ? (
            <div className="answerDisplayBlock">
              <div className="answerUserArea">
                <Avatar sizes="large" name="Sem respostas" />
                <p>
                  <span className="mutedCriado">Nenhuma resposta ainda</span>
                </p>
              </div>
              <div className="answerText">
                <p>Seja o primeiro a responder esta pergunta!</p>
              </div>
            </div>
          ) : (
            answers.map((ans) => (
              <div key={ans.id} className="answerDisplayBlock">
                <div className="answerUserArea">
                  <Avatar sizes="large" name="Olivia Ryes" />
                  <p>
                    <span className="mutedCriado">
                      Criado
                      <br /> {formatDate(ans.createdAt)}
                    </span>
                  </p>
                </div>
                <div className="answerText">
                  <div className="ql-container ql-snow">
                    <div className="ql-editor">
                      {parse(
                        DOMPurify.sanitize(ans.text, purifyConfig) as string,
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <form className="answerForm" onSubmit={handlePostAnswer}>
            <h1>Responder</h1>
            <AltPostWriter onChange={setAnswer} value={answer} />
            <CustomButton
              type="submit"
              text="Poste sua resposta"
              padding="10px 24px"
              color="white"
              backgroundColor="#2DBA4F"
              fontSize="18px"
              fontWeight="500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
