import { css } from 'hono/css'

type ErrorProps = {
  children: string | null
}

const errorClass = css`
  color: rgb(239 68 68);
  font-size: 0.875rem;
  line-height: 1.25rem;
`

export const Error = (props: ErrorProps) => {
  return props.children ? <p class={errorClass}>{props.children}</p> : null
}
