import React from "react";
import { Avatar } from "../Avatar";
import comments from "../../assets/images/svg/comments.svg"

export const QuestionsPreview: React.FC = () => {
    return (
        <div className="previewQuestion">
            <h1>Sphinx PDF build failing on reathedocs for Russian Translation</h1>
            <p>PDF build of Sphinx’s own documentation are failing for Russian translation (example build). .readthedocs.yml is set to vuild HTML and then PDFm and its in the second step the failure arises lorem ipsum dolor sit amet lorem ipsum dolor</p>
            <div className="previewQuestion-bottom">
                <div className="previewQuestion-avatar-area">
                    <Avatar sizes="small" name="Joana Lima" role="8 minutos atrás"/>
                    <div className="previewQuestion-comments">
                        <p>4</p>
                        <img src={comments} alt="comments img"/>
                    </div>
                </div>
                <div>
                    tags
                </div>
            </div>
        </div>
    );
};
