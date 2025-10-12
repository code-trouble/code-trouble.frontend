import axios from "axios";
import { api } from "./api";

interface SignatureResponse {
  timestamp: number;
  signature: string;
  folder: string;
  api_key: string;
  cloud_name: string;
}

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Generic Cloudinary upload service
 * Handles all the low-level upload logic
 */
export const cloudinaryService = {
  /**
   * Upload a file to Cloudinary
   * @param file - The file to upload
   * @param folder - Cloudinary folder (e.g., 'user-pfps', 'post-images')
   * @returns Upload result with URL and metadata
   */
  async uploadFile(file: File, folder: string): Promise<UploadResult> {
    try {
      // Step 1: Get signature from backend
      const { data: signData } = await api.post<SignatureResponse>(
        "/cloudinary/sign-upload",
        { folder },
      );

      // Step 2: Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.api_key);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      // Step 3: Upload to Cloudinary
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`;
      const response = await axios.post(cloudinaryUrl, formData);

      // Step 4: Return clean result
      return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
        width: response.data.width,
        height: response.data.height,
        format: response.data.format,
      };
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  },

  /**
   * Upload a base64 image to Cloudinary
   * @param base64String - Base64 encoded image (with data:image prefix)
   * @param folder - Cloudinary folder
   * @returns Upload result with URL and metadata
   */
  async uploadBase64(
    base64String: string,
    folder: string,
  ): Promise<UploadResult> {
    try {
      // Convert base64 to blob
      const response = await fetch(base64String);
      const blob = await response.blob();

      // Create file from blob
      const file = new File([blob], `image-${Date.now()}.png`, {
        type: blob.type,
      });

      // Use existing uploadFile method
      return await this.uploadFile(file, folder);
    } catch (error) {
      console.error("Base64 upload failed:", error);
      throw new Error("Failed to process base64 image");
    }
  },

  /**
   * Validate file before upload
   * @param file - File to validate
   * @param maxSizeMB - Max file size in MB (default: 5MB)
   * @returns True if valid, throws error if not
   */
  validateFile(file: File, maxSizeMB: number = 5): boolean {
    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Check file size
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new Error(`Image must be smaller than ${maxSizeMB}MB`);
    }

    return true;
  },
};
