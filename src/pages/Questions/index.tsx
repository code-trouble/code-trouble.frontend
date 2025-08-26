import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import { Tag } from "../../components/Tag";
import filterSettings from "../../assets/images/svg/filterSettings.svg";
import { QuestionsFilterModal } from "../../components/QuestionsFilterModal";
import { Pagination } from "../../components/QuestionsPagination";
import { useQuestionStore } from "../../stores/questionStore";

const tags = [
  "Design",
  "Programação",
  "Arte",
  "Ciência de Dados",
  "Tecnologia",
];

export const Questions: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { questions, isLoading, error, fetchAllQuestions } = useQuestionStore();

  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const displayedQuestions = questions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const navigateTo = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => setIsModalOpen(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="questions-container">
        <div
          className="questions-inner-container"
          style={{ textAlign: "center", padding: "2rem" }}
        >
          Carregando perguntas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="questions-container">
        <div
          className="questions-inner-container"
          style={{ textAlign: "center", padding: "2rem", color: "red" }}
        >
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="questions-container">
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
              {questions.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                  Nenhuma pergunta encontrada.
                </div>
              ) : (
                displayedQuestions.map((question) => (
                  <QuestionsPreview
                    key={question.id}
                    question={question}
                    onClick={() => navigateTo(`/questions/${question.id}`)}
                  />
                ))
              )}
            </div>
          </div>
          {questions.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
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
      {isModalOpen && (
        <QuestionsFilterModal onClick={toggleModal} closeModal={closeModal} />
      )}
    </div>
  );
};
