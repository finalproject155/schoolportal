import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Check if the user is authenticated
function isAuthenticated(request: NextRequest): boolean {
  // Example: check cookie named "token"
  const token = request.cookies.get("token")?.value;
  return Boolean(token); // true if logged in
}

export function middleware(request: NextRequest) {
  const loggedIn = isAuthenticated(request);

  // If user NOT logged in → redirect to /login
  if (!loggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow access if logged in
  return NextResponse.next();
}

// Protect multiple pages
export const config = {
  matcher: [
    "/dashboard/:path*", // protect all dashboard pages
    "/profile/:path*",   // protect profile
    "/settings/:path*",  // protect settings
    "/admin/:path*",     // protect admin
    "/",                 // protect home
  ],
};
