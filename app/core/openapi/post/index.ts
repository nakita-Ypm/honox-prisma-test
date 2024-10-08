import { createRoute, z } from '@hono/zod-openapi'
import { postSchema } from '../../../zod/prisma'

// 400エラーレスポンスの定義
const badRequestResponse = {
  400: {
    description: 'Bad Request',
    content: {
      'application/json': {
        schema: z.object({
          message: z.string().openapi({
            example: 'Bad Request',
          }),
        }),
      },
    },
  },
}

// 500エラーレスポンスの定義
const internalServerErrorResponse = {
  500: {
    description: 'Internal Server Error',
    content: {
      'application/json': {
        schema: z.object({
          message: z.string().openapi({
            example: 'Internal Server Error',
          }),
        }),
      },
    },
  },
}

export const post = {
  // 投稿
  createPost: createRoute({
    tags: ['Create Post'],
    method: 'post',
    path: '/posts',
    description: 'Create a new post',
    request: {
      body: {
        required: true,
        content: {
          'application/json': {
            schema: postSchema.pick({
              post: true,
            }),
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Created',
      },
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // 一覧取得
  getPostList: createRoute({
    tags: ['getPostList'],
    method: 'get',
    path: '/posts',
    description: 'get PostList posts with optional pagination',
    request: {
      query: z.object({
        page: z.string(),
        limit: z.string(),
      }),
    },
    responses: {
      200: {
        description: 'OK',
        content: {
          'application/json': {
            schema: z.array(postSchema),
          },
        },
      },
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // 投稿を更新
  updatePost: createRoute({
    tags: ['updatePost'],
    method: 'put',
    path: '/posts/{id}',
    description: 'update Post',
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
      body: {
        required: true,
        content: {
          'application/json': {
            schema: postSchema.pick({
              post: true,
            }),
          },
        },
      },
    },
    responses: {
      204: {
        description: 'No Content',
      },
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
  // 投稿を削除
  deletePost: createRoute({
    tags: ['deletePost'],
    method: 'delete',
    path: '/posts/{id}',
    description: 'delete post',
    request: {
      params: z.object({
        id: z.string().uuid(),
      }),
    },
    responses: {
      204: {
        description: 'No Content',
      },
      ...badRequestResponse,
      ...internalServerErrorResponse,
    },
  }),
}
