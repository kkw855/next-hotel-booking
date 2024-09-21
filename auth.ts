import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import authConfig from './auth.config'
import { db } from '@/db/db'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
