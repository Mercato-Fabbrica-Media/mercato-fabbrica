import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { railsUrl, basicHeader, pickCookie } from '../../rails/_utils';

// Removed unused extractCsrf and SIGNUP_NEW_PATH
const SIGNUP_CREATE_PATH = process.env.RAILS_SIGNUP_CREATE_PATH ?? '/accounts';
const ACCOUNT_ID_COOKIE = 'rails_account_id';

export const dynamic = 'force-dynamic';

// Define a type for the Rails account JSON
interface RailsAccount {
  id: number;
  salt?: string | null;
  name?: string | null;
  email: string;
  hashed_password?: string | null;
  created_at: string;
  updated_at: string;
  vault?: string | null;
  first_name: string;
  last_name: string;
}

export async function POST(req: Request) {
  const { email, password, firstName, lastName, csrf: csrfFromClient } = (await req.json()) as {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    csrf?: string;
  };

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json(
      { error: 'email, password, firstName, lastName are required' },
      { status: 400 }
    );
  }

  // Read our mirrored Rails session cookie (if present)
  const store = await cookies();
  const railsSession = store.get('rails_session')?.value ?? null;

  // Ensure we have a CSRF token paired to the same session
  const csrf = csrfFromClient ?? null;

  if (!csrf) {
    return NextResponse.json({ error: 'CSRF token unavailable' }, { status: 502 });
  }
  if (!railsSession) {
    return NextResponse.json(
      { error: 'Rails session unavailable (call /api/auth/csrf first)' },
      { status: 428 }
    );
  }

  // Build Devise registration form (urlencoded)
  const form = new URLSearchParams();
  form.set('authenticity_token', csrf);
  form.set('account[email]', email);
  form.set('account[password]', password);
  form.set('account[password_confirmation]', password); // safe default
  form.set('account[first_name]', firstName);
  form.set('account[last_name]', lastName);
  form.set('commit', 'Sign up');

  // Submit to Rails (HTML endpoint)
  const create = await fetch(railsUrl(SIGNUP_CREATE_PATH), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'text/html,application/xhtml+xml',
      Authorization: basicHeader(),
      Cookie: `_mercato_session=${railsSession}`,
    },
    body: form,
    redirect: 'manual', // Devise usually 302 on success
  });

  const ok = create.status === 302 || create.status === 200;

  // Capture rotated session after POST
  const setCookie2 = create.headers.get('set-cookie');
  const rotated2 = pickCookie(setCookie2, '_mercato_session');
  const finalSession = rotated2 ?? railsSession;

  if (!ok) {
    const bodyText = await create.text();
    const errRes = NextResponse.json(
      { error: 'Registration failed', status: create.status, body: bodyText.slice(0, 500) },
      { status: 422 }
    );
    if (finalSession) {
      errRes.cookies.set('rails_session', finalSession, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60,
      });
    }
    return errRes;
  }

  // We should now be authenticated as the new account. Fetch JSON profile.
  const me = await fetch(railsUrl('/account/me.json'), {
    headers: {
      Accept: 'application/json',
      Authorization: basicHeader(),
      Cookie: `_mercato_session=${finalSession}`,
    },
    cache: 'no-store',
  });

  if (!me.ok) {
    const errRes = NextResponse.json(
      { error: 'Registered, but /account/me.json failed', status: me.status },
      { status: 502 }
    );
    if (finalSession) {
      errRes.cookies.set('rails_session', finalSession, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60,
      });
    }
    return errRes;
  }

  // Strongly type JSON
  const raw: RailsAccount = (await me.json()) as RailsAccount;

  const account: RailsAccount = {
    id: raw.id,
    salt: raw.salt ?? null,
    name: raw.name ?? null,
    email: raw.email,
    hashed_password: raw.hashed_password ?? null,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
    vault: raw.vault ?? null,
    first_name: raw.first_name,
    last_name: raw.last_name,
  };

  const res = NextResponse.json(account, { status: 201 });
  if (finalSession) {
    res.cookies.set('rails_session', finalSession, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });
    res.cookies.set(ACCOUNT_ID_COOKIE, String(account.id), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60,
    });
  }
  return res;
}
