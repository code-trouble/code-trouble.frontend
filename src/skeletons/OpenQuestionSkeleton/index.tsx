import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const OpenQuestionSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="open-question-container">
      <div className="open-question-inner-container">
        <div className="title-wrapper">
          <Skeleton
            height={40}
            style={{ maxWidth: "80%", marginBottom: "8px" }}
          />
          <Skeleton height={20} width={200} />
        </div>

        <div
          className="tagList-area"
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          {[90, 110, 75, 100].map((width, i) => (
            <Skeleton key={i} height={32} width={width} borderRadius="16px" />
          ))}
        </div>

        <div className="question-description" style={{ marginTop: "24px" }}>
          <Skeleton count={4} />
          <Skeleton width="70%" />
        </div>

        <div
          className="bottomGroupDiv"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          <div
            className="commentsNlikes"
            style={{ display: "flex", gap: "16px" }}
          >
            <Skeleton height={24} width={80} />
            <Skeleton height={24} width={80} />
          </div>
          <div
            className="favoritesNoptions"
            style={{ display: "flex", gap: "16px" }}
          >
            <Skeleton circle height={28} width={28} />
            <Skeleton circle height={28} width={28} />
          </div>
        </div>

        <div
          className="questionCreator"
          style={{
            marginTop: "32px",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "24px",
          }}
        >
          <Skeleton height={20} width={150} style={{ marginBottom: "16px" }} />
          <div
            className="followUser"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <Skeleton circle height={60} width={60} />
            <Skeleton height={36} width={90} borderRadius="8px" />
          </div>
        </div>

        <div className="answersArea" style={{ marginTop: "32px" }}>
          <div
            className="upperAnswers"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <Skeleton height={28} width={120} />
            <Skeleton height={40} width={220} borderRadius="8px" />
          </div>

          {[1, 2].map((key) => (
            <div
              key={key}
              className="answerDisplayBlock"
              style={{
                display: "flex",
                gap: "16px",
                borderTop: "1px solid #e5e7eb",
                paddingTop: "24px",
                marginBottom: "24px",
              }}
            >
              <div className="answerUserArea" style={{ textAlign: "center" }}>
                <Skeleton circle height={48} width={48} />
                <Skeleton height={36} width={80} style={{ marginTop: "8px" }} />
              </div>
              <div className="answerText" style={{ flex: 1 }}>
                <Skeleton count={3} />
                <Skeleton width="80%" />
              </div>
            </div>
          ))}

          <div
            className="answerForm"
            style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px" }}
          >
            <Skeleton
              height={36}
              width={180}
              style={{ marginBottom: "16px" }}
            />
            <Skeleton
              height={150}
              style={{ marginBottom: "16px", borderRadius: "8px" }}
            />
            <Skeleton height={48} width={200} borderRadius="8px" />
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);
