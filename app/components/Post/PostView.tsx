import { FC } from 'hono/jsx'
import { PostsViewProps } from '../../types/props'
import { css } from 'hono/css'
import { DeleteButton, SaveCancelButton, UpdateButton } from '../Button'
import { Error } from '../Error'
import { Title } from '../Title'

const postContainerClass = css`
  padding: 5%;
  margin-bottom: 2%;
  background-color: #f5f8fa;
  border-radius: 1rem;
  border: 1px solid #e1e8ed;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`

const dateClass = css`
  font-size: 0.8rem;
  color: #657786;
  display: block;
`

export const PostsView: FC<PostsViewProps> = ({
  posts,
  error,
  editingPostId,
  updatedContent,
  onDeletePost,
  onStartEdit,
  onChange,
  onSave,
  onCancel,
}) => (
  <>
    <Title children={'Posts'} />
    <Error>{error}</Error>
    {posts.map((data) => (
      <div key={data.id} class={postContainerClass}>
        <small class={dateClass}>@ {new Date(data.createdAt).toLocaleString()}</small>
        {editingPostId === data.id ? (
          <>
            <input type='text' value={updatedContent} onInput={onChange} />
            <SaveCancelButton onSave={onSave} onCancel={onCancel} />
          </>
        ) : (
          <p>{data.post}</p>
        )}
        {editingPostId !== data.id && (
          <>
            <UpdateButton id={data.id} post={data.post} onStartEdit={onStartEdit} children={'Update'} />
            <DeleteButton id={data.id} onDeletePost={() => onDeletePost(data.id)} children={'Delete'} />
          </>
        )}
      </div>
    ))}
  </>
)
