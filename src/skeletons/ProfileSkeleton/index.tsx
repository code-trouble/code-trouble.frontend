import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="profile-page-wrapper">
      <Skeleton height={193} />
      <div className="profile-details">
        <div className="userInfo">
          <div
            className="avatarDisplay"
            style={{
              position: "absolute",
              top: "170px",
            }}
          >
            <Skeleton circle height={205} width={205} />
          </div>
          <Skeleton height={32} width={180} style={{ marginTop: "86px" }} />
          <Skeleton height={20} width={80} style={{ marginTop: "8px" }} />
        </div>
        <div className="userActions">
          <Skeleton height={40} width={200} style={{ marginBottom: "24px" }} />
          <Skeleton height={24} width={100} style={{ marginBottom: "16px" }} />
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[80, 60, 90, 70, 85].map((width, i) => (
              <Skeleton key={i} height={32} width={width} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </SkeletonTheme>
);
