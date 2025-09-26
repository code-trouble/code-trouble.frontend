import React, { useState, useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import { pfpPageBanner, profileAvatar } from "../../assets/images/png";
import CustomButton from "../../components/CustomButton";
import { TagBadge } from "../../components/TagBadge";
import { ProfileSkeleton } from "../../skeletons/ProfileSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileTagBadge } from "../../components/ProfileTagBadge";
import { ClipLoader } from "react-spinners";
import { usePostStore } from "../../stores/postStore";
import { PostPreview } from "../../components/GenericPostPreview";
import { filterDropdownArrow } from "../../assets/images/svg";

type PostKindFilter = "article" | "question" | "answer" | "";

export const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const {
    currentUser,
    profileUser,
    isLoadingProfile,
    fetchUserProfile,
    clearProfileUser,
    isFollowingUser,
    unfollowUser,
    followUser,
    isUpdatingFollowStatus,
  } = useUserStore();

  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<PostKindFilter>("");
  const { postList, fetchAllPosts, isLoadingPosts } = usePostStore();

  const isOwnProfile = currentUser?.username === username;

  const displayUser = isOwnProfile ? currentUser : profileUser;

  const handleFollow = () => {
    if (displayUser) {
      isFollowing ? unfollowUser(displayUser.id) : followUser(displayUser.id);
    }
  };

  const isFollowing =
    displayUser && !isOwnProfile ? isFollowingUser(displayUser.id) : false;

  const isLoadingFollow = isUpdatingFollowStatus(displayUser?.id || 0);

  useEffect(() => {
    if (!username) return;

    setError(null);

    if (isOwnProfile) {
      clearProfileUser();
      return;
    }

    const loadProfile = async () => {
      try {
        await fetchUserProfile(username);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        setError("Usuário não encontrado");
      }
    };

    loadProfile();
  }, [username, isOwnProfile, fetchUserProfile, clearProfileUser]);

  useEffect(() => {
    return () => {
      clearProfileUser();
    };
  }, [clearProfileUser]);

  useEffect(() => {
    // Só executa a busca se displayUser e seu ID existirem
    if (displayUser?.id) {
      const kind = filtro === "" ? undefined : filtro;
      fetchAllPosts({ author_id: displayUser.id, kind: kind });
    }
  }, [filtro, displayUser, fetchAllPosts]);

  const getPostDescription = (body: any): string => {
    if (body?.content?.ops) {
      return (
        body.content.ops
          .map((op: any) => (typeof op.insert === "string" ? op.insert : ""))
          .join("")
          .trim()
          .slice(0, 100) + (body.content.ops.join("").length > 100 ? "..." : "")
      );
    }
    return "Sem descrição disponível";
  };
  if (!username) {
    return <div>URL inválida</div>;
  }

  if (isOwnProfile && !currentUser) {
    return <ProfileSkeleton />;
  }

  if (!isOwnProfile && isLoadingProfile) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="profile-page-wrapper">
        <div className="error-message">
          <h2>{error}</h2>
          <CustomButton
            backgroundColor="#15181B"
            color="#fff"
            padding="8px 24px"
            text="Voltar"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  if (!displayUser) {
    return <ProfileSkeleton />;
  }

  const userInterestTags =
    displayUser.user_interests?.map((interest) => interest.tag) || [];

  const maxVisibleTags = 5;
  const visibleUserTags = userInterestTags.slice(0, maxVisibleTags);
  const hiddenUserTags = userInterestTags.slice(maxVisibleTags);
  const remainingUserCount = hiddenUserTags.length;

  console.log("Posts do usuário:", postList);
  return (
    <>
      <div className="profile-page-wrapper">
        <img
          src={
            displayUser.banner_url
              ? (displayUser.banner_url as string)
              : pfpPageBanner
          }
          alt="banner do usuário"
        />
        <div className="profile-details">
          <div className="userInfo">
            <div className="avatarDisplay">
              <img
                src={
                  displayUser.avatar_url
                    ? (displayUser.avatar_url as string)
                    : profileAvatar
                }
                alt="foto de perfil"
              />
            </div>
            <h1>{displayUser.display_name}</h1>
            <p>{displayUser.pronouns || "Ele/Dele"}</p>
            <span>{displayUser.bio || "sem bio"}</span>

            <div className="followersInfo">
              <div className="posts count">
                <p>{displayUser._count?.posts}</p>
                <p>publicações</p>
              </div>
              <div className="followers count">
                <p>{displayUser._count?.followers}</p>
                <p>seguidores</p>
              </div>
              <div className="following count">
                <p>{displayUser._count?.following}</p>
                <p>seguindo</p>
              </div>
            </div>
          </div>

          <div className="userActions">
            {isOwnProfile ? (
              <CustomButton
                backgroundColor="#15181B"
                color="#fff"
                padding="8px 78px"
                text="Editar Perfil"
                onClick={() => navigate("/onboarding")}
              />
            ) : (
              <CustomButton
                backgroundColor="#15181B"
                color="#fff"
                padding="8px 78px"
                text={isFollowing ? "Seguindo" : "Seguir"}
                disabled={isLoadingFollow}
                onClick={() => {
                  handleFollow();
                }}
              >
                {isLoadingFollow ? (
                  <ClipLoader color="#ffffff" size={15} />
                ) : undefined}
              </CustomButton>
            )}

            <h2>Interesses</h2>

            {userInterestTags.length > 0 ? (
              <div className="tag-list" style={{ position: "relative" }}>
                {visibleUserTags.map((tag) => (
                  <ProfileTagBadge key={tag.id} tag={tag} />
                ))}

                {remainingUserCount > 0 && (
                  <button
                    className="tag-item more-tags-button"
                    onClick={() => setIsTagsPopupOpen(!isTagsPopupOpen)}
                    type="button"
                  >
                    +{remainingUserCount}
                  </button>
                )}

                {isTagsPopupOpen && (
                  <div className="tags-popup">
                    {hiddenUserTags.map((tag) => (
                      <TagBadge key={tag.id} tag={tag} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="info-text">
                {isOwnProfile
                  ? "Nenhum interesse selecionado ainda."
                  : `${displayUser.username} ainda não selecionou interesses.`}
              </p>
            )}
          </div>
        </div>
        <div className="user-posts-display">
          <div className="posts-display-header">
            <p>
              {isOwnProfile
                ? "Seus posts"
                : `Posts de: ${displayUser.display_name}`}
            </p>
            <div
              className="filter-select-wrapper"
              style={
                {
                  "--arrow-icon": `url(${filterDropdownArrow})`,
                } as React.CSSProperties
              }
            >
              <select
                className="filter-select"
                onChange={(e) => setFiltro(e.target.value as PostKindFilter)}
                value={filtro}
              >
                <option value="">Ordenar por Todos</option>
                <option value="article">Ordenar por Artigos</option>
                <option value="question">Ordenar por Perguntas</option>
              </select>
            </div>
          </div>
          <div className="posts-display">
            {isLoadingPosts ? (
              <ClipLoader color="#15181B" size={50} />
            ) : postList.length > 0 ? (
              postList.map((post) => (
                <PostPreview
                  key={post.id}
                  post={post}
                  postTitle={post.title}
                  postDescription={getPostDescription(post.body)}
                />
              ))
            ) : (
              <p>Nenhum post encontrado para este filtro.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
