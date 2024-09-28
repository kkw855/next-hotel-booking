import NextAuth from 'next-auth'

import { authConfig } from '@/features/auth'

/**
 * 로그인 이후 이동할 페이지
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

// Middleware code always runs in an edge runtime.

export const { auth: middleware } = NextAuth(authConfig)

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|sitemap.xml|robots.txt).*)',
    '/(api|trpc)(.*)',
  ],
}
