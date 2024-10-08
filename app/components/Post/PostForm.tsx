import { FC } from 'hono/jsx'
import { css } from 'hono/css'
import { PostFormProps } from '../../types/props'
import { PostButton } from '../Button'
import { Error } from '../Error'
import { Title } from '../Title'

const formClass = css`
  display: block;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  padding: 2%;
`

const inputClass = css`
  width: 100%;
  padding: 3%;
  margin-bottom: 3%;
  border: 1px solid #e1e8ed;
  border-radius: 1rem;
  box-sizing: border-box;
`

export const PostForm: FC<PostFormProps> = (props) => (
  <>
    <form class={formClass} onSubmit={props.onSubmit}>
      <Title children={'Created by HonoX'} />
      <input
        class={inputClass}
        type='text'
        value={props.post}
        onChange={props.handleChange}
        placeholder='What’s happening?'
      />
      <PostButton children={'Post'} />
      <Error children={props.error} />
    </form>
  </>
)