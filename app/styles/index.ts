import { css } from 'hono/css'

export const globalClass = css`
  :-hono-global {
    html {
      font-family: Arial, Helvetica, sans-serif;
    }
    body {
      margin: 0px;
    }
  }
`
