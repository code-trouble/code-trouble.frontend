import React, { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import { Tag } from "../../components/Tag";
import filterSettings from "../../assets/images/svg/filterSettings.svg";
import { QuestionsFilterModal } from "../../components/QuestionsFilterModal";
import { Pagination } from "../../components/QuestionsPagination";
import { useNavigate } from "react-router-dom";
import { useQuestions, Question } from "../../hooks/useQuestions";
import { initialQuestions } from "../../utils/initialQuestions";

const tags = ["Design", "Programação", "Arte", "Ciência de Dados", "Tecnologia"];

export const Questions: React.FC = () => {
  const navigate = useNavigate();

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  const { getAll, add } = useQuestions();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 10;
  //  const totalPages = Math.ceil(questions.length / itemsPerPage);
  const totalPages = 10;

  // Seed initial questions on first load
  useEffect(() => {
    const stored = getAll();
    if (stored.length === 0) {
      const seeded = initialQuestions.map((q) => ({
        id: q.id.toString(),
        title: q.title,
        description: q.description,
        createdAt: new Date().toISOString(),
      }));
      seeded.forEach((question) => add(question));
      setQuestions(seeded);
    } else {
      setQuestions(stored);
    }
  }, [getAll, add]);

  const displayedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => setIsModalOpen(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="questions-container">
      <Header theme="base" loggedIn={false} />
      <div className="questions-inner-container">
        <div className="left-side">
          <div className="questions-area">
            <div className="questions-title">
              <h1>Todas as Perguntas</h1>
              <CustomButton
                backgroundColor="#2DBA4F"
                color="white"
                fontWeight="500"
                fontSize="18px"
                text="Perguntar"
                padding="8px 41px"
                customId="askButton"
                onClick={() => navigateTo("/ask-a-question")}
              />
            </div>
            <div className="category-selection">
              <a href="#">Novo</a>
              <a href="#">Top</a>
              <a href="#">Bounty</a>
              <a href="#">Semana</a>
              <a href="#">Mês</a>
            </div>
            <div className="questions-list">
              {displayedQuestions.map((q) => (
                <QuestionsPreview
                  key={q.id}
                  questionTitle={q.title}
                  questionDescription={q.description}
                  onClick={() => navigateTo(`/questions/${q.id}`)}
                />
              ))}
            </div>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className="right-side">
          <div className="topics-area">
            <div className="recommended-topics">
              <h2>Tópicos Recomendados</h2>
              <div className="tag-group">
                <Tag tags={tags} />
              </div>
              <span>Ver mais tópicos</span>
            </div>
          </div>
          <div className="custom-filters">
            <h2>Filtros Customizados</h2>
            <span onClick={toggleModal}>
              <img src={filterSettings} alt="filter settings icon" />
              Criar Filtro Customizado
            </span>
          </div>
        </div>
      </div>
      <Footer customStyle={{ bottom: 0 }} />
      {isModalOpen && <QuestionsFilterModal onClick={toggleModal} closeModal={closeModal} />}
    </div>
  );
};
