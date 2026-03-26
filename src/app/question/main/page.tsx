import Banner from "../../_components/Banner";
import QuestionComponent from "../../_components/QuestionComponent";
import LoginGate from "../../_components/LoginGate";
import { getQuestionnaireSectionSummary } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 3;
export const dynamic = "force-dynamic";

export default async function QuestionPage() {
  const section = await getQuestionnaireSectionSummary(QUESTIONNAIRE_ID);

  if (!section) {
    notFound();
  }

//  const disclaimer = section.disclaimer

  return (
    <LoginGate>
      <Banner
        mainImageSrc="/assets/images/question.png"
        highlight={`Artist Highlight: Ivan Arlaud, Ètude Table Composèe, 2024 (Acrylic on canvas)`}
      >
        <div className="leading-[1.18] tracking-[0.01em] font-central-avenue text-center text-white uppercase text-[32px] md:text-[72px] antialiased">
          {/* <div>{section.title?.trim().toUpperCase() ?? "QUESTIONNAIRE"}</div> */}
          <div>LIFESTYLE<br/> <span className="relative top-[3px] ml-2 align-super text-[1.3rem] lg:text-[2.2rem] lg:-top-[2px] font-normal underline">AND</span> PERSONAL PREFERENCES</div>
        </div>
      </Banner>
      <QuestionComponent
        description={section.description?.trim().toUpperCase()}
        sectionTitle={section.ctaText?.trim().toUpperCase() ?? "SECTION 01"}
        privacyNotice={section.disclaimer ?? undefined}
        previousUrl="/question"
        nextUrl={
          section.firstQuestionId
            ? `/question/${section.firstQuestionId}`
            : "/question"
        }
      />
    </LoginGate>
  );
}
