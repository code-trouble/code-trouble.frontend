import { Routes, Route } from "react-router-dom";  // Importando o React Router
import { ErrorPage } from "./pages/404";
import { ComingSoonPage } from "./pages/ComingSoon";
import { TestingPage } from "./pages/TestingPage";
import { LandingPage } from "./pages/Landing";
import { AskAQuestion } from "./pages/AskAQuestion";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />        {/* Página principal */}
        <Route path="/coming-soon" element={<ComingSoonPage />} /> {/* Outra página */}
        <Route path="*" element={<ErrorPage />} />              {/* Página 404 */}
        <Route path="test" element={<TestingPage />} />              {/* Pagina de testes */}
        <Route path="askaquestion" element={<AskAQuestion />} />              {/* Faça uma pergunta */}
      </Routes>
    </>
  );
}
