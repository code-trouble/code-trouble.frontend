import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PostWriter } from "../../components/PostWriter";
import { usePostStore } from "../../stores/postStore";
import CustomButton from "../../components/CustomButton";

export const WriteAPost: React.FC = () => {
  const navigate = useNavigate();
  const {
    createPost,
    setTitle: setStoreTitle,
    setBody,
    setKind,
    isLoading,
    error,
    reset,
  } = usePostStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState({});
  const [tags, setTags] = useState<string[]>([]);

  function navigateTo(path: string) {
    window.scrollTo(0, 0);
    navigate(path);
  }

  async function handleSubmit() {
    const combinedBody = {
      content,
      tags,
    };

    try {
      setStoreTitle(title);
      setBody(combinedBody);
      setKind("article");

      const newPost = await createPost();

      setTitle("");
      setContent({});
      setTags([]);
      reset();

      navigateTo(`/articles/${newPost.id}`);
    } catch (error) {
      console.error("Failed to create article:", error);
    }
  }

  function handleDiscard() {
    // Reset form state
    setTitle("");
    setContent({});
    setTags([]);
    reset();

    navigateTo("/articles");
  }

  // Set kind to article when component mounts
  useEffect(() => {
    setKind("article");
  }, [setKind]);

  return (
    <div className="writeAPost-container">
      <PostWriter
        value={content}
        onChange={setContent}
        title={title}
        onTitleChange={setTitle}
        tags={tags}
        onTagsChange={setTags}
      />

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <div
        className="post-actions"
        style={{ marginTop: "20px", display: "flex", gap: "16px" }}
      >
        <CustomButton
          text={isLoading ? "Publicando..." : "Publicar Artigo"}
          onClick={handleSubmit}
          type="button"
          padding="12px 32px"
          backgroundColor="#2DBA4F"
          color="white"
          fontSize="18px"
          fontWeight="500"
          borderRadius="8px"
          disabled={isLoading}
        />
        <CustomButton
          text="Descartar"
          onClick={handleDiscard}
          color="#BA2D2F"
          backgroundColor="transparent"
          border="1px solid #BA2D2F"
          padding="12px 32px"
          fontSize="18px"
          fontWeight="500"
          borderRadius="8px"
        />
      </div>
    </div>
  );
};
