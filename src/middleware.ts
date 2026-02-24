import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const authSession = request.cookies.get('rk_admin_session');

    if (!authSession) {
        // Admin routes require authenticated session
        // Replace with full auth (NextAuth.js) when ready
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
