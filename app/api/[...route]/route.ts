import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { Config, Effect, pipe } from 'effect'

const apiPath = pipe(
  Effect.gen(function* () {
    return yield* Config.string('API_PATH')
  }),
  Effect.runSync,
)

const app = new Hono().basePath(apiPath)

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello World!',
  })
})

export const GET = handle(app)
