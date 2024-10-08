import { Post } from '@prisma/client'
import { postSchema } from '../zod/prisma'

type InputPost = {
  id: string
  post: string
  createdAt: string
  updatedAt: string
}

type ValidResult = { success: true; data: string } | { success: false; error: string }

export class PostUtils {
  /**
   * convertDates
   * Post型への修正
   * @param post
   * @returns Post
   */
  static convertDates(post: InputPost): Post {
    return {
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt),
    }
  }

  /**
   * buildPosts
   * Post[]を組み立て
   * @param posts
   * @returns Post[]
   */
  static buildPosts(posts: InputPost[]): Post[] {
    return posts.map(this.convertDates)
  }
  /**
   * valid
   * バリデーション
   * @param post
   * @returns ValidResult
   */
  static valid(post: string): ValidResult {
    const valid = postSchema.pick({ post: true }).safeParse({ post })
    if (!valid.success) return { success: false, error: '１文字以上１４０文字以内で入力して下さい。' }
    return { success: true, data: valid.data.post }
  }
}
