import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthModalStore } from "../../stores/authModalStore";
import { useEffect } from "react";

export const PassResetHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    const recoveryToken = searchParams.get("token");

    if (recoveryToken) {
      openModal("recovery", recoveryToken);
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [searchParams, navigate, openModal]);
  return <div>Redirecionando....</div>;
};
