import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const QuestionPreviewSkeleton = () => (
  <div
    className="questions-preview-container"
    style={{
      display: "flex",
      gap: "24px",
      borderTop: "1px solid #e5e7eb",
      padding: "16px 0",
    }}
  >
    <div
      className="question-stats"
      style={{ textAlign: "center", minWidth: "60px" }}
    >
      <Skeleton height={20} width={40} />
      <Skeleton height={16} width={50} style={{ marginTop: "8px" }} />
    </div>

    <div className="question-summary" style={{ flex: 1 }}>
      <Skeleton height={24} width="80%" />
      <Skeleton count={2} style={{ marginTop: "8px" }} />
      <div
        className="question-meta"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
        }}
      >
        <div className="tags" style={{ display: "flex", gap: "8px" }}>
          <Skeleton height={24} width={70} borderRadius="12px" />
          <Skeleton height={24} width={90} borderRadius="12px" />
        </div>
        <div
          className="author-info"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Skeleton circle height={24} width={24} />
          <Skeleton height={20} width={120} />
        </div>
      </div>
    </div>
  </div>
);

export const QuestionsSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="questions-container">
      <div
        className="questions-inner-container"
        style={{ display: "flex", gap: "32px" }}
      >
        <div className="left-side" style={{ flex: 3 }}>
          <div className="questions-area">
            <div
              className="questions-title"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton height={40} width={300} />
              <Skeleton height={44} width={150} borderRadius="8px" />
            </div>
            <div
              className="category-selection"
              style={{
                display: "flex",
                gap: "16px",
                marginTop: "24px",
                border: "1px solid #e5e7eb",
                padding: "8px",
                borderRadius: "8px",
                width: "fit-content",
              }}
            >
              {[60, 50, 70, 70, 50].map((width, i) => (
                <Skeleton
                  key={i}
                  height={28}
                  width={width}
                  borderRadius="6px"
                />
              ))}
            </div>
            <div className="questions-list" style={{ marginTop: "16px" }}>
              {Array.from({ length: 7 }).map((_, index) => (
                <QuestionPreviewSkeleton key={index} />
              ))}
            </div>
          </div>
          <div
            className="pagination-area"
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "32px",
            }}
          >
            <Skeleton height={36} width={300} borderRadius="8px" />
          </div>
        </div>

        <div className="right-side" style={{ flex: 1, minWidth: "250px" }}>
          <div
            className="topics-area"
            style={{
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <Skeleton
              height={28}
              width="90%"
              style={{ marginBottom: "16px" }}
            />
            <div
              className="tag-group"
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              {[80, 110, 60, 150, 100, 70].map((width, i) => (
                <Skeleton
                  key={i}
                  height={32}
                  width={width}
                  borderRadius="16px"
                />
              ))}
            </div>
            <Skeleton height={20} width={120} style={{ marginTop: "16px" }} />
          </div>

          <div
            className="custom-filters"
            style={{
              marginTop: "24px",
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          >
            <Skeleton
              height={28}
              width="80%"
              style={{ marginBottom: "16px" }}
            />
            <Skeleton height={32} width="100%" />
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);
