import NextAuth, { NextAuthConfig } from 'next-auth'
import Google from '@auth/core/providers/google'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { redirect } from 'next/navigation'

import { db } from '@/db/db'

export const redirectLoginPage = (callbackUrl: string) =>
  redirect(`/sign-in?callbackUrl=${callbackUrl}`)

export const authConfig = {
  providers: [Google],
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async session({ session, user }) {
      console.log('session', session, user)
      session.user.id = user.id
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
