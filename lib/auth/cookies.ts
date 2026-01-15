import { cookies } from "next/headers";

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

const isProd = process.env.NODE_ENV === "production";

export function setAuthCookies(access: string, refresh: string) {
  const store = cookies();

  // Access token: vida curta
  store.set(ACCESS_COOKIE, access, {
    httpOnly: true,
    secure: isProd, // true em produção (https)
    sameSite: "lax",
    path: "/",
  });

  // Refresh token: vida longa
  store.set(REFRESH_COOKIE, refresh, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
  });
}

export function clearAuthCookies() {
  const store = cookies();
  store.set(ACCESS_COOKIE, "", { path: "/", maxAge: 0 });
  store.set(REFRESH_COOKIE, "", { path: "/", maxAge: 0 });
}

export function getAccessToken() {
  return cookies().get(ACCESS_COOKIE)?.value ?? null;
}

export function getRefreshToken() {
  return cookies().get(REFRESH_COOKIE)?.value ?? null;
}
