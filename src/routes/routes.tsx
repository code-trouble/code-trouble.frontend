import { Route, Routes } from "react-router-dom";
import { FaqLayout } from "../layouts/FaqLayout";
import { LandingPage } from "../pages/Landing";
import { TestingPage } from "../pages/TestingPage";
import { Questions } from "../pages/Questions";
import { OpenQuestion } from "../pages/OpenQuestion";
import { AskAQuestion } from "../pages/AskAQuestion";
import { Blog } from "../pages/Blog";
import { WriteAPost } from "../pages/WriteAPost";
import { ErrorPage } from "../pages/404";
import { ComingSoonPage } from "../pages/ComingSoon";
import { BlogLayout } from "../layouts/BlogLayout";
import { Onboarding } from "../pages/Onboarding";
import { ProfilePage } from "../pages/ProfilePage";
import { PassResetHandler } from "../pages/PassResetHandler";
import { ProtectedRoute } from "./guards/authGuard";
import { OpenArticle } from "../pages/OpenArticle";

const protect = (element: React.ReactNode) => (
  <ProtectedRoute>{element}</ProtectedRoute>
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<FaqLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestingPage />} />
        <Route path="/reset-password" element={<PassResetHandler />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:id" element={<OpenQuestion />} />
        <Route path="/ask-a-question" element={protect(<AskAQuestion />)} />
        <Route path="/onboarding" element={protect(<Onboarding />)} />
        <Route path="/:username" element={protect(<ProfilePage />)} />
      </Route>

      <Route element={<BlogLayout />}>
        <Route path="/write-a-post" element={protect(<WriteAPost />)} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<OpenArticle />} />
      </Route>

      <Route path="coming-soon" element={<ComingSoonPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
