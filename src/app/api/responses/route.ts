import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { getCurrentAccountId } from "~/server/auth/session";

export const dynamic = "force-dynamic";

interface SaveResponsePayload {
  questionId?: number;
  response?: string | null;
  shareMore?: string | null;
}

export async function POST(req: Request) {
  const accountId = await getCurrentAccountId();

  if (!accountId) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 },
    );
  }

  let payload: SaveResponsePayload;
  try {
    payload = (await req.json()) as SaveResponsePayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const questionId = Number(payload.questionId);
  if (!Number.isInteger(questionId) || questionId <= 0) {
    return NextResponse.json(
      { error: "questionId must be a positive integer" },
      { status: 400 },
    );
  }

  const responseText =
    typeof payload.response === "string" && payload.response.length > 0
      ? payload.response.trim()
      : null;
  const MAX_SHARE_MORE = 5000;
  const rawShareMore =
    typeof payload.shareMore === "string" ? payload.shareMore : "";
  const shareMore = rawShareMore.slice(0, MAX_SHARE_MORE);

  const questionKey = BigInt(questionId);

  const existing = await db.response.findFirst({
    where: {
      accountId,
      questionId: questionKey,
    },
  });

  const now = new Date();

  if (existing) {
    await db.response.update({
      where: { id: existing.id },
      data: {
        response: responseText,
        shareMore,
        updatedAt: now,
      },
    });
  } else {
    await db.response.create({
      data: {
        accountId,
        questionId: questionKey,
        response: responseText,
        shareMore,
        createdAt: now,
        updatedAt: now,
      },
    });
  }

  return NextResponse.json({ ok: true });
}
