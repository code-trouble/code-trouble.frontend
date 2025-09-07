import React, { useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { pfpPageBanner, profileAvatar } from "../../assets/images/png";
import CustomButton from "../../components/CustomButton";
import { TagBadge } from "../../components/TagBadge";
import { ProfileSkeleton } from "../../skeletons/ProfileSkeleton";
import { useNavigate } from "react-router-dom";
import { ProfileTagBadge } from "../../components/ProfileTagBadge";

export const ProfilePage: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const [isTagsPopupOpen, setIsTagsPopupOpen] = useState(false);
  const navigate = useNavigate();

  if (!currentUser) {
    return <ProfileSkeleton />;
  }

  const userInterestTags =
    currentUser.user_interests?.map((interest) => interest.tag) || [];

  const maxVisibleTags = 5;
  const visibleUserTags = userInterestTags.slice(0, maxVisibleTags);
  const hiddenUserTags = userInterestTags.slice(maxVisibleTags);
  const remainingUserCount = hiddenUserTags.length;

  return (
    <>
      <div className="profile-page-wrapper">
        <img
          src={currentUser.banner_url as string}
          alt=""
        />
        <div className="profile-details">
          <div className="userInfo">
            <div className="avatarDisplay">
              <img
                src={
                  currentUser.avatarUrl
                    ? (currentUser.avatarUrl as string)
                    : profileAvatar
                }
                alt="foto de perfil"
              />
            </div>
            <h1>{currentUser.username}</h1>
            <p>Ele/Dele</p>
          </div>
          <div className="userActions">
            <CustomButton
              backgroundColor="#15181B"
              color="#fff"
              padding="8px 78px"
              text="Editar Perfil"
              onClick={() => navigate("/onboarding")}
            />
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
              <p className="info-text">Nenhum interesse selecionado ainda.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
