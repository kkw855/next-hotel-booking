import { defineConfig } from 'drizzle-kit'
import { Config, Effect } from 'effect'

const AUTH_DRIZZLE_URL = Effect.runSync(Config.string('AUTH_DRIZZLE_URL'))

console.log('drizzle config:', AUTH_DRIZZLE_URL)

export default defineConfig({
  schema: './db/schema.ts',
  dialect: 'postgresql',
  out: './drizzle',
  dbCredentials: {
    url: AUTH_DRIZZLE_URL,
  },
})
