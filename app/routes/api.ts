import { hc } from 'hono/client'
import { App } from '../core'

const app = App.init()
export type AddType = typeof app
export const client = hc<AddType>('/api')
export default app
