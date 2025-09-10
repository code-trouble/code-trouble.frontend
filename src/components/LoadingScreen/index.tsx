import React from "react";
import { logoCodeTrouble } from "../../assets/images/png";
import { CodeLogo } from "../../assets/images/svg";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="centered-logo">
        <img src={logoCodeTrouble} alt="Code Trouble Icon" />
      </div>

      <div className="bottom-content">
        <img
          src={CodeLogo}
          alt="Logo Principal Code Trouble"
          className="bottom-logo"
        />
      </div>
    </div>
  );
};
