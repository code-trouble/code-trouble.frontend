import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import filterSettings from "../../assets/images/svg/filterSettings.svg";
import { QuestionsFilterModal } from "../../components/QuestionsFilterModal";
import { Pagination } from "../../components/QuestionsPagination";
import { useQuestionStore } from "../../stores/questionStore";
import { QuestionsSkeleton } from "../../skeletons/QuestionsPageSkeleton";
import { TagSearcher } from "../../components/TagSearcher";
import { useTagStore } from "../../stores/tagStore";

export const Questions: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTopics, setShowAllTopics] = useState(false);
  const { questions, isLoading, error, fetchAllQuestions } = useQuestionStore();
  const { tags } = useTagStore();

  useEffect(() => {
    fetchAllQuestions();
  }, [fetchAllQuestions]);

  const TOPICS_LIMIT = 5;
  const displayedTags = showAllTopics
    ? tags.map((tag) => tag.name)
    : tags.slice(0, TOPICS_LIMIT).map((tag) => tag.name);
  const toggleTopics = () => setShowAllTopics((prev) => !prev);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  const filteredQuestions =
    selectedTags.length > 0
      ? questions.filter((question) =>
          selectedTags.every((tag) => question.body.tags.includes(tag)),
        )
      : questions;

  const displayedQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  //  const clearAllTags = () => setSelectedTags([]);

  const navigateTo = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleTagClick = (tagName: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagName)) {
        return prev.filter((tag) => tag !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
  };
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const closeModal = () => setIsModalOpen(false);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <QuestionsSkeleton />;
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
            {selectedTags.length > 0 && (
              <div className="active-filters">
                <code>Tags selecionadas: </code>
                {selectedTags.map((tag) => (
                  <code key={tag} className="tag-item">
                    [{tag}
                    <button onClick={() => handleTagClick(tag)}>×]</button>
                  </code>
                ))}
              </div>
            )}
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
                    onTagClick={handleTagClick}
                    onAvatarClick={() =>
                      navigateTo(`/${question.author.username}`)
                    }
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
                <TagSearcher onTagClick={handleTagClick} tags={displayedTags} />
              </div>
              <span onClick={toggleTopics}>
                {showAllTopics ? "Ver menos tópicos" : "Ver mais tópicos"}
              </span>
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
