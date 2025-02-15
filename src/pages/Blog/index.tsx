import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { Tag } from "../../components/Tag";
import { Avatar } from "../../components/Avatar";
import { BlogPostPreview } from "../../components/BlogPostPreview";
import { Pagination } from "../../components/QuestionsPagination";

interface IBlogPost {
    title: string;
    description: string;
    image?: boolean;
}

const tags = ["Design", "Programação", "Arte", "Ciência de Dados", "Tecnologia"];

const blogPosts: IBlogPost[] = [
    {
        title: "Como faz array no javascript?",
        description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
        image: true,
    },
    {
        title: "Entendendo closures em JavaScript",
        description: "Uma explicação rápida sobre closures e seu funcionamento no JS.",
        image: true,
    },
    {
        title: "Dicas para otimizar performance em React",
        description: "Aprenda técnicas para melhorar a performance dos seus componentes.",
        image: true,
    },
    {
        title: "Introdução ao TypeScript",
        description: "Um guia básico para começar a utilizar TypeScript em seus projetos.",
        image: true,
    },
    {
        title: "Estilos dinâmicos com Styled Components",
        description: "Como aplicar estilos dinâmicos em React usando Styled Components.",
        image: true,
    },
    {
        title: "Gerenciando estado com Redux",
        description: "Conceitos essenciais para utilizar Redux em aplicações React.",
        image: true,
    },
    {
        title: "React Hooks: useState e useEffect",
        description: "Aprenda a usar os principais hooks do React para gerenciar estado e efeitos colaterais.",
        image: true,
    },
    {
        title: "Construindo uma API REST com Node.js",
        description: "Passo a passo para criar uma API RESTful utilizando Node.js e Express.",
        image: true,
    },
    {
        title: "Post 9",
        description: "Descrição do post 9.",
        image: true,
    },
    {
        title: "Post 10",
        description: "Descrição do post 10.",
        image: true,
    },
    {
        title: "Post 11",
        description: "Descrição do post 11.",
        image: true,
    },
    {
        title: "Post 12",
        description: "Descrição do post 12.",
        image: false,
    },
    {
        title: "Como faz array no javascript?",
        description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
        image: false,
    },
    {
        title: "Entendendo closures em JavaScript",
        description: "Uma explicação rápida sobre closures e seu funcionamento no JS.",
        image: true,
    },
    {
        title: "Dicas para otimizar performance em React",
        description: "Aprenda técnicas para melhorar a performance dos seus componentes.",
        image: false,
    },
    {
        title: "Introdução ao TypeScript",
        description: "Um guia básico para começar a utilizar TypeScript em seus projetos.",
        image: true,
    },
    {
        title: "Estilos dinâmicos com Styled Components",
        description: "Como aplicar estilos dinâmicos em React usando Styled Components.",
        image: false,
    },
    {
        title: "Gerenciando estado com Redux",
        description: "Conceitos essenciais para utilizar Redux em aplicações React.",
        image: false,
    },
    {
        title: "React Hooks: useState e useEffect",
        description: "Aprenda a usar os principais hooks do React para gerenciar estado e efeitos colaterais.",
        image: true,
    },
    {
        title: "Construindo uma API REST com Node.js",
        description: "Passo a passo para criar uma API RESTful utilizando Node.js e Express.",
        image: false,
    },
    {
        title: "Post 9",
        description: "Descrição do post 9.",
        image: false,
    },
    {
        title: "Post 10",
        description: "Descrição do post 10.",
        image: false,
    },
    {
        title: "Post 11",
        description: "Descrição do post 11.",
        image: true,
    },
    {
        title: "Post 12",
        description: "Descrição do post 12.",
        image: false,
    }
];

export const Blog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
    const displayedPosts = blogPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="blog-container">
            <Header theme="blue" loggedIn={false} />
            <div className="blog-inner-container">
                <div className="paginationWrapper">
                    <div className="blog-area">
                        <div className="blog-title">
                            <h1>Todos os Posts</h1>
                            <CustomButton
                                backgroundColor="#3348A4"
                                color="white"
                                fontWeight="500"
                                fontSize="18px"
                                text="Perguntar"
                                padding="8px 41px"
                            />
                        </div>
                        <div className="category-selection-blue">
                            <a href="#">Para Você</a>
                            <a href="#">Seguindo</a>
                            <a href="#">Design</a>
                            <a href="#">Desenvolvimento</a>
                            <a href="#">UX</a>
                            <a href="#">UI</a>
                        </div>
                        <div className="blog-list">
                            {displayedPosts.map((post, index) => (
                                <BlogPostPreview
                                    key={index}
                                    blogPostTitle={post.title}
                                    blogPostDescription={post.description}
                                    image={post.image}
                                />
                            ))}
                        </div>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        activeColor="#3348A4"
                        customId="blogPagination"
                    />
                </div>

                <div className="right-side">
                    <div className="community-choices">
                        <h2>Escolhas da Comunidade</h2>
                        <div className="community-choice">
                            <Avatar sizes="medium" name="Joana Lima" />
                            <p>Porque Designer Merece mais</p>
                        </div>
                        <div className="community-choice">
                            <Avatar sizes="medium" name="Joana Lima" />
                            <p>Pix agora ou agora?</p>
                        </div>
                        <div className="community-choice">
                            <Avatar sizes="medium" name="Joana Lima" />
                            <p>Porque dev não merece mais</p>
                        </div>
                        <a href="">Ver lista completa</a>
                    </div>
                    <div className="topics-area">
                        <div className="recommended-topics">
                            <h2>Tópicos Recomendados</h2>
                            <div className="tag-group">
                                <Tag tags={tags} />
                            </div>
                            <span>Ver mais tópicos</span>
                        </div>
                    </div>
                    <div className="who-to-follow">
                        <h2>Quem Seguir</h2>
                        <div className="follow-area">
                            <div className="follow-block">
                                <div className="follow-info">
                                    <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                                    <CustomButton
                                        padding="4.5px 12px"
                                        text="Seguir"
                                        border="2px solid #3348A4"
                                        color="#3348A4"
                                        borderRadius="75px"
                                    />
                                </div>
                                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
                            </div>
                            <div className="follow-block">
                                <div className="follow-info">
                                    <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                                    <CustomButton
                                        padding="4.5px 12px"
                                        text="Seguir"
                                        border="2px solid #3348A4"
                                        color="#3348A4"
                                        borderRadius="75px"
                                    />
                                </div>
                                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
                            </div>
                            <div className="follow-block">
                                <div className="follow-info">
                                    <Avatar sizes="medium" role="Ela/Dela" name="Joana Lima" />
                                    <CustomButton
                                        padding="4.5px 12px"
                                        text="Seguir"
                                        border="2px solid #3348A4"
                                        color="#3348A4"
                                        borderRadius="75px"
                                    />
                                </div>
                                <p>Biografia do usuário, o que ele colocar no perfil e etc</p>
                            </div>
                            <a href="">Ver mais sugestões</a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
