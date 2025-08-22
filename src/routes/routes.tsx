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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<FaqLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<TestingPage />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/questions/:id" element={<OpenQuestion />} />
        <Route path="/ask-a-question" element={<AskAQuestion />} />
      </Route>

      <Route element={<BlogLayout />}>
        <Route path="/write-a-post" element={<WriteAPost />} />
        <Route path="/blog" element={<Blog />} />
      </Route>

      <Route path="coming-soon" element={<ComingSoonPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
