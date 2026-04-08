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
      <Card className="border-[#dbcdb0]/80 bg-[linear-gradient(180deg,#fffdfa_0%,#f5efe4_100%)] ring-0">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge className="rounded-full bg-[#d9c48d]/14 text-[#8c7550] hover:bg-[#d9c48d]/14">
              Quản lý bài viết
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full border-[#d6c8ac] text-[#8c7550]"
            >
              Danh sách và cập nhật nhanh
            </Badge>
          </div>
          <div className="space-y-3">
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">
              Theo dõi nội dung và cập nhật bài viết trong cùng một luồng quản
              trị.
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              Danh sách bên trái giúp rà nhanh nội dung hiện có, còn khung tạo
              mới bên phải đóng vai trò composer để bổ sung bài viết khi cần.
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

        <Card className="border-[#dbcdb0]/70 bg-white/82 ring-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <PlusCircle className="size-4 text-[#8c7550]" />
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
