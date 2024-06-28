import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
    const token = await getToken({ req, secret });

    const { pathname } = req.nextUrl;

    if (pathname.includes('/api/auth') || token || pathname === '/') {
        return NextResponse.next();
    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};