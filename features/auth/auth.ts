import NextAuth, { NextAuthConfig } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import Google from 'next-auth/providers/google'
import { redirect } from 'next/navigation'

import { db } from '@/db/db'

export const checkLoginRedirect = (callbackUrl: string) =>
  redirect(`/sign-in?callbackUrl=${callbackUrl}`)

const authConfig = {
  pages: {
    signIn: '/sign-in',
  },
  providers: [Google],
  adapter: DrizzleAdapter(db),
  callbacks: {
    // 사용자가 로그인할 때 호출됨
    session({ session, user }) {
      console.log(session, user)
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
