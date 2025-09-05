import { useTagStore } from "../../../stores/tagStore";
import { TagBadge } from "../../TagBadge";
import { SectionContainer } from "../SectionContainer";
import { useOnboardingStore } from "../../../stores/onboardingStore";

export const InterestSection = () => {
  const { tags } = useTagStore();
  const { interestTagIds, setInterests } = useOnboardingStore();

  const handleTagToggle = (tagId: number) => {
    const newActiveIds = new Set(interestTagIds);

    if (newActiveIds.has(tagId)) {
      newActiveIds.delete(tagId);
    } else {
      newActiveIds.add(tagId);
    }

    setInterests(newActiveIds);
    console.log(newActiveIds);
  };

  return (
    <>
      <SectionContainer
        sectionTitle="Selecione seus interesses."
        sectionDescription="Escolha seus principais interesses, posts aparecerão para você com base no que escolher."
        sectionContent={
          <div className="interest-tags tag-list">
            {tags.map((tag) => {
              const isActive = interestTagIds.has(tag.id);

              return (
                <TagBadge
                  key={tag.id}
                  tag={tag}
                  isActive={isActive}
                  onClick={handleTagToggle}
                />
              );
            })}
          </div>
        }
      />
    </>
  );
};
