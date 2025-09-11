import { Toaster } from "sonner";
import { AppRoutes } from "./routes/routes";
import { useTagStore } from "./stores/tagStore";
import { useUserStore } from "./stores/userStore";
import { useEffect } from "react";
import { LoadingScreen } from "./components/LoadingScreen";

export default function App() {
  const fetchTags = useTagStore((state) => state.fetchTags);
  const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);
  const currentUser = useUserStore((state) => state.currentUser);
  const isInitializing = useUserStore((state) => state.isInitializing);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchTags();
    }
  }, [currentUser, fetchTags]);

  if (isInitializing) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}
