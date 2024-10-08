import { Post } from '@prisma/client'

// PostFormContainerProps
export type PostFormContainerProps = {
  onRefresh: () => void
}

// PostForm
export type PostFormProps = {
  post: string
  error: string | null
  handleChange: (e: Event) => void
  onSubmit: (e: Event) => void
}

// Button
// ButtonProps
export type ButtonProps = {
  children: string
}

// TweetBUttonProps
export type PostButtonProps = ButtonProps

// DeleteButtonProps
export type DeleteButtonProps = {
  id: string
  children: string
  onDeletePost: (id: string) => void
}

// UpdateButtonProps
export type UpdateButtonProps = {
  id: string
  post: string
  children: string
  onStartEdit: (id: string, post: string) => void
}

// action
export type ButtonHandlers = {
  onDeletePost: (id: string) => void
  onUpdatePost: (id: string, post: string) => void
}

// EditingAreaProps
export type EditingAreaProps = {
  onSave: () => void
  onCancel: () => void
}

export type PostsViewProps = {
  posts: Post[]
  error: string | null
  editingPostId: string | null
  updatedContent: string
  onDeletePost: (id: string) => void
  onStartEdit: (id: string, currentContent: string) => void
  onChange: (e: Event) => void
  onSave: () => void
  onCancel: () => void
}
