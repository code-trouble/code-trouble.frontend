import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import type { StepIconProps } from "@mui/material/StepIcon";
import { TrackConfirm, TrackTwo, TrackThree } from "../../assets/images/svg";

const VerticalConnector = styled(StepConnector)({
  [`&.${stepConnectorClasses.vertical}`]: { marginLeft: 23 },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeft: "2px solid #CBD5E1",
    marginTop: 10,
    marginBottom: 15,
    minHeight: 0,
  },
});

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
};

export default function OnboardingStepper({
  steps = ["Interesses", "Detalhes do perfil", "Conecte suas redes"],
  activeStep = 1,
  connectorHeights = [],
}: OnboardingStepperProps) {
  return (
    <Stepper
      orientation="vertical"
      activeStep={activeStep}
      connector={<VerticalConnector />}
    >
      {steps.map((label, idx) => (
        <Step
          key={label}
          completed={idx < activeStep}
          sx={
            connectorHeights[idx] !== undefined
              ? {
                  [`& + .MuiStepConnector-root .${stepConnectorClasses.line}`]:
                    {
                      height: `${connectorHeights[idx]}px`,
                    },
                }
              : undefined
          }
        >
          <StepLabel slots={{ stepIcon: OnboardingStepIcon }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
