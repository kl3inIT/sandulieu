import { deleteJson, getJson, postJson, putJson } from "@/shared/apiClient";

export type PostApiResponse = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type SavePostApiPayload = {
  title: string;
  body: string;
  userId: number;
};

const POSTS_ENDPOINT = "https://jsonplaceholder.typicode.com/posts";

export async function getPostsApi(): Promise<PostApiResponse[]> {
  return getJson<PostApiResponse[]>(POSTS_ENDPOINT);
}

export async function getPostByIdApi(postId: number): Promise<PostApiResponse> {
  return getJson<PostApiResponse>(`${POSTS_ENDPOINT}/${postId}`);
}

export async function createPostApi(
  payload: SavePostApiPayload
): Promise<PostApiResponse> {
  return postJson<PostApiResponse>(POSTS_ENDPOINT, payload);
}

export async function updatePostApi(
  postId: number,
  payload: SavePostApiPayload
): Promise<PostApiResponse> {
  return putJson<PostApiResponse>(`${POSTS_ENDPOINT}/${postId}`, payload);
}

export async function deletePostApi(postId: number): Promise<void> {
  await deleteJson(`${POSTS_ENDPOINT}/${postId}`);
}
