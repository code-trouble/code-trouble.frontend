import React from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../../stores/userStore";
import { useAuthModalStore } from "../../stores/authModalStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isLoading: userLoading } = useUserStore();
  const { openModal } = useAuthModalStore();

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    openModal("signIn");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
