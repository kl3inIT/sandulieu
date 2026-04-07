import type { PostModel } from "@/shared/model/post.model";

export type Post = PostModel;

export type PostFormValues = {
  title: string;
  body: string;
  userId: number;
};

export type CreatePostPayload = PostFormValues;
export type UpdatePostPayload = PostFormValues;
export type PostsListResponse = Post[];
export type PostDetailResponse = Post;
