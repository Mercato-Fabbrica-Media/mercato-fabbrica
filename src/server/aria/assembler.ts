import "server-only";
import { db } from "~/server/db";
import { MAPPING_BY_ID } from "./mappings";
import { QUESTION_BY_DB_ID, QUESTIONNAIRE_VERSION, TOTAL_QUESTIONS } from "./contract";
import type { QuestionnaireCompletedPayload } from "./types";

function detectEnvironment(): "development" | "preview" | "production" {
  const env = process.env.VERCEL_ENV ?? process.env.NODE_ENV;
  if (env === "production") return "production";
  if (env === "preview") return "preview";
  return "development";
}

// Must match the parser in src/server/queries/questionnaire.ts exactly
function normalizeOption(line: string): string {
  const trimmed = line.trim().replace(/^[-•]\s*/, "");
  if (!trimmed || trimmed === "---") return "";
  const withoutQuotes =
    trimmed.startsWith("'") && trimmed.endsWith("'")
      ? trimmed.slice(1, -1)
      : trimmed;
  return withoutQuotes.replace(/\\'/g, "'").trim();
}

function parseOptions(raw: string | null): string[] {
  if (!raw) return [];
  return raw
    .split(/\r?\n|\\n/)
    .map((line) => normalizeOption(line))
    .filter((opt) => opt !== "" && opt !== "--");
}

/**
 * Assembles a QuestionnaireCompletedPayload for a given account.
 * Reads responses from DB, resolves question keys from the mapping table,
 * and attaches behavioral + analytics summaries.
 */
export async function assemblePayload(
  accountId: number,
  sessionId?: string,
): Promise<QuestionnaireCompletedPayload> {
  // Fetch all responses for this account, with question data
  const responses = await db.response.findMany({
    where: { accountId },
    include: {
      question: {
        select: { id: true, questionText: true, options: true },
      },
    },
    orderBy: { questionId: "asc" },
  });

  // Fetch analytics summary for this account
  const analyticsCounts = await db.analyticsEvent.groupBy({
    by: ["eventName"],
    where: {
      accountId,
      eventName: {
        in: [
          "question_viewed",
          "response_saved",
          "response_save_failed",
          "question_navigated",
        ],
      },
    },
    _count: { id: true },
  });

  const analyticsMap = Object.fromEntries(
    analyticsCounts.map((c) => [c.eventName, Number(c._count.id)]),
  );

  // Compute behavioral timing from question_navigated events
  const timingRows = await db.$queryRaw<
    Array<{ total_ms: number; count: bigint }>
  >`
    SELECT
      SUM((metadata->>'timeOnQuestionMs')::numeric) as total_ms,
      COUNT(*) as count
    FROM analytics_events
    WHERE account_id = ${accountId}
      AND event_name = 'question_navigated'
      AND metadata->>'timeOnQuestionMs' IS NOT NULL
  `;

  const timing = timingRows[0];
  const totalTimeMs =
    timing && Number(timing.count) > 0 ? Number(timing.total_ms) : undefined;
  const avgTimeMs =
    totalTimeMs && timing
      ? totalTimeMs / Number(timing.count)
      : undefined;

  // Check if session was resumed (multiple questionnaire_started events)
  const startCount = await db.analyticsEvent.count({
    where: { accountId, eventName: "questionnaire_started" },
  });

  // Build normalized responses
  const normalizedResponses: QuestionnaireCompletedPayload["responses"] =
    responses.map((r) => {
      const qId = Number(r.questionId);
      const contractQ = QUESTION_BY_DB_ID.get(qId);
      const mapping = MAPPING_BY_ID.get(qId);
      const optionsList = parseOptions(r.question.options);
      const optionIndex = r.response
        ? optionsList.findIndex(
            (opt) =>
              opt.toLowerCase() === r.response!.toLowerCase().trim(),
          )
        : null;

      return {
        question_id: qId,
        question_key: contractQ?.question_key ?? mapping?.question_key ?? `q${qId}`,
        section_key: contractQ?.domain_key ?? mapping?.section_key ?? "unknown",
        response_type: "single_select" as const,
        value: r.response ?? null,
        option_index: optionIndex !== -1 ? optionIndex : null,
        option_key:
          optionIndex !== null && optionIndex >= 0 && contractQ
            ? (contractQ.options[optionIndex]?.option_key ?? null)
            : null,
      };
    });

  const completedQuestions = normalizedResponses.filter(
    (r) => r.value !== null,
  ).length;
  const saveFailures = analyticsMap.response_save_failed ?? 0;

  return {
    event_type: "questionnaire.completed",
    payload_version: "1.0",
    source: {
      application: "joyous_living",
      environment: detectEnvironment(),
      questionnaire_version: QUESTIONNAIRE_VERSION,
      completed_at: new Date().toISOString(),
    },
    account: {
      account_id: accountId,
      session_id: sessionId,
    },
    questionnaire: {
      questionnaire_id: "enigmatic_choices",
      total_questions: TOTAL_QUESTIONS,
      completed_questions: completedQuestions,
      completion_status:
        completedQuestions >= TOTAL_QUESTIONS ? "completed" : "partial",
    },
    responses: normalizedResponses,
    behavioral_summary: {
      total_time_ms: totalTimeMs ? Math.round(totalTimeMs) : undefined,
      average_time_per_question_ms: avgTimeMs
        ? Math.round(avgTimeMs)
        : undefined,
      resumed_session: startCount > 1,
      response_save_failures: saveFailures,
    },
    analytics_summary: {
      question_views: analyticsMap.question_viewed ?? 0,
      response_saved_count: analyticsMap.response_saved ?? 0,
      response_save_failed_count: saveFailures,
    },
  };
}
