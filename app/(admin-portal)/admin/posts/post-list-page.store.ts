import { create } from "zustand";

type PostListPageStore = {
  deletingPostId: number | null;
  setDeletingPostId: (postId: number | null) => void;
};

export const usePostListPageStore = create<PostListPageStore>()((set) => ({
  deletingPostId: null,
  setDeletingPostId: (postId) =>
    set(() => ({
      deletingPostId: postId,
    })),
}));
