import {
  createPostApi,
  deletePostApi,
  getPostByIdApi,
  getPostsApi,
  updatePostApi,
  type PostApiResponse,
} from "@/shared/api/post.api";
import type { PostModel } from "@/shared/model/post.model";

import type {
  CreatePostPayload,
  PostDetailResponse,
  PostsListResponse,
  UpdatePostPayload,
} from "./post.types";

function mapPost(response: PostApiResponse): PostModel {
  return {
    id: response.id,
    title: response.title,
    body: response.body,
    userId: response.userId,
  };
}

export async function getPosts(): Promise<PostsListResponse> {
  const response = await getPostsApi();
  return response.map(mapPost);
}

export async function getPostById(postId: number): Promise<PostDetailResponse> {
  const response = await getPostByIdApi(postId);
  return mapPost(response);
}

export async function createPost(
  payload: CreatePostPayload
): Promise<PostModel> {
  const response = await createPostApi(payload);
  return mapPost(response);
}

export async function updatePost(
  postId: number,
  payload: UpdatePostPayload
): Promise<PostModel> {
  const response = await updatePostApi(postId, payload);
  return mapPost(response);
}

export async function deletePost(postId: number): Promise<void> {
  await deletePostApi(postId);
}
