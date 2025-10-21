import { blueUpvote, logosArticleImg } from "../../assets/images/png";
import { ThreeDotsMenu } from "../../assets/images/svg";
import { blueComment } from "../../assets/images/svg/icons";

interface IMoreArticlesPreview {
  imgSrc?: string;
  author?: string;
  authorPfp?: string;
  articleLikes?: string;
  articleComments?: string;
  date?: string;
  title?: string;
  tags?: string;
  onClick?: () => void;
}

const MoreArticlesPreview: React.FC<IMoreArticlesPreview> = ({
  author,
  authorPfp,
  articleComments,
  articleLikes,
  date,
  title,
  tags,
  onClick,
}) => {
  return (
    <div className="more-article-card" onClick={onClick}>
      <div className="card-image">
        {/* <img src={imgSrc} alt="" /> */}

        <img src={logosArticleImg} alt="" />
      </div>

      <div className="card-content">
        <div className="author-info">
          <img src={authorPfp} alt={author} className="author-avatar" />
          <span className="author-name">{author}</span>
        </div>

        <h3 className="article-title">{title}</h3>

        <p className="article-tags">{tags}</p>

        <div className="card-footer">
          <div className="left-footer-side">
            <span className="article-date">{date}</span>
            <div className="article-stats">
              <span className="likes">
                <img src={blueUpvote} alt="" /> {articleLikes}
              </span>
              <span className="comments">
                <img src={blueComment} alt="" /> {articleComments}
              </span>
            </div>
          </div>
          <button className="more-options">
            <img src={ThreeDotsMenu} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreArticlesPreview;
