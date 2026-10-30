import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Optimistic check only: sends visitors without a session cookie to the sign
 * in page before rendering a protected route. It doesn't validate the session
 * or capabilities, and server actions can be posted to any path, so every
 * protected page and action still has to call `requireCapability`
 */
export function proxy(request: NextRequest) {
  if (getSessionCookie(request)) return NextResponse.next();

  const { pathname, search } = request.nextUrl;
  const signInUrl = new URL("/auth/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", pathname + search);

  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/backoffice/:path*", "/haegeprekerke/editor/:path*", "/ga/:path*"],
};
