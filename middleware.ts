import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/home")) {
    const access = request.cookies.get("access_token")?.value;
    const refresh = request.cookies.get("refresh_token")?.value;

    // se não tem nenhum dos dois -> login
    if (!access && !refresh) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  if (pathname === "/login") {
    const access = request.cookies.get("access_token")?.value;
    if (access) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"],
};
