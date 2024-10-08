// PostsPage.tsx
import { FC, useEffect, useState, useCallback } from 'hono/jsx'
import { Post } from '@prisma/client'
import { PostFormContainer } from './PostForm'
import { PostHooks } from '../../hooks/post_hooks'
import { PostsView } from '../../../components/Post/PostView'
import { PostFormContainerProps, PostsViewProps } from '../../../types/props'
import { CommonHooks } from '../../hooks'

export const PostView: FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)

  // 編集関連の状態
  const [editingPostId, setEditingPostId] = useState<string | null>(null)
  const [updatedContent, setUpdatedContent] = useState<string>('')

  const onGetPostList = useCallback(async () => {
    await PostHooks.getPostList(setError, setPosts)
  }, [setError, setPosts])

  // 投稿を削除
  const onDeletePost = useCallback(
    async (id: string) => {
      await PostHooks.deletePost(setError, id)
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id))
    },
    [setError, setPosts],
  )

  // 投稿を更新
  const onUpdatePost = useCallback(
    async (id: string, updatedPost: string) => {
      await PostHooks.updatePost(setError, id, updatedPost)
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? { ...post, post: updatedPost } : post)))
    },
    [setError, setPosts],
  )

  // 編集を開始
  const onStartEdit = (id: string, currentContent: string) => {
    setEditingPostId(id)
    setUpdatedContent(currentContent)
  }

  // 編集内容の変更
  const onChange = useCallback(
    CommonHooks.createOnChange<string>(setUpdatedContent, (value) => value),
    [setUpdatedContent],
  )

  // 編集を保存
  const onSave = async () => {
    if (editingPostId) {
      await onUpdatePost(editingPostId, updatedContent)
      setEditingPostId(null)
      setUpdatedContent('')
    }
  }

  // 編集をキャンセル
  const onCancel = () => {
    setEditingPostId(null)
    setUpdatedContent('')
  }

  // 初回レンダリング時に投稿を取得
  useEffect(() => {
    onGetPostList()
  }, [onGetPostList])

  const onRefresh = onGetPostList // 関数を再利用

  const postFormProps: PostFormContainerProps = {
    onRefresh,
  }

  const postsViewProps: PostsViewProps = {
    posts,
    error,
    editingPostId,
    updatedContent,
    onDeletePost,
    onStartEdit,
    onChange,
    onSave,
    onCancel,
  }
  return (
    <>
      <PostFormContainer {...postFormProps} />
      <PostsView {...postsViewProps} />
    </>
  )
}
