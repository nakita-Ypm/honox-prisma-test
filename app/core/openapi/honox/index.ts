import { createRoute } from '@hono/zod-openapi'
import { honoxSchema } from '../../../zod/honox'

export const honox = {
  HonoX: createRoute({
    tags: ['HonoX'],
    method: 'get',
    path: '/honox',
    responses: {
      200: {
        description: 'HonoX🔥',
        content: {
          'application/json': {
            schema: honoxSchema,
          },
        },
      },
    },
  }),
}
