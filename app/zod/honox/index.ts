import { z } from '@hono/zod-openapi'

export const honoxSchema = z.object({
  message: z.string().openapi({
    example: 'HonoX🔥',
  }),
})
