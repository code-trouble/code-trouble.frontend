import { onboardingSectionProps } from "../../../types/onboardingSectionTypes";

export const SectionContainer: React.FC<onboardingSectionProps> = ({
  sectionTitle,
  sectionDescription,
  sectionContent,
}) => {
  return (
    <section className="section-container">
      <h2>{sectionTitle}</h2>
      <p>{sectionDescription}</p>
      <div className="content">{sectionContent}</div>
    </section>
  );
};
