import { css } from 'hono/css'

type titleProps = {
  children: string
}

const titeleClass = css`
  color: #e36101;
  text-align: center;
`

export const Title = (props: titleProps) => {
  return <h1 class={titeleClass}>{props.children}</h1>
}
