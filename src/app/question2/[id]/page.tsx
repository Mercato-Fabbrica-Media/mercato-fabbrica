import Banner from "~/app/_components/Banner";
import Question from "~/app/_components/Question";
import LoginGate from "~/app/_components/LoginGate";
import { getQuestionWithNavigation } from "~/server/queries/questionnaire";
import { getCurrentAccountId } from "~/server/auth/session";
import { getQuestionVisual } from "~/server/questionVisuals";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 4;
export const dynamic = "force-dynamic";

export default async function DynamicQuestion2Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const questionId = Number.parseInt(id, 10);

  if (Number.isNaN(questionId)) {
    notFound();
  }

  const accountId = (await getCurrentAccountId()) ?? undefined;

  const questionData = await getQuestionWithNavigation(
    QUESTIONNAIRE_ID,
    questionId,
    accountId,
    {
      previous: "/question2/main",
      next: "/question3",
    },
    "question2",
  );

  if (!questionData) {
    notFound();
  }

  const visuals = getQuestionVisual(QUESTIONNAIRE_ID, questionData.question.id);
  const headingHtml =
    questionData.prompt.descriptionHtml ||
    questionData.section.descriptionHtml ||
    "";

  return (
    <LoginGate>
      <Banner
        mainImageSrc={visuals.src}
        alt={visuals.alt}
        currentQuestion={questionData.progress.currentGlobal}
        totalQuestions={questionData.progress.totalGlobal}
        highlight={visuals.caption ?? questionData.section.disclaimer}
      >
        <div className="font-central-avenue text-center text-white uppercase drop-shadow-lg">
          <div className="mx-auto max-w-[230px] md:max-w-[520px] text-[32px] leading-[38px] font-normal tracking-wide max-sm:top-0 md:text-[72px] md:leading-[86px]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </div>
        </div>
      </Banner>

      <Question
        questionId={questionData.question.id}
        question={questionData.question.text}
        options={questionData.question.options}
        currentQuestion={questionData.progress.currentGlobal}
        totalQuestions={questionData.progress.totalGlobal}
        shareMoreTitle={questionData.prompt.shareMoreTitle}
        shareMorePlaceholder="THOUGHTS..."
        initialChoice={questionData.savedResponse?.choice ?? null}
        initialShareMore={questionData.savedResponse?.shareMore ?? ""}
        previousHref={questionData.navigation.previousHref}
        nextHref={questionData.navigation.nextHref}
      />
    </LoginGate>
  );
}
