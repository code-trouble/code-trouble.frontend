import React, { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import { pfpPageBanner } from "../../assets/images/png";
import { Avatar } from "../../components/Avatar";
import CustomButton from "../../components/CustomButton";

export const ProfilePage: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <>
      <div className="profile-page-wrapper">
        <img src={pfpPageBanner} alt="" />
        <div className="profile-details">
          <div className="userInfo">
            <div className="avatarDisplay">
              <Avatar sizes="large" src={currentUser.avatarUrl as string} />
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
            />
            <h2>Interesses</h2>
            {/* TODO: Refactor the tag component to use it here, it displays the user interests */}
          </div>
        </div>
      </div>
    </>
  );
};
