import CustomButton from "../../components/CustomButton";
import { InterestSection } from "../../components/OnboadingSection/InterestSection";
import OnboardingStepper from "../../components/Stepper";

export const Onboarding = () => {
  return (
    <div className="onboardingWrapper">
      <div className="onboarding-details">
        <div className="onboarding-header">
          <h1>Complete seu perfil</h1>
          <CustomButton
            backgroundColor="#2DBA4F"
            padding="8px 54px"
            text="Preencher Depois"
            borderRadius="8px"
            color="#fff"
          />
        </div>
        <InterestSection />
      </div>

      <div className="desktop-tracker">
        <OnboardingStepper
          steps={["Interesses", "Detalhes do perfil", "Conecte suas redes"]}
          activeStep={1}
          connectorHeights={[173, 941]}
        />
      </div>
    </div>
  );
};
