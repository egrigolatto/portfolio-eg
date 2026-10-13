import { NextResponse } from "next/server";

import { SESSION_COOKIE, isSessionToken } from "@/lib/session";

import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/inbox/login")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (token && (await isSessionToken(token))) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/inbox/login", request.url);

  if (pathname !== "/inbox") {
    loginUrl.searchParams.set("from", pathname);
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/inbox/:path*",
};
