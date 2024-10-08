import { Prisma } from '@prisma/client'

type QueryValid = {
  page: string
  limit: string
}

export class PostDomain {
  /**
   * buildGetPosts
   * 投稿一覧を取得するためのPrismaのパラメータ
   * @param page
   * @param limit
   * @returns Prisma.PostFindManyArgs
   */
  static buildGetPosts(page: number, limit: number): Prisma.PostFindManyArgs {
    const skip = (page - 1) * limit
    return {
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    }
  }

  /**
   * buildDeletePost
   * 投稿を削除するためのPrismaのパラメータ
   * @param id
   * @returns Prisma.PostDeleteArgs
   */
  static buildDeletePost(id: string): Prisma.PostDeleteArgs {
    return {
      where: {
        id,
      },
    }
  }

  /**
   * buildPutPost
   * 投稿を更新するためPrismaのパラメータ
   * @param id
   * @param post
   * @returns Prisma.PostUpdateArgs
   */
  static buildPutPost(id: string, post: string): Prisma.PostUpdateArgs {
    return {
      where: {
        id,
      },
      data: {
        post,
      },
    }
  }

  /**
   * convertNumber
   * クエリパラメータをnumberに変換
   * @param page
   * @param limit
   * @returns { page: number; limit: number }
   */
  static convertNumber(valid: QueryValid): { page: number; limit: number } {
    const { page, limit } = valid
    return {
      page: parseInt(page),
      limit: parseInt(limit),
    }
  }
}
