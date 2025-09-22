import React, { useState, useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import { pfpPageBanner, profileAvatar } from "../../assets/images/png";
import CustomButton from "../../components/CustomButton";
import { TagBadge } from "../../components/TagBadge";
import { ProfileSkeleton } from "../../skeletons/ProfileSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileTagBadge } from "../../components/ProfileTagBadge";

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
  } = useUserStore();

  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwnProfile = currentUser?.username === username;

  const displayUser = isOwnProfile ? currentUser : profileUser;

  const handleFollow = () => {
    if (displayUser) {
      isFollowing ? unfollowUser(displayUser.id) : followUser(displayUser.id);
    }
  };

  const isFollowing =
    displayUser && !isOwnProfile ? isFollowingUser(displayUser.id) : false;

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
                onClick={() => {
                  handleFollow();
                }}
              />
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
      </div>
    </>
  );
};
