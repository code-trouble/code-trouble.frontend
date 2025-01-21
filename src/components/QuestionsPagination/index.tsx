import pagination3Dots from "../../assets/images/svg/pagination3Dots.svg";
import nextPage from "../../assets/images/svg/nextPage.svg";
import previousPage from "../../assets/images/svg/previousPage.svg";

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<IPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        const rangeStart = Math.max(2, Math.min(currentPage - 2, totalPages - maxVisiblePages + 1));
        const rangeEnd = Math.min(totalPages - 1, rangeStart + maxVisiblePages - 2);
    
        for (let i = rangeStart; i <= rangeEnd; i++) {
            pages.push(i);
        }
    
        return pages;
    };
    
    

    const handlePrevious = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div className="pagination">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="pagination-button pagination-control"
            >
                <img src={previousPage} alt="Previous Page" />
            </button>

            {currentPage <= 5 && (
                <button
                    onClick={() => onPageChange(1)}
                    className={`pagination-button ${
                        currentPage === 1 ? "active" : ""
                    }`}
                >
                    1
                </button>
            )}

            {currentPage > 5 && (
                <span className="pagination-dots">
                    <img src={pagination3Dots} alt="3 dots" />
                </span>
            )}

            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`pagination-button ${
                        currentPage === page ? "active" : ""
                    }`}
                >
                    {page}
                </button>
            ))}

            {currentPage + 4 < totalPages && (
                <span className="pagination-dots">
                    <img src={pagination3Dots} alt="3 dots" />
                </span>
            )}

            <button
                onClick={() => onPageChange(totalPages)}
                className={`pagination-button ${
                    currentPage === totalPages ? "active" : ""
                }`}
            >
                {totalPages}
            </button>

            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                <span className="pagination-control">/</span> <img src={nextPage} alt="Next Page" />
            </button>
        </div>
    );
};
