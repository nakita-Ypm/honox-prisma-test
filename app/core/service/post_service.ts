import { Post, Prisma } from '@prisma/client'
import { prisma } from '../infra/prisma'
import { PostDomain } from '../domain/post'

export class PostService {
  /**
   * createPost
   * 投稿を作成する
   * @param post
   * @returns Promise<Post>
   */
  static async createPost(post: string): Promise<Post> {
    const data: Prisma.PostCreateArgs = {
      data: {
        post,
      },
    }
    return await prisma.post.create(data)
  }

  /**
   * getPosts
   * 投稿一覧を取得する
   * @param page
   * @param limit
   * @returns Promise<Post[]>
   */
  static async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const data: Prisma.PostFindManyArgs = PostDomain.buildGetPosts(page, limit)
    return await prisma.post.findMany(data)
  }

  /**
   * deletePost
   * 投稿を削除
   * @param id
   * @returns Promise<Post>
   */
  static async deletePost(id: string): Promise<Post> {
    const data: Prisma.PostDeleteArgs = PostDomain.buildDeletePost(id)
    return await prisma.post.delete(data)
  }

  /**
   * putPost
   * 投稿を更新
   * @param id
   * @param post
   * @returns Promise<Post>
   */
  static async putPost(id: string, post: string): Promise<Post> {
    const data: Prisma.PostUpdateArgs = PostDomain.buildPutPost(id, post)
    return await prisma.post.update(data)
  }
}
