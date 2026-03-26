import { NextResponse } from "next/server";
import { getCurrentAccountId } from "~/server/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const accountId = await getCurrentAccountId();

  if (!accountId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, accountId });
}
