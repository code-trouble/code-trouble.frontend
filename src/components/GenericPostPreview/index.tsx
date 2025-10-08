import React from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/icons/blueComment.svg";
import heart from "../../assets/images/svg/icons/blueHeart.svg";
import favorite from "../../assets/images/svg/icons/favoriteBlog.svg";
import dogImage from "../../assets/images/png/dogImage.png";
import { Post } from "../../types/postTypes";
import { formatDate } from "../../utils/formatDate";
import { GreenUpvote } from "../../assets/images/svg";

interface PostPreviewProps {
  post: Post;
  postTitle: string;
  postDescription: string;
  image?: boolean;
  onClick?: () => void;
  kind?: "article" | "question" | "answer";
}

export const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  postTitle,
  postDescription,
  image,
  onClick,
  kind,
}) => {
  const formattedDate = formatDate(post.created_at);
  return (
    <div className="post-preview-container" onClick={onClick}>
      <div className="post-preview">
        <div className="post-preview-content">
          <Avatar
            name={post.author.display_name}
            sizes="medium"
            src={post.author.avatar_url}
          />
          <h1 className="post-preview-title">{postTitle}</h1>
          <p className="post-preview-description">{postDescription}</p>
          <div className="post-preview-footer">
            <div className="footer-stats">
              <span>{formattedDate}</span>
              <p>
                {kind === "question" ? (
                  <img src={GreenUpvote} alt="" />
                ) : (
                  <img src={heart} alt="like icon" />
                )}{" "}
                {post.likeCount || 0}
              </p>
              <p>
                <img src={comments} alt="comments icon" />{" "}
                {post.commentCount || 0}
              </p>
              <code style={{ paddingLeft: "20px" }}>({kind})</code>
            </div>
            <div className="footer-actions">
              <img src={favorite} alt="favorite icon" />
            </div>
          </div>
        </div>
        {image && (
          <div className="post-preview-image">
            <img src={dogImage} alt="Post placeholder image" />
          </div>
        )}
      </div>
      <div className="post-preview-mobile-footer">
        <div className="footer-stats">
          <span>{formattedDate}</span>
          <p>
            {kind === "question" ? (
              <img src={GreenUpvote} alt="" />
            ) : (
              <img src={heart} alt="like icon" />
            )}{" "}
            {post.likeCount || 0}
          </p>
          <p>
            <img src={comments} alt="comments icon" /> {post.commentCount || 0}
          </p>
        </div>
        <div className="footer-actions">
          <img src={favorite} alt="mobile favorite icon" />
        </div>
      </div>
    </div>
  );
};
