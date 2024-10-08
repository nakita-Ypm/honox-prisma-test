import { css } from 'hono/css'
import { DeleteButtonProps, EditingAreaProps, PostButtonProps, UpdateButtonProps } from '../../types/props'

export const postButtonClass = css`
  display: block;
  background-color: #e36101;
  color: white;
  border: none;
  padding: 2% 3%;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
  &:hover {
    background-color: orange;
  }
`

export const commonButtonClass = css`
  display: inline-block;
  background-color: #e36101;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  &:hover {
    background-color: orange;
  }
`

// Tweetボタン
export const PostButton = (props: PostButtonProps) => {
  return <button class={postButtonClass}>{props.children}</button>
}

// 削除ボタン
export const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button class={commonButtonClass} onClick={() => props.onDeletePost(props.id)}>
      {props.children}
    </button>
  )
}

// 更新ボタン
export const UpdateButton = (props: UpdateButtonProps) => (
  <button onClick={() => props.onStartEdit(props.id, props.post)} class={commonButtonClass}>
    Update
  </button>
)

// Save Cancel
export const SaveCancelButton = (props: EditingAreaProps) => {
  return (
    <>
      <button class={commonButtonClass} onClick={props.onSave}>
        Save
      </button>
      <button class={commonButtonClass} onClick={props.onCancel}>
        Cancel
      </button>
    </>
  )
}