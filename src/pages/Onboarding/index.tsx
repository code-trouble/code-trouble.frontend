import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { InterestSection } from "../../components/OnboadingSection/InterestSection";
import { ProfileDetailsSection } from "../../components/OnboadingSection/ProfileDetailsSection";
import { SocialsSection } from "../../components/OnboadingSection/SocialsSection";
import OnboardingStepper from "../../components/Stepper";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useUserStore } from "../../stores/userStore";
import { toast } from "sonner";

export const Onboarding = () => {
  const { interestTagIds, profileDetails, socialLinks, resetOnboardingState } =
    useOnboardingStore();
  const { updateProfile, updateUserInterests } = useUserStore();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const interestsArray = Array.from(interestTagIds);
      const profileData = { ...profileDetails, social_links: socialLinks };
      console.log(interestsArray);

      await Promise.all([
        updateUserInterests(interestsArray),
        updateProfile(profileData),
      ]);

      toast.success("Perfil salvo com sucesso!");
      resetOnboardingState();
      navigate("/profile");
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar seu perfil. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="onboardingWrapper" onSubmit={handleSubmit}>
      <div className="onboarding-details">
        <div className="onboarding-header">
          <h1>Complete seu perfil</h1>
          <CustomButton
            onClick={() => navigate("/")}
            backgroundColor="#2DBA4F"
            padding="8px 54px"
            text="Preencher Depois"
            borderRadius="8px"
            color="#fff"
            type="button"
          />
        </div>
        <InterestSection />
        <ProfileDetailsSection />
        <SocialsSection />

        <CustomButton
          text={isSubmitting ? "Salvando..." : "Finalizar"}
          padding="8px 135px"
          backgroundColor="#2DBA4F"
          color="white"
          customId="submitButton"
          type="submit"
          disabled={isSubmitting}
        />
      </div>

      <div className="desktop-tracker">
        <OnboardingStepper
          steps={["Interesses", "Detalhes do perfil", "Conecte suas redes"]}
          activeStep={1}
          connectorHeights={[173, 941]}
        />
      </div>
    </form>
  );
};
