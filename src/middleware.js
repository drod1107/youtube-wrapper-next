// src/middleware.js
import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (req) => {
  const { userId } = getAuth(req);
  
  // Allow public access to docs and home page
  if (req.nextUrl.pathname.startsWith('/docs') || req.nextUrl.pathname === '/') {
    return NextResponse.next();
  }

  if (!userId) {
    // Redirect to sign-in for non-public routes
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  try {
    // Fetch the user's data from Clerk
    const userResponse = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_API_KEY}`,
      }
    });

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
    }

    const user = await userResponse.json();

    // Make a POST request to the init-user API route
    const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/init-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email_addresses[0].email_address,
        firstName: user.first_name,
        lastName: user.last_name,
        orgName: user.public_metadata.org_name,
        permission: user.public_metadata.permission,
      })
    });

    if (!apiResponse.ok) {
      throw new Error(`Failed to initialize user: ${apiResponse.statusText}`);
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Handle any errors you need to log or debug
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|static|_next/static|_next/image|favicon.ico).*)"
  ]
};