import "server-only";
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument */
import { cookies } from "next/headers";

const ACCOUNT_ID_COOKIE = "rails_account_id";

export async function getCurrentAccountId(): Promise<number | null> {
  const store = await cookies();
  const cookie = store.get(ACCOUNT_ID_COOKIE);
  if (!cookie) return null;

  const raw = cookie.value;
  if (!raw) return null;

  const parsed = Number.parseInt(raw, 10);
  if (Number.isNaN(parsed)) return null;

  return parsed;
}
