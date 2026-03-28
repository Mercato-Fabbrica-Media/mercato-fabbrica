import { NextResponse } from "next/server";
import { getCurrentAccountId } from "~/server/auth/session";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const accountId = await getCurrentAccountId();

  if (!accountId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const account = await db.legacyAccount.findUnique({
    where: { id: accountId },
    select: { firstName: true },
  });

  if (!account) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    firstName: account.firstName,
  });
}
