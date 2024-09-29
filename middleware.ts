import NextAuth from 'next-auth'

import { authConfig } from '@/features/auth/auth'
/**
 * 로그인 이후 이동할 페이지
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

// Middleware code always runs in an edge runtime.

export default NextAuth(authConfig).auth

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|sitemap.xml|robots.txt).*)',
    '/(api|trpc)(.*)',
  ],
}
