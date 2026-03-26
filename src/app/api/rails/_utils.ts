function getRailsBaseUrl() {
  const configured = process.env.RAILS_BASE_URL?.trim();
  if (configured) return configured;

  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }

  throw new Error("RAILS_BASE_URL is not configured");
}

export const SIGNIN_PATH =
  process.env.RAILS_SIGNIN_PATH ?? "/accounts/sign_in";

export const SIGNUP_NEW_PATH =
  process.env.RAILS_SIGNUP_NEW_PATH ?? "/accounts/sign_up";

export function railsUrl(path: string) {
  return new URL(path, getRailsBaseUrl()).toString();
}

export function basicHeader() {
  const user = process.env.RAILS_BASIC_USER;
  const pass = process.env.RAILS_BASIC_PASSWORD;

  if (!user || !pass) return "";

  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

export function pickCookie(
  setCookieHeader: string | null,
  cookieName: string,
) {
  if (!setCookieHeader) return null;

  const escaped = cookieName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`${escaped}=([^;]+)`);
  const match = regex.exec(setCookieHeader);
  return match?.[1] ?? null;
}

export function extractCsrf(html: string) {
  const regex = /name=["']authenticity_token["'][^>]*value=["']([^"']+)["']/i;
  const match = regex.exec(html);
  return match?.[1] ?? null;
}
