interface IMoreArticlesPreview {
  imgSrc?: string;
  author?: string;
  authorPfp?: string;
  articleLikes?: string;
  articleComments?: string;
  date?: string;
  title?: string;
  tags?: string;
}

const MoreArticlesPreview: React.FC<IMoreArticlesPreview> = ({
  imgSrc,
  author,
  authorPfp,
  articleComments,
  articleLikes,
  date,
  title,
  tags,
}) => {
  return (
    <div className="more-article-card">
      <div className="card-image">
        <img src={imgSrc} alt="" />
      </div>

      <div className="card-content">
        <div className="author-info">
          <img src={authorPfp} alt={author} className="author-avatar" />
          <span className="author-name">{author}</span>
        </div>

        <h3 className="article-title">{title}</h3>

        <p className="article-tags">{tags}</p>

        <div className="card-footer">
          <span className="article-date">{date}</span>
          <div className="article-stats">
            <span className="likes">▲ {articleLikes}</span>
            <span className="comments">💬 {articleComments}</span>
          </div>
          <button className="more-options">⋯</button>
        </div>
      </div>
    </div>
  );
};

export default MoreArticlesPreview;
