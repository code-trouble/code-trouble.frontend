import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import DOMPurify, { Config as PurifyConfig } from "dompurify";
import "quill/dist/quill.snow.css";
import { useQuestions, Question, Answer } from "../../hooks/useQuestions";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Tag } from "../../components/Tag";
import { formatDate } from "../../utils/formatDate";
import comments from '../../assets/images/svg/greenComments.svg';
import upvotes from '../../assets/images/svg/greenUpvote.svg';
import addToFavorite from '../../assets/images/svg/addToFavorite.svg';
import threeDotMenu from '../../assets/images/svg/3dotsMenu.svg';
import { Avatar } from "../../components/Avatar";
import { AltPostWriter } from "../../components/AltPostWriter";
import CustomButton from "../../components/CustomButton";

export const OpenQuestion: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getById } = useQuestions(); //  remove, deleteAnswer
    const [question, setQuestion] = useState<Question>();
    const [answer, setAnswer] = useState("");
    const [answers, setAnswers] = useState<Answer[]>([]);
    const purifyConfig: PurifyConfig = { ADD_ATTR: ["class", "src", "href", "alt"] };

    useEffect(() => {
        if (!id) return navigate("/questions");
        const q = getById(id);
        if (!q) return navigate("/questions");
        setQuestion(q);
        setAnswers(q.answers ?? []);
    }, [id, getById, navigate]);

    if (!question) return null;
    const tags = question.tags ?? [];

    const cleanDesc = DOMPurify.sanitize(question.description, purifyConfig) as string;
    const cleanDetails = question.details
        ? (DOMPurify.sanitize(question.details, purifyConfig) as string)
        : "";

    const handlePostAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        const text = answer.trim();
        if (!text) return;
        const newAnswer: Answer = { id: Date.now().toString(), text, createdAt: new Date().toISOString() };
        const stored = localStorage.getItem("questions");
        if (stored) {
            const allQuestions: Question[] = JSON.parse(stored);
            const idx = allQuestions.findIndex(q => q.id === question.id);
            if (idx !== -1) {
                const updatedQuestion = {
                    ...allQuestions[idx],
                    answers: [...(allQuestions[idx].answers || []), newAnswer],
                };
                allQuestions[idx] = updatedQuestion;
                localStorage.setItem("questions", JSON.stringify(allQuestions));
                setQuestion(updatedQuestion);
                setAnswers([...answers, newAnswer]);
                setAnswer("");
            }
        }
    };

    // const handleDeleteAnswer = (answerId: string) => {
    //     deleteAnswer(question.id, answerId);
    //     setAnswers(answers.filter(a => a.id !== answerId));
    // };

    return (
        <div className="open-question-container">
            <Header loggedIn theme="base" />
            <div className="open-question-inner-container">
                <div className="title-wrapper">
                    <h1>{question.title}</h1>
                    <p>
                        <span className="mutedCriado">Criado</span> {formatDate(question.createdAt)}
                    </p>
                </div>
                {tags.length > 0 && (
                    <div className="tagList-area">
                        <Tag tags={tags} />
                    </div>
                )}
                <div className="question-description ql-container ql-snow">
                    <div className="ql-editor">{parse(cleanDesc)}</div>
                </div>
                {question.details && (
                    <section>
                        <div className="open-question-details ql-container ql-snow">
                            <div className="ql-editor">{parse(cleanDetails)}</div>
                        </div>
                    </section>
                )}
                <div className="bottomGroupDiv">
                    <div className="commentsNlikes">
                        <p>
                            <img src={upvotes} alt="upvotes" />120k{" "}
                        </p>
                        <p>
                            <img src={comments} alt="comments" />302{" "}
                        </p>
                    </div>
                    <div className="favoritesNoptions">
                        <img src={addToFavorite} alt="add to favorites" />
                        <img src={threeDotMenu} alt="menu with 3 dots" />
                    </div>
                </div>
                <div className="questionCreator">
                    <p>Criador(a) da pergunta</p>
                    <div className="followUser">
                        <Avatar sizes="large" name="Joana Lima" role="" src="" />
                        <div className="followButton">
                            <span className="dot" />
                            <p>Seguir</p>
                        </div>
                    </div>
                </div>
                <div className="answersArea">
                    <div className="upperAnswers">
                        <p>{answers.length} Resposta{answers.length !== 1 && "s"}</p>
                        <div className="filterAnswers">
                            <p>Ordenar por:</p>
                            <div className="filterAnswersDropdown">
                                <select className="order-select">
                                    <option value="newest">Mais recentes</option>
                                    <option value="oldest">Mais antigas</option>
                                    <option value="top">Mais curtidas</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {answers.length === 0 ? (
                        <div className="answerDisplayBlock">
                            <div className="answerUserArea">
                                <Avatar sizes="large" name="Olivia Ryes" />
                                <p>
                                    <span className="mutedCriado">
                                        Criado<br /> {formatDate(question.createdAt)}
                                    </span>
                                </p>
                            </div>
                            <div className="answerText">
                                <p>no answers were found</p>
                            </div>
                        </div>
                    ) : (
                        answers.map((ans) => (
                            <div key={ans.id} className="answerDisplayBlock" style={{ position: "relative" }}>
                              {/* <button
                                onClick={() => handleDeleteAnswer(ans.id)}
                                style={{
                                  position: "absolute",
                                  top: "8px",
                                  right: "8px",
                                  background: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  fontSize: "16px",
                                  lineHeight: "1",
                                  padding: "0",
                                }}
                              >
                                ×
                              </button> */}

                                <div className="answerUserArea">
                                    <Avatar sizes="large" name="Olivia Ryes" />
                                    <p>
                                        <span className="mutedCriado">
                                            Criado<br /> {formatDate(ans.createdAt)}
                                        </span>
                                    </p>
                                </div>
                                <div className="answerText">
                                    <div className="ql-container ql-snow">
                                        <div className="ql-editor">
                                            {parse(
                                                DOMPurify.sanitize(ans.text, purifyConfig) as string
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    <form className="answerForm" onSubmit={handlePostAnswer}>
                        <h1>Responder</h1>
                        <AltPostWriter onChange={setAnswer} value={answer} />
                        <CustomButton
                            type="submit"
                            text="Poste sua resposta"
                            padding="10px 24px"
                            color="white"
                            backgroundColor="#2DBA4F"
                            fontSize="18px"
                            fontWeight="500"
                        />
                    </form>
                </div>
            </div>
{/* 
        <button
          onClick={() => {
            remove(question.id);
            navigate("/questions");
          }}
          style={{ marginLeft: 16 }}
        >
          Excluir pergunta
        </button>  */}
            <Footer />
        </div>
    );
};
