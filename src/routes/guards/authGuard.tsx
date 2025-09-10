import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "../../stores/authModalStore";
import { useUserStore } from "../../stores/userStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, isLoading } = useUserStore();
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      openModal("signIn");
      navigate("/", { replace: true });
    }
  }, [currentUser, isLoading, openModal, navigate]);

  if (isLoading) {
    return null;
  }

  return currentUser ? <>{children}</> : null;
};
