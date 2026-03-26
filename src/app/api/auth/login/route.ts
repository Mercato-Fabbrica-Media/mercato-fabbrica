import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";

const ACCOUNT_ID_COOKIE = "rails_account_id";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json(
      { error: "email and password required" },
      { status: 400 },
    );
  }

  const account = await db.legacyAccount.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!account) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const valid = await bcrypt.compare(password, account.encryptedPassword);

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  };

  const store = await cookies();
  store.set(ACCOUNT_ID_COOKIE, String(account.id), cookieOptions);
  store.set("rails_session", "direct-auth", cookieOptions);

  return NextResponse.json(
    { ok: true, accountId: account.id },
    { status: 200 },
  );
}
