import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === '/' || 
    path === '/auth/signin' || 
    path === '/auth/signup' || 
    path.startsWith('/api/auth');

  // Get the session token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirect logic
  if (!token && !isPublicPath) {
    // Redirect to login if trying to access a protected route without being authenticated
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (token && (path === '/auth/signin' || path === '/auth/signup')) {
    // Redirect to dashboard if already authenticated and trying to access auth pages
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/auth/:path*'
  ]
}; 