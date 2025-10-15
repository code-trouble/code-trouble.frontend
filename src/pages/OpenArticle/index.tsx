import { AddToFavorite, ThreeDotsMenu } from "../../assets/images/svg";
import { blueComment, blueHeart } from "../../assets/images/svg/icons";
import { Avatar } from "../../components/Avatar";

import { TagList } from "../../components/Tag";

export const OpenArticle: React.FC = () => {
  const tags = ["teste", "teste", "teste", "teste"];

  return (
    <div className="open-article-wrapper">
      <div className="open-article-content">
        <div className="text-block">
          <h1>Poruqe Designers merecem mais?</h1>
          <p>
            Pix e férias são mais importantes que respirar, afirmam
            espcialistas.
          </p>
        </div>
        <div className="socials-block">
          <Avatar name="Joana Lima" sizes="large" />
          <button>Seguir</button>
        </div>
        <div className="post-details">
          <div className="likes-and-actions">
            <div className="likes-comments">
              <p>
                <img src={blueHeart} />
                120k
              </p>
              <p>
                <img src={blueComment} />
                301
              </p>
            </div>
            <div className="favorites-and-options">
              <img src={AddToFavorite} alt="add to favorites" />
              <div>
                <img src={ThreeDotsMenu} alt="menu with 3 dots" />
              </div>
            </div>
          </div>
          <div className="tagList-area">
            {tags.length > 0 ? (
              <TagList tags={tags} />
            ) : (
              <code>(sem tags)</code>
            )}
          </div>
        </div>
      </div>

      <div className="open-article-extras"></div>
    </div>
  );
};
