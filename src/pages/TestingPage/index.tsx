import React from "react";
import { PostWriter } from "../../components/PostWriter";

export const TestingPage: React.FC = () => {
  return (
    <div className="main-wrapper">
      <PostWriter layout="blog" />
    </div>
  );
};
