import Questionaire from "~/app/_components/Questionnaire";
import LoginGate from "~/app/_components/LoginGate";
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
      <Questionaire
        title={questionnaire.title?.toUpperCase() ?? "QUESTIONNAIRE"}
        subtitle={questionnaire.ctaText?.toUpperCase() ?? "QUESTIONNAIRE"}
        description={questionnaire.description ?? undefined}
        buttonText="SENSORY & ARTISTIC EXPLORATIONS"
        backgroundImage="/assets/images/question3.png"
        highlight={questionnaire.disclaimer}
        buttonUrl="/question3/main"
      />
    </LoginGate>
  );
}
