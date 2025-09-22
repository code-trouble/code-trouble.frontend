import React, { useState, useRef } from "react";
import {
  imgUploadIcon,
  pfpAddIcon,
  pfpPageBanner, // Placeholder
  fulanoPfp, // Placeholder
} from "../../assets/images/png";
import { useUserStore } from "../../stores/userStore";
import { toast } from "sonner";
import { api } from "../../services/api";
import axios from "axios";

interface SignatureResponse {
  timestamp: number;
  signature: string;
  folder: string;
  api_key: string;
  cloud_name: string;
}

export const ProfileImages: React.FC = () => {
  const { currentUser, updateProfile } = useUserStore();

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<"banner" | "avatar" | null>(
    null,
  );

  const bannerInputRef = useRef<HTMLInputElement>(null);
  const pfpInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    file: File,
    folder: "user-banners" | "user-pfps",
  ) => {
    const uploadType = folder === "user-banners" ? "banner" : "avatar";
    setIsUploading(uploadType);

    try {
      const { data: signData } = await api.post<SignatureResponse>(
        "/cloudinary/sign-upload",
        { folder },
      );

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.api_key);
      formData.append("timestamp", String(signData.timestamp));
      formData.append("signature", signData.signature);
      formData.append("folder", signData.folder);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`;
      const cloudinaryResponse = await axios.post(cloudinaryUrl, formData);
      const secureUrl = cloudinaryResponse.data.secure_url;

      const fieldToUpdate =
        uploadType === "banner"
          ? { banner_url: secureUrl }
          : { avatar_url: secureUrl };
      await updateProfile(fieldToUpdate);

      toast.success(
        `${uploadType === "banner" ? "Banner" : "Foto de perfil"} atualizada com sucesso!`,
      );
    } catch (error) {
      toast.error(`Falha no upload da imagem.`);
      console.error(error);
    } finally {
      setIsUploading(null);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setBannerPreview(URL.createObjectURL(file));
    handleFileUpload(file, "user-banners");
  };

  const handlePfpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    handleFileUpload(file, "user-pfps");
  };

  const displayBanner =
    bannerPreview || currentUser?.banner_url || pfpPageBanner;
  const displayPfp = avatarPreview || currentUser?.avatar_url || fulanoPfp;

  return (
    <div className="banner-pfp">
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        onChange={handleBannerChange}
        style={{ display: "none" }}
      />
      <input
        ref={pfpInputRef}
        type="file"
        accept="image/*"
        onChange={handlePfpChange}
        style={{ display: "none" }}
      />

      <div
        className="banner-area"
        onClick={() => bannerInputRef.current?.click()}
        style={{ cursor: "pointer" }}
      >
        <img src={displayBanner} alt="Banner do usuário" className="banner" />
        <img src={imgUploadIcon} alt="Ícone de upload" className="uploadIcon" />
        {isUploading === "banner" && (
          <div className="spinner-overlay">Enviando...</div>
        )}
      </div>

      <div className="pfp-area">
        <img className="pfp-image" src={displayPfp} alt="Foto de perfil" />
        <button
          className="upload-btn pfp-upload"
          type="button"
          onClick={() => pfpInputRef.current?.click()}
          aria-label="Upload profile picture"
        >
          <img
            src={pfpAddIcon}
            alt="Ícone de adicionar foto"
            className="pfp-add-icon"
          />
        </button>
        {isUploading === "avatar" && (
          <div className="spinner-overlay-pfp">Enviando...</div>
        )}
      </div>
    </div>
  );
};
