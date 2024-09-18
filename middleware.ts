import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from '@/auth'

export const middleware = async (request: NextRequest) => {
  console.log('middleware', request.url)
  const session = await auth()

  if (request.url.includes('dashboard') && !session) {
    return NextResponse.redirect(new URL('/home', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/(api|trpc)(.*)',
  ],
}
