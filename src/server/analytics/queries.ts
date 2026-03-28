import "server-only";
import { db } from "~/server/db";

export async function getFunnelStats() {
  const counts = await db.analyticsEvent.groupBy({
    by: ["eventName"],
    where: {
      eventName: {
        in: [
          "login_viewed",
          "login_success",
          "login_failed",
          "register_viewed",
          "register_success",
          "register_failed",
          "questionnaire_started",
          "questionnaire_completed",
        ],
      },
    },
    _count: { id: true },
  });

  const map = Object.fromEntries(
    counts.map((c) => [c.eventName, Number(c._count.id)]),
  );

  const started = map.questionnaire_started ?? 0;
  const completed = map.questionnaire_completed ?? 0;
  const completionRate = started > 0 ? (completed / started) * 100 : 0;

  return {
    loginViewed: map.login_viewed ?? 0,
    loginSuccess: map.login_success ?? 0,
    loginFailed: map.login_failed ?? 0,
    registerViewed: map.register_viewed ?? 0,
    registerSuccess: map.register_success ?? 0,
    registerFailed: map.register_failed ?? 0,
    started,
    completed,
    completionRate: Math.round(completionRate * 10) / 10,
  };
}

interface QuestionViewRow {
  question_id: bigint;
  views: bigint;
}

interface QuestionSaveRow {
  question_id: bigint;
  saves: bigint;
}

export async function getDropoffByQuestion() {
  const views = await db.$queryRaw<QuestionViewRow[]>`
    SELECT question_id, COUNT(*) as views
    FROM analytics_events
    WHERE event_name = 'question_viewed' AND question_id IS NOT NULL
    GROUP BY question_id
    ORDER BY question_id
  `;

  const saves = await db.$queryRaw<QuestionSaveRow[]>`
    SELECT question_id, COUNT(*) as saves
    FROM analytics_events
    WHERE event_name = 'response_saved' AND question_id IS NOT NULL
    GROUP BY question_id
    ORDER BY question_id
  `;

  const saveMap = Object.fromEntries(
    saves.map((s) => [s.question_id.toString(), Number(s.saves)]),
  );

  const questions = await db.question.findMany({
    select: { id: true, questionText: true },
    orderBy: { id: "asc" },
  });

  const questionTextMap = Object.fromEntries(
    questions.map((q) => [q.id.toString(), q.questionText ?? "—"]),
  );

  return views.map((v, i) => {
    const qId = v.question_id.toString();
    const viewCount = Number(v.views);
    const nextViews = views[i + 1] ? Number(views[i + 1]!.views) : null;
    const dropoff = nextViews !== null ? viewCount - nextViews : null;

    return {
      questionId: Number(v.question_id),
      questionText: questionTextMap[qId] ?? `Q${qId}`,
      views: viewCount,
      saves: saveMap[qId] ?? 0,
      continueCount: nextViews,
      dropoff,
    };
  });
}

interface TimeRow {
  question_id: bigint;
  avg_ms: number;
  count: bigint;
}

export async function getTimePerQuestion() {
  const rows = await db.$queryRaw<TimeRow[]>`
    SELECT
      question_id,
      AVG((metadata->>'timeOnQuestionMs')::numeric) as avg_ms,
      COUNT(*) as count
    FROM analytics_events
    WHERE event_name = 'question_navigated'
      AND question_id IS NOT NULL
      AND metadata->>'timeOnQuestionMs' IS NOT NULL
    GROUP BY question_id
    ORDER BY question_id
  `;

  return rows.map((r) => ({
    questionId: Number(r.question_id),
    avgSeconds: Math.round(Number(r.avg_ms) / 100) / 10,
    sampleCount: Number(r.count),
  }));
}

export async function getSaveFailureRate() {
  const counts = await db.analyticsEvent.groupBy({
    by: ["eventName"],
    where: {
      eventName: { in: ["response_saved", "response_save_failed"] },
    },
    _count: { id: true },
  });

  const map = Object.fromEntries(
    counts.map((c) => [c.eventName, Number(c._count.id)]),
  );

  const saved = map.response_saved ?? 0;
  const failed = map.response_save_failed ?? 0;
  const total = saved + failed;
  const failureRate = total > 0 ? (failed / total) * 100 : 0;

  return {
    saved,
    failed,
    total,
    successRate: Math.round((100 - failureRate) * 10) / 10,
    failureRate: Math.round(failureRate * 10) / 10,
  };
}
