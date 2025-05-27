import { Header } from "../../components/Header";
import { PostWriter } from "../../components/PostWriter";


export const WriteAPost: React.FC = () => {
    return (
        <div className="writeAPost-container">
            <Header loggedIn={true} theme="blue"/>
                <PostWriter layout="blog" />
        </div>

    );
};

