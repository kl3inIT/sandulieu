"use client";

import { PlusCircle } from "lucide-react";

import {
  type PostFormValues,
  PostForm,
  PostList,
  useCreatePostMutation,
  useDeletePostMutation,
  usePostsQuery,
} from "@/features/posts";

import { usePostListPageStore } from "./post-list-page.store";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const createPostDefaults: PostFormValues = {
  title: "",
  body: "",
  userId: 1,
};

export default function AdminPostsPage() {
  const postsQuery = usePostsQuery();
  const createPostMutation = useCreatePostMutation();
  const deletePostMutation = useDeletePostMutation();

  const deletingPostId = usePostListPageStore((state) => state.deletingPostId);
  const setDeletingPostId = usePostListPageStore(
    (state) => state.setDeletingPostId
  );

  const handleCreatePost = async (values: PostFormValues) => {
    await createPostMutation.mutateAsync(values);
  };

  const handleDeletePost = async (postId: number) => {
    setDeletingPostId(postId);

    try {
      await deletePostMutation.mutateAsync(postId);
      createPostMutation.reset();
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-[1.75rem] border-zinc-200/70 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.14),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] ring-0">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full">
              Quản lý bài viết
            </Badge>
            <Badge variant="outline" className="rounded-full">
              Danh sách và cập nhật nhanh
            </Badge>
          </div>
          <div className="space-y-3">
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">
              Theo dõi và cập nhật bài viết dễ dàng hơn
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              Xem danh sách bài viết, tạo nội dung mới và chuyển nhanh sang
              trang chi tiết để chỉnh sửa khi cần.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          {postsQuery.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Chưa tải được danh sách bài viết</AlertTitle>
              <AlertDescription>
                {(postsQuery.error as Error).message ||
                  "Đã có lỗi xảy ra khi lấy dữ liệu bài viết."}
              </AlertDescription>
            </Alert>
          ) : null}

          <PostList
            posts={postsQuery.data ?? []}
            isLoading={postsQuery.isLoading}
            deletingPostId={deletingPostId}
            onDelete={handleDeletePost}
          />
        </div>

        <Card className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlusCircle className="size-4 text-cyan-700" />
              Tạo bài viết mới
            </CardTitle>
            <CardDescription>
              Điền thông tin cơ bản để thêm nhanh một bài viết mới vào danh
              sách.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {createPostMutation.isSuccess ? (
              <Alert>
                <AlertTitle>Đã lưu bài viết thành công</AlertTitle>
                <AlertDescription>
                  Danh sách đã được cập nhật lại để bạn tiếp tục kiểm tra.
                </AlertDescription>
              </Alert>
            ) : null}

            {createPostMutation.isError ? (
              <Alert variant="destructive">
                <AlertTitle>Chưa thể tạo bài viết</AlertTitle>
                <AlertDescription>
                  {(createPostMutation.error as Error).message ||
                    "Đã có lỗi xảy ra khi lưu bài viết."}
                </AlertDescription>
              </Alert>
            ) : null}

            <PostForm
              mode="create"
              initialValues={createPostDefaults}
              isPending={createPostMutation.isPending}
              onSubmit={handleCreatePost}
              onReset={() => createPostMutation.reset()}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
