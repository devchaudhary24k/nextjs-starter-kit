import { type NextRequest, NextResponse } from "next/server";

import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

import { DEFAULT_LOGIN_REDIRECT, authRoutes, protectedRoutes } from "@/routes";

export default async function authMiddleware(request: NextRequest) {
  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        // Get the cookie from the request
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  // Get the current path
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      request.nextUrl.pathname === route ||
      request.nextUrl.pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname);

  /**
   * If route is protected and user is not signed in return user to login page.
   * Returned user must have proper callback url when redirected to login page.
   */
  if (isProtectedRoute) {
    if (!session) {
      const callbackUrl = encodeURIComponent(path);
      return NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${callbackUrl}`, request.nextUrl),
      );
    }
    // If protectedRoute and user is authenticated, give access
    return NextResponse.next();
  }

  if (isAuthRoute) {
    // If auth route and user is authenticated redirect user to dashboard.
    if (session) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl),
      );
    }
    // If authRoute and not authenticated, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

// TODO: Change Matcher to only target required pages to aviod unwanted middleware innvocation.
export const config = {
  matcher: [
    // Match all request paths except for:
    // - API routes
    // - Next.js static files
    // - Next.js image optimization files
    // - Metadata files
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
