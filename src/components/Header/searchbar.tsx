import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import lupa from "../../assets/images/svg/lupaGlass.svg";

// AS WE CURRENTLY DONT HAVE A BACKEND, THIS IS A ''PLACEHOLDER'' API CALL FOR LATER.
export const SearchBar: React.FC = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsSearching(false);
            return;
        }
        setIsSearching(true);
        const timer = setTimeout(() => {

            setResults([]);
            setIsSearching(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);


    let currentPage: "home" | "blog" | "questions" = "home";
    if (location.pathname.includes("blog")) {
        currentPage = "blog";
    } else if (location.pathname.includes("questions")) {
        currentPage = "questions";
    }


    let suggestions: string[] = [];
    switch (currentPage) {
        case "home":
            suggestions = ["Blog", "Questões"];
            break;
        case "blog":
            suggestions = ["Home", "Questões"];
            break;
        case "questions":
            suggestions = ["Home", "Blog"];
            break;
    }


    const suggestionMapping: { [key: string]: string } = {
        Blog: "instead, write a blog post in (blog)",
        "Questões": "instead, ask a question in (questions)",
        Home: "instead, navigate to the home page (home)"
    };

    const handleSuggestionClick = (suggestion: string) => {
        let path = "/";
        if (suggestion.toLowerCase() === "blog") {
            path = "/blog";
        } else if (
            suggestion.toLowerCase() === "questões" ||
            suggestion.toLowerCase() === "questoes"
        ) {
            path = "/questions";
        }
        navigate(path);
    };

    return (
        <>
            <div className="search-input-wrapper">
                <img src={lupa} alt="icone de lupa para pesquisa" />
                <input
                    type="text"
                    placeholder="Pesquisar"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            {query && (
                <div className="live-search-results">
                    {isSearching ? (
                        <p>Searching...</p>
                    ) : (
                        <>
                            {results.length === 0 && (
                                <p className="no-results">Nada foi encontrado para "{query}"</p>
                            )}
                            {results.map((result, index) => (
                                <div key={index} className="search-result-item">
                                    {result}
                                </div>
                            ))}
                            {suggestions.map((item) => (
                                <div
                                    key={item}
                                    className="search-result-item suggestion"
                                    onClick={() => handleSuggestionClick(item)}
                                >
                                    {suggestionMapping[item]}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </>
    );
};
