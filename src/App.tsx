import { Toaster } from "sonner";
import { AppRoutes } from "./routes/routes";
import { useTagStore } from "./stores/tagStore";
import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";

export default function App() {
  const fetchTags = useTagStore((state) => state.fetchTags);
  const token = useAuthStore((state) => state.token);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);

  useEffect(() => {
    fetchTags();

    if (token) {
      fetchCurrentUser();
    }
  }, [token, fetchTags, fetchCurrentUser]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}
