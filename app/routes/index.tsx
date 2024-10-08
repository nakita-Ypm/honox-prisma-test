import { createRoute } from 'honox/factory'
import { PostApp } from '../islands/page'

export default createRoute((c) => {
  return c.render(<PostApp />)
})
