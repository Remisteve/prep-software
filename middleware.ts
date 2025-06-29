import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET  // Fixed: Use NEXTAUTH_SECRET
  });

  const pathname = request.nextUrl.pathname;
  
  console.log('🛡️ Middleware:', { pathname, hasToken: !!token, role: token?.role });

  // If no token, redirect to login
  if (!token) {
    console.log('❌ No token, redirecting to /auth/login');
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Check the role and redirect based on the role
  switch (token.role) {
    case "admin":
      if (pathname.startsWith("/admin")) {
        // Admin accessing admin routes - allow access
        console.log('✅ Admin accessing admin area');
        return NextResponse.next();
      } else {
        // Admin trying to access non-admin routes - redirect to admin
        console.log('🔄 Redirecting admin to /admin');
        return NextResponse.redirect(new URL("/admin", request.url));
      }

    case "user":
      if (
        pathname.startsWith("/profile") ||
        pathname.startsWith("/patientprofile") ||
        pathname.startsWith("/complain") ||
        pathname.startsWith("/report")
      ) {
        // User accessing allowed routes - allow access
        console.log('✅ User accessing allowed area');
        return NextResponse.next();
      } else {
        // User trying to access non-user routes - redirect to profile
        console.log('🔄 Redirecting user to /profile');
        return NextResponse.redirect(new URL("/profile", request.url));
      }

    default:
      // Unknown role - redirect to login
      console.log('❌ Unknown role, redirecting to /auth/login');
      return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: [
    // FIXED: Exclude ALL auth routes, not just login
    "/((?!api|_next/static|_next/image|favicon.ico|auth).*)",
  ],
};