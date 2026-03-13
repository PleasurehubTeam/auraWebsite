import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Allow all origins to embed legal pages via iframe
  if (
    request.nextUrl.pathname.startsWith("/privacy-policy/embed") ||
    request.nextUrl.pathname.startsWith("/user-agreement/embed")
  ) {
    response.headers.delete("X-Frame-Options");
    response.headers.set("Content-Security-Policy", "frame-ancestors *");
  }

  return response;
}

export const config = {
  matcher: ["/privacy-policy/embed/:path*", "/user-agreement/embed/:path*"],
};
