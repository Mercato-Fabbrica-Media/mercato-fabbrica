import { db } from "~/server/db";

type NavigationFallback = {
  previous: string;
  next: string;
};

function styleConnectors(line: string): string {
  const CONNECTORS = /\b(and|with|in|of|on|or|the|for|to|through)\b/gi;
  return line.replace(CONNECTORS, (match) => {
    return `<span class="connector-word">${match.toLowerCase()}</span>`;
  });
}

function toHtmlLines(text?: string | null): string {
  if (!text) return "";

  return text
    .split(/\\r\\n|\\r|\\n|\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const styled = styleConnectors(line);
      // Uppercase only the parts outside connector spans
      return `<div>${styled.replace(/(<span[^>]*>.*?<\/span>)|([^<]+)/g, (m, span, txt) => span ? span : txt.toUpperCase())}</div>`;
    })
    .join("");
}

function normalizeOption(line: string): string {
  const trimmed = line.trim().replace(/^[-•]\s*/, "");
  if (!trimmed || trimmed === "---") return "";

  // Remove wrapping quotes that appear in the seed data
  const withoutQuotes =
    trimmed.startsWith("'") && trimmed.endsWith("'")
      ? trimmed.slice(1, -1)
      : trimmed;

  return withoutQuotes.replace(/\\'/g, "'").trim();
}

function parseOptions(options?: string | null): string[] {
  if (!options) return [];

  return options
    .split(/\r?\n|\\n/)
    .map((line) => normalizeOption(line))
    .filter(Boolean);
}

function sentenceCase(text?: string | null): string | undefined {
  if (!text) return text ?? undefined;

  const trimmed = text.replace(/\\r\\n|\\r|\\n/g, "").trim();
  if (!trimmed) return undefined;

  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export async function getQuestionnaireLanding(questionnaireId: number) {
  const questionnaire = await db.questionnaire.findUnique({
    where: { id: BigInt(questionnaireId) },
    include: {
      sections: {
        orderBy: { id: "asc" },
        take: 1,
      },
    },
  });

  if (!questionnaire) {
    return null;
  }

  const [firstSection] = questionnaire.sections;

  return {
    id: Number(questionnaire.id),
    title: questionnaire.title,
    description: questionnaire.description,
    ctaText: questionnaire.ctaText,
    disclaimer: questionnaire.disclaimer,
    firstSection: firstSection
      ? {
          id: Number(firstSection.id),
          title: firstSection.title,
          description: firstSection.description,
          ctaText: firstSection.ctaText,
          disclaimer: firstSection.disclaimer,
        }
      : undefined,
  };
}

export async function getQuestionnaireSectionSummary(questionnaireId: number) {
  const section = await db.questionnaireSection.findFirst({
    where: { questionnaireId: BigInt(questionnaireId) },
    include: {
      sectionQuestions: {
        orderBy: { id: "asc" },
        take: 1,
        include: {
          questions: {
            orderBy: { id: "asc" },
            take: 1,
            select: { id: true },
          },
        },
      },
    },
    orderBy: { id: "asc" },
  });

  if (!section) {
    return null;
  }

  const firstSectionQuestion = section.sectionQuestions[0];
  const firstQuestion = firstSectionQuestion?.questions[0];

  return {
    id: Number(section.id),
    title: section.title,
    description: section.description,
    ctaText: section.ctaText,
    disclaimer: section.disclaimer,
    firstQuestionId: firstQuestion ? Number(firstQuestion.id) : null,
  };
}

export async function getQuestionWithNavigation(
  questionnaireId: number,
  questionId: number,
  accountId?: number,
  fallback?: NavigationFallback,
  routePrefix = "question",
) {
  const id = BigInt(questionId);
  const navigationFallback: NavigationFallback =
    fallback ?? { previous: "/question/main", next: "/question2" };

  const question = await db.question.findFirst({
    where: {
      id,
      sectionQuestion: {
        questionnaireSection: {
          questionnaireId: BigInt(questionnaireId),
        },
      },
    },
    include: {
      sectionQuestion: {
        include: {
          questionnaireSection: {
            include: {
              questionnaire: true,
            },
          },
        },
      },
    },
  });

  if (!question) {
    return null;
  }

  const questionnaire = question.sectionQuestion.questionnaireSection.questionnaire;
  const section = question.sectionQuestion.questionnaireSection;

  const [
    localSequence,
    previousQuestion,
    nextQuestion,
    globalIndex,
    totalGlobal,
    savedResponse,
  ] =
    await Promise.all([
      db.question.findMany({
        where: {
          sectionQuestion: {
            questionnaireSection: {
              questionnaireId: questionnaire.id,
            },
          },
        },
        select: { id: true },
        orderBy: { id: "asc" },
      }),
      db.question.findFirst({
        where: {
          sectionQuestion: {
            questionnaireSection: {
              questionnaireId: questionnaire.id,
            },
          },
          id: { lt: id },
        },
        orderBy: { id: "desc" },
        select: { id: true },
      }),
      db.question.findFirst({
        where: {
          sectionQuestion: {
            questionnaireSection: {
              questionnaireId: questionnaire.id,
            },
          },
          id: { gt: id },
        },
        orderBy: { id: "asc" },
        select: { id: true },
      }),
      db.question.count({
        where: {
          id: { lte: id },
        },
      }),
      db.question.count(),
      accountId
        ? db.response.findFirst({
            where: {
              accountId,
              questionId: question.id,
            },
            orderBy: { updatedAt: "desc" },
          })
        : Promise.resolve(null),
    ]);

  const localIds = localSequence.map((item) => Number(item.id));
  const localIndex = localIds.indexOf(Number(question.id));

  const localPosition = localIndex >= 0 ? localIndex + 1 : null;
  const localTotal = localIds.length;

  return {
    question: {
      id: Number(question.id),
      text: sentenceCase(question.questionText) ?? "",
      options: parseOptions(question.options),
      ctaText: question.ctaText ?? undefined,
    },
    section: {
      id: Number(section.id),
      title: section.title ?? undefined,
      descriptionHtml: toHtmlLines(section.title ?? ""),
      disclaimer: section.disclaimer ?? questionnaire.disclaimer ?? undefined,
    },
    prompt: {
      descriptionHtml: toHtmlLines(question.sectionQuestion.description ?? ""),
      shareMoreTitle:
        sentenceCase(question.sectionQuestion.shareMore) ?? "Share more",
    },
    savedResponse: savedResponse
      ? {
          choice: savedResponse.response ?? null,
          shareMore: savedResponse.shareMore ?? "",
        }
      : null,
    navigation: {
      previousHref: previousQuestion
        ? `/${routePrefix}/${Number(previousQuestion.id)}`
        : navigationFallback.previous,
      nextHref: nextQuestion
        ? `/${routePrefix}/${Number(nextQuestion.id)}`
        : navigationFallback.next,
    },
    progress: {
      currentInSection: localPosition ?? 1,
      totalInSection: localTotal,
      currentGlobal: globalIndex,
      totalGlobal,
    },
  };
}
