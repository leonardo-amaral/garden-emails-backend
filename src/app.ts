import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { usersRoutes } from './routes/usersRoutes'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format()
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    //TODO
  }

  return reply.status(500).send({
    message: 'Internal Server Error'
  })
})
