import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

export const config = {
  matcher: [
    // Handle locale redirection at the root
    '/',

    // Handle locale-specific paths
    '/(de|en|ua)/:path*',

    // Redirect missing locales (e.g., `/pathnames` -> `/en/pathnames`)
    '/((?!api/auth|_next|_vercel|.*\\..*).*)',
  ],
};

// Middleware function
export default async function middleware(req:NextRequest) {
  const { pathname } = req.nextUrl;

  // Exclude `NextAuth` API routes and `_next` assets from localization
  if (
    pathname.startsWith('/api/auth') || // NextAuth routes
    pathname.startsWith('/_next') ||   // Next.js assets
    pathname.startsWith('/_vercel') || // Vercel paths
    pathname.match(/\.(.*)$/)          // Static files (e.g., images, CSS)
  ) {
    return NextResponse.next();
  }

  // Apply `next-intl` middleware for other routes
  return intlMiddleware(req);
}

  // Match only internationalized pathnames
// matcher: ['/', '/(ua|en)/:path*', ]

// matcher: [
//   // Enable a redirect to a matching locale at the root
//   '/',

//   // Set a cookie to remember the previous locale for
//   // all requests that have a locale prefix
//   '/(de|en)/:path*',

//   // Enable redirects that add missing locales
//   // (e.g. `/pathnames` -> `/en/pathnames`)
//   '/((?!_next|_vercel|.*\\..*).*)'
// ]