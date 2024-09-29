import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { Config, Effect, pipe } from 'effect'

// TODO: typescript jsdoc 작성법 or 더 좋은 문서화 있나 체크
/**
 * Drizzle instance 생성
 */
const createDrizzle = pipe(
  Effect.gen(function* () {
    const AUTH_DRIZZLE_URL = yield* Config.string('AUTH_DRIZZLE_URL')

    console.log('URL:', AUTH_DRIZZLE_URL)

    const sql = neon(AUTH_DRIZZLE_URL)

    return drizzle(sql, { logger: true })
  }),
  Effect.runSync,
)

export const db = createDrizzle
