// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

import NextAuth from 'next-auth'

import authConfig from './auth.config'

/**
 * 로그인 이후 이동할 페이지
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

// Middleware code always runs in an edge runtime.

export const { auth: middleware } = NextAuth(authConfig)

// export const middleware = async (request: NextRequest) => {
//   // console.log('middleware', request.url)
//   // const session = await auth()
//
//   // if (request.url.includes('dashboard') && !session) {
//   //   return NextResponse.redirect(new URL('/home', request.url))
//   // }
// }

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/(api|trpc)(.*)',
  ],
}
