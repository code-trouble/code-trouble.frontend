import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import type { StepIconProps } from "@mui/material/StepIcon";
import { TrackConfirm, TrackTwo, TrackThree } from "../../assets/images/svg";

const VerticalConnector = styled(StepConnector)<{ completed?: boolean }>(
  ({ completed }) => ({
    [`&.${stepConnectorClasses.vertical}`]: { marginLeft: 23 },
    [`& .${stepConnectorClasses.line}`]: {
      borderLeft: `2px solid ${completed ? "#22C55E" : "#CBD5E1"}`, // Green when completed, gray otherwise
      marginTop: 10,
      marginBottom: 15,
      minHeight: 0,
      transition: "border-color 0.3s ease", // Smooth transition
    },
  }),
);

function OnboardingStepIcon(props: StepIconProps) {
  const { icon, completed } = props;
  const n = Number(icon);
  const map: Record<number, string> = {
    1: TrackConfirm,
    2: TrackTwo,
    3: TrackThree,
  };
  const src = completed ? TrackConfirm : (map[n] ?? TrackConfirm);
  return (
    <img src={src} alt="" style={{ width: 50, height: 50, display: "block" }} />
  );
}

type OnboardingStepperProps = {
  steps?: string[];
  activeStep?: number;
  connectorHeights?: number[];
  // New props for tracking completion status
  hasSelectedTags?: boolean;
  hasFilledProfileDetails?: boolean;
  hasConnectedSocials?: boolean;
};

export default function OnboardingStepper({
  steps = ["Interesses", "Detalhes do perfil", "Conecte suas redes"],
  activeStep = 1,
  connectorHeights = [],
  hasSelectedTags = false,
  hasFilledProfileDetails = false,
  hasConnectedSocials = false,
}: OnboardingStepperProps) {
  // Determine which connectors should be green
  const getConnectorCompleted = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // First connector (between step 1 and 2)
        return hasSelectedTags;
      case 1: // Second connector (between step 2 and 3)
        return hasFilledProfileDetails;
      default:
        return false;
    }
  };

  // Determine which steps should show as completed (with checkmark)
  const getStepCompleted = (stepIndex: number): boolean => {
    switch (stepIndex) {
      case 0: // First step (Interesses)
        return hasSelectedTags;
      case 1: // Second step (Detalhes do perfil)
        return hasFilledProfileDetails;
      case 2: // Third step (Conecte suas redes)
        return hasConnectedSocials;
      default:
        return false;
    }
  };

  return (
    <Stepper
      orientation="vertical"
      activeStep={activeStep}
      connector={<VerticalConnector />}
    >
      {steps.map((label, idx) => {
        const isStepCompleted = getStepCompleted(idx);
        const connectorCompleted = getConnectorCompleted(idx);

        return (
          <Step
            key={label}
            completed={isStepCompleted}
            sx={
              connectorHeights[idx] !== undefined
                ? {
                    [`& + .MuiStepConnector-root`]: {
                      // Apply the completed prop to the connector
                      ...(connectorCompleted && {
                        [`& .${stepConnectorClasses.line}`]: {
                          borderLeftColor: "#22C55E",
                        },
                      }),
                    },
                    [`& + .MuiStepConnector-root .${stepConnectorClasses.line}`]:
                      {
                        height: `${connectorHeights[idx]}px`,
                      },
                  }
                : connectorCompleted
                  ? {
                      [`& + .MuiStepConnector-root .${stepConnectorClasses.line}`]:
                        {
                          borderLeftColor: "#22C55E",
                          transition: "border-left-color 0.3s ease",
                        },
                    }
                  : undefined
            }
          >
            <StepLabel slots={{ stepIcon: OnboardingStepIcon }}>
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
