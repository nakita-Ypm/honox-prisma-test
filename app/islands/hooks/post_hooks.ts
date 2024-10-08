import { Post } from '@prisma/client'
import { client } from '../../routes/api'
import { SetVal } from '../../types/state'
import { PostUtils } from '../../utils/post_utils'

export class PostHooks {
  /**
   * createPost
   * RPCで投稿する
   * @param setError
   * @param SetVal
   * @param post
   */
  static async createPost(setError: SetVal<string | null>, SetVal: SetVal<string>, post: string) {
    try {
      setError(null)
      const result = PostUtils.valid(post)
      if (!result.success) {
        setError(result.error)
        return
      }
      const res = await client.posts.$post({ json: { post: result.data } })
      if (!res.ok) {
        setError('不正なリクエスト')
        return
      }
      SetVal('')
    } catch {
      setError('投稿に失敗しました')
      return
    }
  }

  /**
   * getPostList
   * RPCで投稿一覧を取得する
   * @param setError
   * @param setVal
   * @param page
   * @param limit
   */
  static async getPostList(
    setError: SetVal<string | null>,
    setVal: SetVal<Post[]>,
    page: string = '1',
    limit: string = '10',
  ) {
    try {
      setError(null)
      const res = await client.posts.$get({
        query: {
          page: page,
          limit: limit,
        },
      })
      if (res.ok) {
        const data = await res.json()
        const posts = PostUtils.buildPosts(data)
        setVal(posts)
      }
    } catch {
      setError('投稿の取得に失敗しました')
      return
    }
  }

  /**
   * updatePost
   * 投稿を更新する
   * @param setError
   * @param id
   * @param post
   */
  static async updatePost(setError: SetVal<string | null>, id: string, post: string) {
    try {
      setError(null)
      await client.posts[':id'].$put({
        param: {
          id,
        },
        json: {
          post,
        },
      })
    } catch {
      setError('投稿の削除に失敗しました。')
      return
    }
  }

  /**
   * deletePost
   * 投稿を削除
   * @param setError
   * @param id
   */
  static async deletePost(setError: SetVal<string | null>, id: string) {
    try {
      setError(null)
      await client.posts[':id'].$delete({ param: { id } })
    } catch {
      setError('投稿の削除に失敗しました。')
      return
    }
  }
}
