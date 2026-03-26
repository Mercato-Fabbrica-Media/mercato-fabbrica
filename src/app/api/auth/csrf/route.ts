import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  basicHeader,
  extractCsrf,
  pickCookie,
  railsUrl,
  SIGNIN_PATH,
} from "../../rails/_utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const store = await cookies();
    const existingSession = store.get("rails_session")?.value ?? null;

    const upstream = await fetch(railsUrl(SIGNIN_PATH), {
      method: "GET",
      headers: {
        Accept: "text/html",
        Authorization: basicHeader(),
        ...(existingSession
          ? { Cookie: `_mercato_session=${existingSession}` }
          : {}),
      },
      cache: "no-store",
      redirect: "manual",
    });

    const html = await upstream.text();
    const csrf = extractCsrf(html);
    const rotatedSession = pickCookie(
      upstream.headers.get("set-cookie"),
      "_mercato_session",
    );
    const finalSession = rotatedSession ?? existingSession;

    if (!csrf) {
      return NextResponse.json(
        { error: "Unable to extract CSRF token from Rails response" },
        { status: 502 },
      );
    }

    const response = NextResponse.json({ csrf }, { status: 200 });

    if (finalSession) {
      response.cookies.set("rails_session", finalSession, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60,
      });
    }

    return response;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown CSRF fetch error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
