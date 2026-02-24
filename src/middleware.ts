import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SEO_ROUTES = ['/sitemap.xml', '/robots.txt', '/manifest.webmanifest'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ne pas appliquer la locale aux routes SEO
  if (SEO_ROUTES.some((route) => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Ne pas appliquer la locale aux fichiers statiques (ex: /cover.ico, /assets/*.css, etc.)
  // Sans ça, on peut rediriger vers /fr/<fichier> et provoquer un 404.
  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = ['fr', 'en'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(new URL(`/fr${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|sitemap.xml|robots.txt|manifest.webmanifest).*)',
  ],
};
