import { useNavigate } from "react-router-dom";
import { usePostStore } from "../stores/postStore";
import { Post } from "../types/postTypes";

export const usePostActions = () => {
  const { deletePost, loadPostForEdit } = usePostStore();
  const navigate = useNavigate();

  const handleDelete = async (postId: number, redirectPath: string = "/") => {
    if (window.confirm("Tem certeza que deseja deletar este post?")) {
      try {
        await deletePost(postId);
        navigate(redirectPath);
        return true;
      } catch (error) {
        console.error("Erro ao deletar:", error);
        return false;
      }
    }
    return null;
  };

  const handleEdit = (post: Post, editPath?: string) => {
    loadPostForEdit(post);

    const path =
      editPath ||
      (post.kind === "question" ? "/ask-a-question" : "/write-a-post");
    navigate(path);
  };

  return { handleDelete, handleEdit };
};
