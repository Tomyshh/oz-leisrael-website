import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Extraire la locale du pathname
  const pathnameIsMissingLocale = ['fr', 'en'].every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Si la racine est visitée, rediriger vers /fr (locale par défaut)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url));
  }

  // Si aucune locale n'est présente, rediriger vers /fr + le pathname
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
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos).*)',
  ],
};
