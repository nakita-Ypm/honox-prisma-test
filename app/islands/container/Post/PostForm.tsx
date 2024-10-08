import { FC, useState } from 'hono/jsx'
import { PostFormContainerProps, PostFormProps } from '../../../types/props'
import { CommonHooks } from '../../hooks'
import { PostHooks } from '../../hooks/post_hooks'
import { PostForm } from '../../../components/Post/PostForm'

export const PostFormContainer: FC<PostFormContainerProps> = ({ onRefresh }) => {
  const [post, setPost] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleChange = CommonHooks.createOnChange<string>(setPost, (value) => value)

  const onSubmit = async (e: Event) => {
    e.preventDefault()
    await PostHooks.createPost(setError, setPost, post)
    onRefresh()
  }

  const props: PostFormProps = { post: post, error, handleChange, onSubmit }
  return <PostForm {...props} />
}
