import React, { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";

export const ProfilePage: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  if (!currentUser) {
    return <div>Carregando perfil...</div>;
  }

  console.log(currentUser.avatarUrl);
  return (
    <>
      <div className="main-wrapper">{currentUser.username}</div>
      <p>{currentUser.avatarUrl}</p>
    </>
  );
};
