import { useNavigate } from "react-router-dom";
import { usePostStore } from "../stores/postStore";
import { Post } from "../types/postTypes";

export const usePostActions = () => {
  const { deletePost, loadPostForEdit } = usePostStore();
  const navigate = useNavigate();

  const handleDelete = async (
    postId: number,
    options?: {
      redirectPath?: string;
      onSuccess?: () => void;
    },
  ) => {
    if (window.confirm("Tem certeza que deseja deletar este post?")) {
      try {
        await deletePost(postId);

        if (options?.onSuccess) {
          options.onSuccess();
        } else if (options?.redirectPath) {
          navigate(options.redirectPath);
        }

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

    // Determine the correct edit path based on post kind
    const path =
      editPath ||
      (post.kind === "question" ? "/ask-a-question" : "/write-a-post");
    navigate(path);
  };

  return { handleDelete, handleEdit };
};
