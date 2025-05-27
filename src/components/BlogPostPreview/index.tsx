import React from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/icons/blueComment.svg"
import heart from "../../assets/images/svg/icons/blueHeart.svg"
import favorite from "../../assets/images/svg/icons/favoriteBlog.svg"
import dogImage from "../../assets/images/png/dogImage.png"

interface IBlogPostPreview {
    blogPostTitle: string;
    blogPostDescription: string;
    image?: boolean;
}

export const BlogPostPreview: React.FC<IBlogPostPreview> = ({ blogPostTitle, blogPostDescription, image }) => {
    return (
        <div className="outer-post-wrapper">
            <div className="post-wrapper">
                <div className="post-content">
                    <Avatar name="Joana Lima" sizes="medium"/>
                    <h1 className="blog-post-title">{blogPostTitle}</h1>
                    <p className="blog-post-description">{blogPostDescription}</p>
                    <div className="blog-post-footer">
                        <div className="main-footer">
                            <span>10 Nov, 2024</span>
                            <p><img src={heart} alt="like icon"/> 120k</p>
                            <p><img src={comments} alt="comments icon"/> 302</p>
                        </div>
                        <div className="sub-footer">
                            <img src={favorite} alt="favorite icon" />
                        </div>
                    </div>
                </div>
                {image && ( // Conditionally render the image container
                    <div className="post-image">
                        <img src={dogImage} alt="Blog Post placeholder image" />
                    </div>
                )}


            </div>
            <div className="blog-post-mobile-footer">
                <div className="main-footer">
                    <span>10 Nov, 2024</span>
                    <p><img src={heart} alt="like icon"/> 120k</p>
                    <p><img src={comments} alt="comments icon"/> 302</p>
                </div>
                <div className="sub-footer">
                    <img src={favorite} alt="mobile favorite icon" />
                </div>
            </div>
        </div>               
    );
};
