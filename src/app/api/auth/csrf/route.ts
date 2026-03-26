import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  const csrf = randomBytes(32).toString("hex");

  const store = await cookies();
  store.set("csrf_token", csrf, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 30, // 30 minutes
  });

  return NextResponse.json({ csrf }, { status: 200 });
}
