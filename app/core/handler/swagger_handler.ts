import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'

export class SwaggerHandler {
  static apply(app: OpenAPIHono) {
    return app
      .doc('/auth/doc', {
        info: {
          title: 'Hono API',
          version: 'v1',
        },
        openapi: '3.1.0',
        servers: [
          {
            url: '/api',
            description: 'API base path',
          },
        ],
      })
      .get('/auth/ui', swaggerUI({ url: '/api/auth/doc' }))
  }
}
