import { NextRequest, NextResponse } from 'next/server';

const roleRoutes: Record<string, string> = {
  '/admin': 'ADMIN',
  '/donor': 'DONOR',
  '/dashboard': 'REQUESTER',
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const matchedPrefix = Object.keys(roleRoutes).find((prefix) =>
    pathname.startsWith(prefix),
  );

  if (!matchedPrefix) return NextResponse.next();

  const role = req.cookies.get('lifeline-role')?.value;
  const requiredRole = roleRoutes[matchedPrefix];

  if (!role) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (role !== requiredRole) {
    // Logged in, but wrong role for this section — send them to their own home.
    const ownHome =
      Object.entries(roleRoutes).find(([, r]) => r === role)?.[0] ?? '/';
    return NextResponse.redirect(new URL(ownHome, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/donor/:path*', '/dashboard/:path*'],
};
