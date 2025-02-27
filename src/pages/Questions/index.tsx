import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { QuestionsPreview } from "../../components/QuestionPreview";
import { Tag } from "../../components/Tag";
import filterSettings from "../../assets/images/svg/filterSettings.svg";
import { QuestionsFilterModal } from "../../components/QuestionsFilterModal";
import { Pagination } from "../../components/QuestionsPagination";
import { useNavigate } from "react-router-dom";

const tags = ["Design", "Programação", "Arte", "Ciência de Dados", "Tecnologia"];

const questions = [
    {
        title: "Sphinx PDF build failing on reathedocs for Russian translation",
        description:
            "PDF build of Sphinx’s own documentation are failing for Russian translation (example build). .readthedocs.yml is set to build HTML and then PDF, and it's in the second step the failure arises lorem ipsum dolor sit amet lorem ipsum dolor adsasdasd.",
    },
    {
        title: "Inconsistent results between custom function using terra and a simplified version to calculate global statistic of a raster",
        description:
            "I am running an access poverty analysis on a raster of travel times. Using a slightly altered version of the Foster-Greer-Thorbecke index with exponent Alpha = 0, the following equality holds: lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },
    {
        title: "How to intercept outgoing SQL statements using Quarkus + Hibernate Reactive (StatementInspector)",
        description:
            "How can I intercept (and modify) outgoing SQL statements using Quarkus and Hibernate Reactive? I tried to do so by implementing a custom StatementInspector, but somehow the inspector is not lorem ipsum dolor sit amet lorem ipsum dolor sit amet.",
    },

];

export const Questions: React.FC = () => {


    const navigate = useNavigate()


    function navigateTo(path: string) {
        window.scrollTo(0, 0); 
        navigate(path);
    }



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;
    const totalPages = 10;

    // Math.ceil(questions.length / itemsPerPage);

    const toggleModal = () => setIsModalOpen((prev) => !prev);
    const closeModal = () => setIsModalOpen(false);

    const displayedQuestions = questions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                                onClick={() => {navigateTo("/ask-a-question")}}
                                
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
                            {displayedQuestions.map((q, index) => (
                                <QuestionsPreview
                                    key={index}
                                    questionTitle={q.title}
                                    questionDescription={q.description}
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
            {isModalOpen && (
                <QuestionsFilterModal onClick={toggleModal} closeModal={closeModal} />
            )}
        </div>
    );
};
