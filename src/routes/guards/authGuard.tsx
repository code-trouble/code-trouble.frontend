import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "../../stores/authModalStore";
import { useUserStore } from "../../stores/userStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isInitializing } = useUserStore();
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isInitializing && !currentUser) {
      openModal("signIn");
      navigate("/", { replace: true });
    }
  }, [currentUser, isInitializing, openModal, navigate]);

  if (isInitializing) {
    return null;
  }

  return currentUser ? <>{children}</> : null;
};
