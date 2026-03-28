import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Prisma } from "@prisma/client";
import { db } from "~/server/db";

const ACCOUNT_ID_COOKIE = "rails_account_id";

const ALLOWED_EVENTS = new Set([
  // Auth
  "login_viewed",
  "login_success",
  "login_failed",
  "register_viewed",
  "register_success",
  "register_failed",
  "auth_check_failed",
  // Questionnaire
  "questionnaire_started",
  "questionnaire_completed",
  "question_viewed",
  "question_navigated",
  "response_saved",
  "response_save_failed",
  // ARIA
  "aria_profile_compile_started",
  "aria_profile_compile_succeeded",
  "aria_profile_compile_failed",
]);

export const dynamic = "force-dynamic";

interface EventPayload {
  eventName: string;
  sessionId?: string;
  questionnaireId?: number;
  questionId?: number;
  stepIndex?: number;
  route?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: Request) {
  const body = (await req.json()) as EventPayload | EventPayload[];
  const events = Array.isArray(body) ? body : [body];

  if (events.length === 0 || events.length > 50) {
    return NextResponse.json(
      { error: "1-50 events per request" },
      { status: 400 },
    );
  }

  const store = await cookies();
  const accountCookie = store.get(ACCOUNT_ID_COOKIE);
  const accountId = accountCookie
    ? Number.parseInt(accountCookie.value, 10)
    : null;

  const rows = events
    .filter((e) => e.eventName && typeof e.eventName === "string" && ALLOWED_EVENTS.has(e.eventName))
    .map((e) => ({
      accountId: accountId && !Number.isNaN(accountId) ? accountId : null,
      sessionId: e.sessionId ?? null,
      eventName: e.eventName,
      questionnaireId: e.questionnaireId ? BigInt(e.questionnaireId) : null,
      questionId: e.questionId ? BigInt(e.questionId) : null,
      stepIndex: e.stepIndex ?? null,
      route: e.route ?? null,
      metadata: e.metadata
        ? (e.metadata as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    }));

  if (rows.length === 0) {
    return NextResponse.json({ error: "no valid events" }, { status: 400 });
  }

  await db.analyticsEvent.createMany({ data: rows });

  return NextResponse.json({ ok: true, count: rows.length }, { status: 200 });
}
