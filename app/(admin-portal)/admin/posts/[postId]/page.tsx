"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FilePenLine, Trash2 } from "lucide-react";

import {
  type PostFormValues,
  PostDetailCard,
  PostForm,
  useDeletePostMutation,
  usePostDetailQuery,
  useUpdatePostMutation,
} from "@/features/posts";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function AdminPostDetailPage() {
  const params = useParams<{ postId: string }>();
  const router = useRouter();
  const postId = Number(params.postId);

  const postDetailQuery = usePostDetailQuery(postId);
  const updatePostMutation = useUpdatePostMutation(postId);
  const deletePostMutation = useDeletePostMutation(postId);

  const handleUpdatePost = async (values: PostFormValues) => {
    await updatePostMutation.mutateAsync(values);
  };

  const handleDeletePost = async () => {
    await deletePostMutation.mutateAsync(postId);
    updatePostMutation.reset();
    router.push("/admin/posts");
  };

  if (!Number.isFinite(postId) || postId <= 0) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Mã bài viết chưa hợp lệ</AlertTitle>
        <AlertDescription>
          Vui lòng kiểm tra lại đường dẫn trước khi tiếp tục.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="rounded-[1.75rem] border-zinc-200/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] ring-0">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-full">
              Chi tiết bài viết
            </Badge>
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link href="/admin/posts">
                <ArrowLeft />
                Quay lại danh sách
              </Link>
            </Button>
          </div>
          <div className="space-y-3">
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">
              Cập nhật bài viết #{postId}
            </CardTitle>
            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              Xem lại nội dung hiện tại, chỉnh sửa thông tin cần thiết hoặc xóa
              bài viết khi không còn sử dụng.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      {postDetailQuery.isLoading ? (
        <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <Card className="rounded-[1.5rem] border-zinc-200/70 bg-zinc-950 text-white ring-0">
            <CardHeader>
              <Skeleton className="h-5 w-24 bg-white/10" />
              <Skeleton className="h-8 w-2/3 bg-white/10" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-full bg-white/10" />
              <Skeleton className="h-4 w-[92%] bg-white/10" />
              <Skeleton className="h-4 w-[88%] bg-white/10" />
            </CardContent>
          </Card>
          <Card className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0">
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : null}

      {postDetailQuery.isError ? (
        <Alert variant="destructive">
          <AlertTitle>Chưa tải được bài viết</AlertTitle>
          <AlertDescription>
            {(postDetailQuery.error as Error).message ||
              "Đã có lỗi xảy ra khi lấy thông tin bài viết."}
          </AlertDescription>
        </Alert>
      ) : null}

      {postDetailQuery.data ? (
        <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <PostDetailCard post={postDetailQuery.data} />

          <Card className="rounded-[1.5rem] border-zinc-200/70 bg-white/90 ring-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <FilePenLine className="size-4 text-cyan-700" />
                Chỉnh sửa thông tin
              </CardTitle>
              <CardDescription>
                Thay đổi nội dung bài viết rồi lưu lại để cập nhật dữ liệu mới
                nhất.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {updatePostMutation.isSuccess ? (
                <Alert>
                  <AlertTitle>Đã cập nhật bài viết</AlertTitle>
                  <AlertDescription>
                    Thông tin mới đã được đồng bộ lại trong danh sách.
                  </AlertDescription>
                </Alert>
              ) : null}

              {updatePostMutation.isError ? (
                <Alert variant="destructive">
                  <AlertTitle>Chưa thể cập nhật bài viết</AlertTitle>
                  <AlertDescription>
                    {(updatePostMutation.error as Error).message ||
                      "Đã có lỗi xảy ra khi cập nhật bài viết."}
                  </AlertDescription>
                </Alert>
              ) : null}

              {deletePostMutation.isError ? (
                <Alert variant="destructive">
                  <AlertTitle>Chưa thể xóa bài viết</AlertTitle>
                  <AlertDescription>
                    {(deletePostMutation.error as Error).message ||
                      "Đã có lỗi xảy ra khi xóa bài viết."}
                  </AlertDescription>
                </Alert>
              ) : null}

              <PostForm
                mode="update"
                submitLabel="Lưu thay đổi"
                initialValues={{
                  title: postDetailQuery.data.title,
                  body: postDetailQuery.data.body,
                  userId: postDetailQuery.data.userId,
                }}
                isPending={updatePostMutation.isPending}
                onSubmit={handleUpdatePost}
                onReset={() => updatePostMutation.reset()}
              />

              <Button
                type="button"
                variant="outline"
                className="rounded-full px-5"
                disabled={
                  deletePostMutation.isPending || updatePostMutation.isPending
                }
                onClick={() => {
                  void handleDeletePost();
                }}
              >
                <Trash2 />
                {deletePostMutation.isPending
                  ? "Đang xóa bài viết"
                  : "Xóa bài viết"}
              </Button>
            </CardContent>
          </Card>
        </section>
      ) : null}
    </div>
  );
}
