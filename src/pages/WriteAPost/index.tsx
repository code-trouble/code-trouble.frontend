import { PostWriter } from "../../components/PostWriter";

export const WriteAPost: React.FC = () => {
  return (
    <div className="writeAPost-container">
      <PostWriter layout="blog" />
    </div>
  );
};
