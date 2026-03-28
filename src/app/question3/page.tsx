import Questionaire from "~/app/_components/Questionnaire";
import LoginGate from "~/app/_components/LoginGate";
import TrackPageView from "~/app/_components/TrackPageView";
import { getQuestionnaireLanding } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 5;
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
        buttonText="SENSORY & ARTISTIC EXPLORATIONS"
        backgroundImage="/assets/images/question3.png"
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        highlight={questionnaire.disclaimer || `Artist Highlight: Volo,  Remnant 3, 2023  (Collage on canvas) | Gravity Experiment, 2023  (Acrylic on canvas)`}
        buttonUrl="/question3/main"
      />
    </LoginGate>
  );
}
