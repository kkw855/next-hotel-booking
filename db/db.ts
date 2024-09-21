// import { neon } from '@neondatabase/serverless'
// import { drizzle } from 'drizzle-orm/neon-http'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { Config, Effect, pipe } from 'effect'

import * as schema from './schema'

// TODO: typescript jsdoc 작성법 or 더 좋은 문서화 있나 체크
/**
 * Drizzle instance 생성
 */
const createDrizzle = pipe(
  Effect.gen(function* () {
    const AUTH_DRIZZLE_URL = yield* Config.string('AUTH_DRIZZLE_URL')

    const pool = new Pool({
      connectionString: AUTH_DRIZZLE_URL,
    })

    // yield* Effect.promise(() => pool.connect())

    return drizzle(pool, { schema })
  }),
  Effect.runSync,
)

export const db = createDrizzle
