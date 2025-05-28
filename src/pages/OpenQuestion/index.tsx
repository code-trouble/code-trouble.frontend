// src/pages/OpenQuestion.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestions, Question } from "../../hooks/useQuestions";

export const OpenQuestion: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getById, remove } = useQuestions();
    const [question, setQuestion] = useState<Question | undefined>(undefined);

    useEffect(() => {
        if (!id) {
            navigate("/questions");
            return;
        }
        const q = getById(id);
        if (!q) {
            navigate("/questions");
        } else {
            setQuestion(q);
        }
    }, [id, getById, navigate]);

    if (!question) return null;

    return (
        <div className="main-wrapper">
            <h1>{question.title}</h1>

            <div
                className="question-description"
                dangerouslySetInnerHTML={{ __html: question.description }}
            />

            {question.details && (
                <section>
                    <h2>Detalhes</h2>
                    <div
                        className="question-details"
                        dangerouslySetInnerHTML={{ __html: question.details }}
                    />
                </section>
            )}

            {question.tags && question.tags.length > 0 && (
                <section>
                    <h2>Tags</h2>
                    <ul>
                        {question.tags.map(tag => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                </section>
            )}

            <footer>
                <small>
                    Criado em: {new Date(question.createdAt).toLocaleString()}
                </small>
                <button
                    onClick={() => {
                        remove(question.id);
                        navigate("/questions");
                    }}
                    style={{ marginLeft: 16 }}
                >
                    Excluir pergunta
                </button>
            </footer>
        </div>
    );
};
