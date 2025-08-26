import { SectionContainer } from "../SectionContainer";

export const InterestSection = () => {
  return (
    <SectionContainer
      sectionTitle="Selecione seus interesses."
      sectionDescription="Escolha seus principais interesses, posts aparecerão para você com base no que escolher."
      sectionContent={<div className="interest-tags"></div>}
    />
  );
};
