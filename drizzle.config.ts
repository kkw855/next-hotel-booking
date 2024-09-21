import { defineConfig } from 'drizzle-kit'
import { Config, Effect } from 'effect'

const AUTH_DRIZZLE_URL = Effect.runSync(Config.string('AUTH_DRIZZLE_URL'))

export default defineConfig({
  dialect: 'postgresql',
  schema: './db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: AUTH_DRIZZLE_URL,
  },
})
