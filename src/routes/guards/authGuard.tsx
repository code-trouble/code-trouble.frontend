import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthModalStore } from "../../stores/authModalStore";
import { useAuthStore } from "../../stores/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthStore();
  const { openModal } = useAuthModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      openModal("signIn");
      navigate("/", { replace: true });
    }
  }, [token, openModal, navigate]);

  return token ? <>{children}</> : null;
};
