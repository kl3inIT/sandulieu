import { queryOptions } from "@tanstack/react-query";

import { getPostById, getPosts } from "./post.service";

export const postQueryKeys = {
  all: ["posts"] as const,
  lists: () => [...postQueryKeys.all, "list"] as const,
  list: () => [...postQueryKeys.lists()] as const,
  details: () => [...postQueryKeys.all, "detail"] as const,
  detail: (postId: number) => [...postQueryKeys.details(), postId] as const,
};

export function postListQueryOptions() {
  return queryOptions({
    queryKey: postQueryKeys.list(),
    queryFn: getPosts,
  });
}

export function postDetailQueryOptions(postId: number) {
  return queryOptions({
    queryKey: postQueryKeys.detail(postId),
    queryFn: () => getPostById(postId),
    enabled: Number.isFinite(postId) && postId > 0,
  });
}
