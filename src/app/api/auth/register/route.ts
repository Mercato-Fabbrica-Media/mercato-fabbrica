import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import bcrypt from "bcrypt";

const ACCOUNT_ID_COOKIE = "rails_account_id";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = (await req.json()) as {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
  };

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json(
      { error: "email, password, firstName, lastName are required" },
      { status: 400 },
    );
  }

  const existing = await db.legacyAccount.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const now = new Date();

  const account = await db.legacyAccount.create({
    data: {
      email: email.toLowerCase(),
      firstName,
      lastName,
      encryptedPassword: hashedPassword,
      createdAt: now,
      updatedAt: now,
    },
  });

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  };

  const store = await cookies();
  store.set(ACCOUNT_ID_COOKIE, String(account.id), cookieOptions);
  store.set("rails_session", "direct-auth", cookieOptions);

  return NextResponse.json(
    {
      id: account.id,
      email: account.email,
      first_name: account.firstName,
      last_name: account.lastName,
    },
    { status: 201 },
  );
}
