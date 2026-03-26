import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  railsUrl,
  basicHeader,
  pickCookie,
  extractCsrf,
  SIGNIN_PATH,
} from "../../rails/_utils";

const ACCOUNT_ME_PATH = process.env.RAILS_ACCOUNT_ME_PATH ?? "/account/me.json";
const ACCOUNT_ID_COOKIE = "rails_account_id";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { email, password, csrf: csrfFromClient } = (await req.json()) as {
    email?: string;
    password?: string;
    csrf?: string;
  };
  if (!email || !password) {
    return NextResponse.json(
      { error: "email and password required" },
      { status: 400 },
    );
  }

  const store = await cookies();
  let railsSession = store.get("rails_session")?.value ?? null;

  let csrf = csrfFromClient ?? null;
  if (!csrf) {
    const pre = await fetch(railsUrl(SIGNIN_PATH), {
      method: "GET",
      headers: {
        Accept: "text/html",
        Authorization: basicHeader(),
      },
      cache: "no-store",
      redirect: "manual",
    });
    const html = await pre.text();
    csrf = extractCsrf(html);
    const setCookie1 = pre.headers.get("set-cookie");
    const newSession1 = pickCookie(setCookie1, "_mercato_session");
    if (newSession1) railsSession = newSession1;
  }

  if (!csrf) {
    return NextResponse.json(
      { error: "CSRF token unavailable" },
      { status: 502 },
    );
  }
  if (!railsSession) {
    return NextResponse.json(
      { error: "Rails session unavailable (call /api/auth/csrf first)" },
      { status: 428 },
    );
  }

  const form = new URLSearchParams();
  form.set("authenticity_token", csrf);
  form.set("account[email]", email);
  form.set("account[password]", password);
  form.set("commit", "Log in");

  const upstream = await fetch(railsUrl(SIGNIN_PATH), {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "text/html,application/xhtml+xml",
      Authorization: basicHeader(),
      Cookie: `_mercato_session=${railsSession}`,
    },
    body: form,
    redirect: "manual",
  });

  const ok = upstream.status === 302 || upstream.status === 200;

  const setCookie2 = upstream.headers.get("set-cookie");
  const newSession2 = pickCookie(setCookie2, "_mercato_session");
  const finalSession = newSession2 ?? railsSession;

  const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  };

  if (!ok) {
    const body = await upstream.text();
    const errorRes = NextResponse.json(
      { error: "Login failed", status: upstream.status, body: body.slice(0, 400) },
      { status: 401 },
    );
    if (finalSession) {
      errorRes.cookies.set("rails_session", finalSession, cookieOptions);
    }
    errorRes.cookies.set(ACCOUNT_ID_COOKIE, "", { ...cookieOptions, maxAge: 0 });
    return errorRes;
  }

  if (!finalSession) {
    return NextResponse.json(
      { ok: false, error: "Missing Rails session after login" },
      { status: 502 },
    );
  }

  const me = await fetch(railsUrl(ACCOUNT_ME_PATH), {
    headers: {
      Accept: "application/json",
      Authorization: basicHeader(),
      Cookie: `_mercato_session=${finalSession}`,
    },
    cache: "no-store",
  });

  if (!me.ok) {
    const profileError = NextResponse.json(
      { ok: false, status: me.status, error: "Unable to fetch account profile" },
      { status: 502 },
    );
    profileError.cookies.set("rails_session", finalSession, cookieOptions);
    profileError.cookies.set(ACCOUNT_ID_COOKIE, "", {
      ...cookieOptions,
      maxAge: 0,
    });
    return profileError;
  }

  const accountJson = (await me.json()) as { id?: number | string } | null;
  const accountId = accountJson?.id;

  if (typeof accountId !== "number" && typeof accountId !== "string") {
    const invalidRes = NextResponse.json(
      { ok: false, status: 502, error: "Account payload missing id" },
      { status: 502 },
    );
    invalidRes.cookies.set("rails_session", finalSession, cookieOptions);
    invalidRes.cookies.set(ACCOUNT_ID_COOKIE, "", {
      ...cookieOptions,
      maxAge: 0,
    });
    return invalidRes;
  }

  const successRes = NextResponse.json(
    { ok: true, accountId: Number(accountId) },
    { status: 200 },
  );
  successRes.cookies.set("rails_session", finalSession, cookieOptions);
  successRes.cookies.set(ACCOUNT_ID_COOKIE, String(accountId), cookieOptions);
  return successRes;
}
