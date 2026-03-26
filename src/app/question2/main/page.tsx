import Banner from "~/app/_components/Banner";
import QuestionComponent from "~/app/_components/QuestionComponent";
import LoginGate from "~/app/_components/LoginGate";
import { getQuestionnaireSectionSummary } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 4;
export const dynamic = "force-dynamic";

export default async function QuestionPage() {
  const section = await getQuestionnaireSectionSummary(QUESTIONNAIRE_ID);
  // const disclaimer = section.disclaimer;
  if (!section) {
    notFound();
  }

  return (
    <LoginGate>
      <Banner
        highlight={`Artist Highlight: Luciano Ventrone, Il disegno dell'onda, 2009 (oil and mixed media on canvas)`}
        mainImageSrc="/assets/images/question2-main.png"
      >
        <div className="leading-[1.18] tracking-[0.01em] font-central-avenue text-center text-white uppercase text-[32px] lg:text-[72px] antialiased">
          <div>{section.title?.trim().toUpperCase() ?? "QUESTIONNAIRE"}</div>
        </div>
      </Banner>
      <QuestionComponent
        description={section.description?.trim().toUpperCase()}
        sectionTitle={section.ctaText?.trim().toUpperCase() ?? "SECTION"}
        privacyNotice={section.disclaimer ?? undefined}
        previousUrl="/question2"
        nextUrl={
          section.firstQuestionId
            ? `/question2/${section.firstQuestionId}`
            : "/question2"
        }
      />
    </LoginGate>
  );
}
