import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('accessToken');

  if (cookie && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: '/about/:path*',
// };
