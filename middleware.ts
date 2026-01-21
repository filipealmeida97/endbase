import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access = request.cookies.get("access_token")?.value;
  const refresh = request.cookies.get("refresh_token")?.value;
  const isAuthed = Boolean(access || refresh);

  // ✅ se tentar acessar /home sem token -> /login
  if (pathname.startsWith("/home") && !isAuthed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ se tentar acessar /login já autenticado -> /home
  if (pathname.startsWith("/login") && isAuthed) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*", "/login/:path*"],
};
