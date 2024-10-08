import { OpenAPIHono } from '@hono/zod-openapi'
import { routes } from '../openapi'

export class HonoXHandler {
  static apply(app: OpenAPIHono) {
    return app.openapi(routes['HonoX'], async (c) => {
      return c.json({ message: 'HonoX🔥' })
    })
  }
}
