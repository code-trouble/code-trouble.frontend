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
        <div className="blog-wrapper" style={image ? { display: "flex", alignItems: "center" } : {}}>
            <div className="blog-post">
                <Avatar sizes="medium" name="Joana Lima"/>
                <div className="blog-post-content">
                    <div className="blog-post-text">
                        <h1>{blogPostTitle}</h1>
                        <p>{blogPostDescription}</p>
                    </div>
                </div>
                <div className="blog-post-footer">
                    <div className="blog-post-footer-left">
                        <p className="date-p">10 Nov, 2024</p>
                        <p>
                            <img src={heart} alt="heart" />
                            120K
                        </p>
                        <p>
                            <img src={comments} alt="comments" />
                            302
                        </p>
                    </div>
                    <div>
                        <img src={favorite} alt="favorite icon"/>
                    </div>
                </div>
            </div>
            {image && <img src={dogImage} alt=""/>}
        </div>
    );
};
