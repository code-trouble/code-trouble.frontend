import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import CustomButton from "../../components/CustomButton";
import { Tag } from "../../components/Tag";
import { Avatar } from "../../components/Avatar";
import { BlogPostPreview } from "../../components/BlogPostPreview";
import { Pagination } from "../../components/QuestionsPagination";
import { useNavigate } from "react-router-dom";

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
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: true,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
  {
    title: "Como faz array no javascript?",
    description: "Breve descrição aqui, um subtítulo no máximo uns 100 caractéres.",
    image: false,
  },
];

export const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const displayedPosts = blogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

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
                customId="writeAPostButton"
                onClick={() => {
                  navigateTo("/write-a-post");
                }}
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
          <div className="first-two">
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
