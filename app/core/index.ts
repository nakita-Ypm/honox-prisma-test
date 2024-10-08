import { OpenAPIHono } from '@hono/zod-openapi'
import { basicAuth } from 'hono/basic-auth'
import { HonoXHandler } from './handler/honox_handler'
import { SwaggerHandler } from './handler/swagger_handler'
import { PostHandler } from './handler/post_handler'

export class App {
  private static username = process.env.SWAGGER_USER
  private static password = process.env.SWAGGER_PASSWORD
  static init() {
    const app = new OpenAPIHono()
    if (this.username && this.password) {
      app.use('/auth/*', basicAuth({ username: this.username, password: this.password }))
    }
    console.log(this.username)
    console.log(this.password)
    return this.applyRoutes(app)
  }

  static applyRoutes(app: OpenAPIHono) {
    return app
      .route('/', HonoXHandler.apply(app))
      .route('/', PostHandler.apply(app))
      .route('/', SwaggerHandler.apply(app))
  }
}
