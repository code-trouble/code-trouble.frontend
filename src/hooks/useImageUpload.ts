import { useState } from "react";
import { cloudinaryService } from "../services/cloudinaryService";
import { toast } from "sonner";
import { api } from "../services/api";

interface UseImageUploadOptions {
  onSuccess?: (url: string) => void;
  onError?: (error: Error) => void;
  maxSizeMB?: number;
  showToast?: boolean;
}

interface MoveTmpImagesOptions {
  deltas: any[]; // list of deltas (description, details, etc.)
}

export const useImageUpload = (options: UseImageUploadOptions = {}) => {
  const { onSuccess, onError, maxSizeMB = 5, showToast = true } = options;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      cloudinaryService.validateFile(file, maxSizeMB);

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const result = await cloudinaryService.uploadFile(file, folder);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (onSuccess) {
        onSuccess(result.url);
      }

      if (showToast) {
        toast.success("Imagem enviada com sucesso!");
      }

      return result.url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao enviar imagem";
      setError(errorMessage);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }

      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const uploadBase64 = async (
    base64String: string,
    folder: string,
  ): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await cloudinaryService.uploadBase64(base64String, folder);

      if (onSuccess) {
        onSuccess(result.url);
      }

      if (showToast) {
        toast.success("Imagem processada com sucesso!");
      }

      return result.url;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao processar imagem";
      setError(errorMessage);

      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage));
      }

      if (showToast) {
        toast.error(errorMessage);
      }

      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    folder: string,
  ): Promise<string | null> => {
    const file = event.target.files?.[0];
    if (!file) return null;

    return await uploadFile(file, folder);
  };

  async function moveTmpImagesInDeltas({
    deltas,
  }: MoveTmpImagesOptions): Promise<void> {
    const allImages: string[] = [];

    deltas.forEach((delta) => {
      if (!delta?.ops) return;
      delta.ops.forEach((op: any) => {
        if (op.insert?.image) {
          allImages.push(op.insert.image);
        }
      });
    });

    if (allImages.length === 0) return;

    await api.post("/cloudinary/move-tmp-to-post", { urls: allImages });
  }

  const reset = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setError(null);
  };

  return {
    uploadFile,
    uploadBase64,
    handleFileChange,
    moveTmpImagesInDeltas,
    isUploading,
    uploadProgress,
    error,
    reset,
  };
};
