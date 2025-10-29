import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const COOKIE_KEY = "admin_auth";

export function middleware(request: NextRequest) {
  const rawCookie = request.cookies.get(COOKIE_KEY)?.value;

  let token: string | null = null;
  let isAuthenticated = false;

  if (rawCookie) {
    try {
      const parsed = JSON.parse(rawCookie);
      token = parsed.token;
      isAuthenticated = parsed.isAuthenticated;
    } catch (err) {
      console.error("Failed to parse admin_auth cookie:", err);
    }
  }
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.includes("/sign-in")
  ) {
    if (!isAuthenticated || !token) {
      const signInUrl = new URL("/admin/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
