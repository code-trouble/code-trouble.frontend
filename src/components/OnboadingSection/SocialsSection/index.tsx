import {
  behanceSocial,
  dribbleSocial,
  githubSocial,
  linkedinSocial,
} from "../../../assets/images/svg/icons";
import { SectionContainer } from "../SectionContainer";
import { useOnboardingStore } from "../../../stores/onboardingStore";
import { SocialLinks } from "../../../types/onboardingSectionTypes";

const platformConfig: Record<
  keyof SocialLinks,
  { label: string; icon: string; placeholder: string }
> = {
  linkedin: {
    label: "LinkedIn",
    icon: linkedinSocial,
    placeholder: "linkedin.com/in/seu-usuario",
  },
  github: {
    label: "GitHub",
    icon: githubSocial,
    placeholder: "github.com/seu-usuario",
  },
  dribbble: {
    label: "Dribbble",
    icon: dribbleSocial,
    placeholder: "dribbble.com/seu-usuario",
  },
  behance: {
    label: "Behance",
    icon: behanceSocial,
    placeholder: "behance.net/seu-usuario",
  },
};

const platformKeys = Object.keys(platformConfig) as Array<keyof SocialLinks>;

export const SocialsSection = () => {
  const { socialLinks, updateSocialLink } = useOnboardingStore();

  return (
    <SectionContainer
      sectionTitle="Redes Sociais"
      sectionDescription="Conecte suas redes para que outros possam te encontrar."
      sectionContent={
        <div className="socials-section">
          {platformKeys.map((platformName) => {
            const config = platformConfig[platformName];
            return (
              <div className="social-wrapper" key={platformName}>
                <div className="social-title">
                  <img src={config.icon} alt={`${config.label} icon`} />
                  <h2>{config.label}</h2>
                </div>
                <div className="social-input">
                  <input
                    placeholder={config.placeholder}
                    value={socialLinks[platformName]}
                    onChange={(e) =>
                      updateSocialLink(platformName, e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      }
    />
  );
};
