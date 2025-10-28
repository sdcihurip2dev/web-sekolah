import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    // Minimal check: if no Supabase access token cookie, redirect to login
    const hasAccess = req.cookies.get('sb-access-token');
    if (!hasAccess) {
      const redirect = new URL(`/auth/login`, req.url);
      redirect.searchParams.set('redirect', pathname + (search || ''));
      return NextResponse.redirect(redirect);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
