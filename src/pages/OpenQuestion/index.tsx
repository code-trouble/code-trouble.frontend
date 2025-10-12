import React, { useEffect, useState, useCallback, useRef } from "react";
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
import CustomButton from "../../components/CustomButton";
import { OpenQuestionSkeleton } from "../../skeletons/OpenQuestionSkeleton";
import { ClipLoader } from "react-spinners";

import "highlight.js/styles/github-dark.css";
import hljs from "highlight.js";
import { useUserStore } from "../../stores/userStore";
import { usePostStore } from "../../stores/postStore";
import { usePostActions } from "../../hooks/usePostActions";
import { upvote } from "../../assets/images/png";
import { TextEditor } from "../../components/Editor";
import { AnswerCard } from "../../components/AnswerCard";
import { Post } from "../../types/postTypes";

export const OpenQuestion: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    currentPost: question,
    isLoadingPosts,
    error,
    isPostOwner,
    fetchPostById,
    toggleLike,
    isLiking,
    createAnswer,
    deletePost,
    updatePost,
  } = usePostStore();

  const {
    isFollowingUser,
    currentUser,
    followUser,
    unfollowUser,
    isUpdatingFollowStatus,
  } = useUserStore();

  const { handleDelete, handleEdit } = usePostActions();

  // Estados separados para nova resposta e edição
  const [newAnswer, setNewAnswer] = useState<{ ops: any[] }>({ ops: [] });
  const [editingAnswer, setEditingAnswer] = useState<Post | null>(null);
  const [editedAnswerBody, setEditedAnswerBody] = useState<{ ops: any[] }>({
    ops: [],
  });

  const [showMenu, setShowMenu] = useState(false);
  const [isPostingAnswer, setIsPostingAnswer] = useState(false);
  const [isUpdatingAnswer, setIsUpdatingAnswer] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const fetchPost = useCallback(async () => {
    if (id) {
      await fetchPostById(id);
    } else {
      navigate("/questions");
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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

  const handlePostNewAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question?.id) return;
    if (!newAnswer?.ops?.length) {
      alert("Digite algo antes de postar!");
      return;
    }

    try {
      setIsPostingAnswer(true);

      const answerToSend = newAnswer;
      await createAnswer(question.id, answerToSend);

      setNewAnswer({ ops: [] });

      editorRef.current?.scrollIntoView({ behavior: "smooth" });
      await fetchPost();
    } catch (err) {
      console.error("Erro ao postar resposta:", err);
    } finally {
      setIsPostingAnswer(false);
    }
  };

  const handleUpdateAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnswer || !editedAnswerBody?.ops?.length) return;

    try {
      setIsUpdatingAnswer(true);

      const bodyToSend = editedAnswerBody;
      await updatePost(editingAnswer.id, { body: bodyToSend });

      // Reseta o estado só depois de concluir
      setEditingAnswer(null);
      setEditedAnswerBody({ ops: [] });

      await fetchPost();
    } catch (err) {
      console.error("Erro ao atualizar resposta:", err);
    } finally {
      setIsUpdatingAnswer(false);
    }
  };

  if (error || !question || isLoadingPosts) return <OpenQuestionSkeleton />;

  const handleLikeClick = async (postId: number) => {
    try {
      await toggleLike(postId);
    } catch (err) {
      console.error(err);
    }
  };

  const tags = question.body?.tags || [];
  const descriptionHtml = convertDelta(question.body?.description);
  const detailsHtml = convertDelta(question.body?.details);

  const cleanDesc = DOMPurify.sanitize(descriptionHtml, purifyConfig);
  const cleanDetails = detailsHtml
    ? DOMPurify.sanitize(detailsHtml, purifyConfig)
    : "";

  const questionAuthor = question.author?.id;
  const isFollowing = isFollowingUser(questionAuthor);
  const handleFollow = () => {
    if (question.author.id) {
      isFollowing ? unfollowUser(questionAuthor) : followUser(questionAuthor);
    }
  };
  const isLoadingFollow = isUpdatingFollowStatus(questionAuthor || 0);

  const answers = question?.answers || [];

  const handleEditAnswerClick = (ans: Post) => {
    setEditingAnswer(ans);
    setEditedAnswerBody(ans.body);
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleCancelEdit = () => {
    setEditingAnswer(null);
  };

  return (
    <div className="open-question-container">
      <div className="open-question-inner-container">
        {/* Question title */}
        <div className="title-wrapper">
          <h1>{question.title}</h1>
          <p>
            <span className="mutedCriado">Criado</span>{" "}
            {formatDate(question.created_at)}
          </p>
        </div>

        {/* Tags */}
        <div className="tagList-area">
          {tags.length > 0 ? <TagList tags={tags} /> : <code>(sem tags)</code>}
        </div>

        {/* Description */}
        <div className="question-description ql-container ql-snow">
          <div className="ql-editor">{parse(cleanDesc)}</div>
        </div>

        {/* Details */}
        {cleanDetails && (
          <section>
            <div className="open-question-details ql-container ql-snow">
              <div className="ql-editor">{parse(cleanDetails)}</div>
            </div>
          </section>
        )}

        {/* Likes & comments */}
        <div className="bottomGroupDiv">
          <div className="commentsNlikes">
            <button
              disabled={isLiking}
              onClick={() => handleLikeClick(question.id)}
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
                      onClick={() => handleEdit(question)}
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
                        handleDelete(question.id, {
                          redirectPath: "/questions",
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

        {/* Question author */}
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
              {question.author.id === currentUser?.id ? null : (
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

        {/* Answers */}
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
            [...answers]
              .sort((a, b) => (a.isAccepted ? -1 : b.isAccepted ? 1 : 0))
              .map((ans) => (
                <AnswerCard
                  key={ans.id}
                  answer={ans}
                  currentUserId={currentUser?.id ?? null}
                  onEdit={() => handleEditAnswerClick(ans)}
                  onDelete={async (id) => {
                    if (
                      window.confirm(
                        "Tem certeza que deseja deletar esta resposta?",
                      )
                    ) {
                      await deletePost(id);
                      await fetchPost();
                    }
                  }}
                />
              ))
          )}

          {/* Formulários separados - Renderização condicional */}
          <div ref={editorRef}>
            {editingAnswer ? (
              // FORMULÁRIO DE EDIÇÃO
              <form className="answerForm" onSubmit={handleUpdateAnswer}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <h1>Editar Resposta</h1>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    style={{
                      padding: "8px 16px",
                      background: "#f5f5f5",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Cancelar
                  </button>
                </div>
                <div className="editor-wrapper">
                  <TextEditor
                    onChange={setEditedAnswerBody}
                    value={editedAnswerBody}
                  />
                </div>
                <CustomButton
                  type="submit"
                  text={
                    isUpdatingAnswer ? "Atualizando..." : "Atualizar Resposta"
                  }
                  padding="10px 24px"
                  color="white"
                  backgroundColor="#2DBA4F"
                  fontSize="18px"
                  fontWeight="500"
                  disabled={isUpdatingAnswer}
                  children={isUpdatingAnswer ? <ClipLoader /> : ""}
                />
              </form>
            ) : (
              // FORMULÁRIO DE NOVA RESPOSTA
              <form className="answerForm" onSubmit={handlePostNewAnswer}>
                <h1>Responder</h1>
                <div className="editor-wrapper">
                  <TextEditor
                    onChange={(val) => {
                      setNewAnswer(val);
                    }}
                    value={newAnswer}
                  />
                </div>
                <CustomButton
                  type="submit"
                  text={isPostingAnswer ? "Postando..." : "Poste sua resposta"}
                  padding="10px 24px"
                  color="white"
                  backgroundColor="#2DBA4F"
                  fontSize="18px"
                  fontWeight="500"
                  disabled={isPostingAnswer}
                  children={isPostingAnswer ? <ClipLoader /> : ""}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
