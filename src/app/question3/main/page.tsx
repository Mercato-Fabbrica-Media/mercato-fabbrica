import Banner from "~/app/_components/Banner";
import QuestionComponent from "~/app/_components/QuestionComponent";
import LoginGate from "~/app/_components/LoginGate";
import { getQuestionnaireSectionSummary } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 5;
export const dynamic = "force-dynamic";

export default async function QuestionPage() {
  const section = await getQuestionnaireSectionSummary(QUESTIONNAIRE_ID);

  if (!section) {
    notFound();
  }

  return (
    <LoginGate>
      <Banner
        mainImageSrc="/assets/images/question3-main.png"
        highlight={`Artist Highlight: Pierre Bergian, The Abstract Painting, 2019  (oil on canvas)`}
      >
        <div className="tracking-[0.01em] leading-[1.08] font-central-avenue text-center text-white uppercase drop-shadow-lg text-[32px] lg:text-[72px]">
          <div>ARTISTIC<br/>PREFERENCES<br/><span className="normal-case">and</span> CREATIVE<br/>ENGAGEMENT</div>
        </div>
      </Banner>
      <QuestionComponent
        description={section.description?.trim().toUpperCase()}
        sectionTitle={section.ctaText?.trim().toUpperCase() ?? "SECTION"}
        privacyNotice={section.disclaimer ?? undefined}
        previousUrl="/question3"
        nextUrl={
          section.firstQuestionId
            ? `/question3/${section.firstQuestionId}`
            : "/question3"
        }
      />
    </LoginGate>
  );
}
