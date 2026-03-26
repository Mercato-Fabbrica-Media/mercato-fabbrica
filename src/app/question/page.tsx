import Questionaire from "~/app/_components/Questionnaire";
import LoginGate from "~/app/_components/LoginGate";
import { getQuestionnaireLanding } from "~/server/queries/questionnaire";
import { notFound } from "next/navigation";

const QUESTIONNAIRE_ID = 3;
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
        buttonText="TRACE THE LAYERS OF YOUR IDENTITY"
        backgroundImage="/assets/images/Questionaire2.png"
        highlight={`Artist Highlight: Volo, Choice, 2023 (Acrylic on canvas)`}
        buttonUrl="/question/main"
      />
    </LoginGate>
  );
}
