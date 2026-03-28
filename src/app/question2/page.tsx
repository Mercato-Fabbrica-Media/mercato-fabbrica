import Questionaire from "~/app/_components/Questionnaire";
import LoginGate from "~/app/_components/LoginGate";
import TrackPageView from "~/app/_components/TrackPageView";
import { getQuestionnaireLanding } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 4;
export const dynamic = "force-dynamic";

export default async function QuestionairePage() {
  const questionnaire = await getQuestionnaireLanding(QUESTIONNAIRE_ID);

  if (!questionnaire) {
    notFound();
  }

  return (
    <LoginGate>
      <TrackPageView eventName="questionnaire_started" questionnaireId={QUESTIONNAIRE_ID} />
      <Questionaire
        title={questionnaire.title?.toUpperCase() ?? "QUESTIONNAIRE"}
        subtitle={questionnaire.ctaText?.toUpperCase() ?? "QUESTIONNAIRE"}
        description={questionnaire.description ?? undefined}
        buttonText="EXPLORE YOUR CULTURAL COMPASS"
        backgroundImage="/assets/images/question2.png"
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        highlight={questionnaire.disclaimer || `Artist Highlight: Volo, The World, 2023  (Collage on wood panel)`}
        buttonUrl="/question2/main"
      />
    </LoginGate>
  );
}
