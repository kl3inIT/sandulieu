import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost, deletePost, updatePost } from "./post.service";
import {
  postDetailQueryOptions,
  postListQueryOptions,
  postQueryKeys,
} from "./post.query-options";
import type { CreatePostPayload, UpdatePostPayload } from "./post.types";

export function usePostsQuery() {
  return useQuery(postListQueryOptions());
}

export function usePostDetailQuery(postId: number) {
  return useQuery(postDetailQueryOptions(postId));
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePostPayload) => createPost(payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: postQueryKeys.lists(),
      });
    },
  });
}

export function useUpdatePostMutation(postId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePostPayload) => updatePost(postId, payload),
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() }),
        queryClient.invalidateQueries({
          queryKey: postQueryKeys.detail(postId),
        }),
      ]);
    },
  });
}

export function useDeletePostMutation(postId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetPostId?: number) =>
      deletePost(targetPostId ?? postId ?? 0),
    onSuccess: async (_, deletedPostId) => {
      await queryClient.invalidateQueries({ queryKey: postQueryKeys.lists() });

      const targetPostId = deletedPostId ?? postId;

      if (targetPostId) {
        queryClient.removeQueries({
          queryKey: postQueryKeys.detail(targetPostId),
        });
      }
    },
  });
}
